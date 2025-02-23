import { backendClient } from "@/sanity/lib/backendClient";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { BasketItem } from "@/store/basket";

export async function POST(request: Request) {
  try {
    const { items, user, totalPrice } = await request.json();

    // 1. Проверка остатков
    const stockCheck = await Promise.all(
      items.map(async (item: BasketItem) => {
        const product = await backendClient.fetch(
          `*[_id == $id][0]`,
          { id: item.product._id }
        );
        const size = product.sizes.find((s: any) => s.size === item.size);
        return (size?.quantity || 0) >= item.quantity;
      })
    );

    if (stockCheck.some(valid => !valid)) {
      return NextResponse.json(
        { error: "Некоторые товары закончились" },
        { status: 400 }
      );
    }

    // 2. Создание заказа
    const order = {
      _type: 'order',
      orderNumber: `ORD-${uuidv4().substring(0, 8)}`,
      customerId: user.id,
      firstName: user.firstName || "-",
      lastName: user.lastName || "-",
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      products: items.map((item: BasketItem) => ({
        _key: uuidv4(),
        product: { _type: 'reference', _ref: item.product._id },
        size: item.size,
        quantity: item.quantity
      })),
      totalPrice,
      status: 'pending',
      orderDate: new Date().toISOString(),
    };

    const createdOrder = await backendClient.create(order);

    // 3. Обновление остатков
    await Promise.all(
      items.map(async (item: BasketItem) => {
        const product = await backendClient.fetch(
          `*[_id == $id][0]`,
          { id: item.product._id }
        );
        
        const updatedSizes = product.sizes.map((size: any) => 
          size.size === item.size 
            ? { ...size, quantity: (size.quantity || 0) - item.quantity }
            : size
        );

        await backendClient
          .patch(product._id)
          .set({ sizes: updatedSizes })
          .commit();
      })
    );

    return NextResponse.json(
      { success: true, orderId: createdOrder._id },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}