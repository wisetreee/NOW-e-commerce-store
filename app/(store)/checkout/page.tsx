"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useBasketStore from "@/store/basket";
import Button from "@/app/components/ui/Button";
import Link from "next/link";
import { imageUrl } from "@/sanity/lib/imageUrl";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Некорректный email"),
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  phoneNumber: z.string().regex(/^\+?\d{10,15}$/, "Некорректный номер телефона"),
  address: z.string().min(1, "Адрес обязателен"),
  cardNumber: z.string().regex(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Некорректный номер карты"),
  cvc: z.string().regex(/^\d{3}$/, "Некорректный CVC"),
});

// Тип для FormData
type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { user } = useUser();
  const router = useRouter();
  const { clearBasket, getGroupedItems, getTotalPrice, getTotalQuantity } = useBasketStore();
  const [isLoading, setIsLoading] = useState(false);
  const items = getGroupedItems();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!user || items.length === 0) {
      router.push("/basket");
    }
    setValue("email", user?.emailAddresses[0]?.emailAddress || "");
    setValue("firstName", user?.firstName || "")
    setValue("lastName", user?.lastName || "")
    setValue("phoneNumber", user?.phoneNumbers[0]?.phoneNumber || "")
  }, [user]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          user: {
            id: user?.id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            cardNumber: data.cardNumber.replace(/\s/g, ""),
            cvc: data.cvc
          },
          totalPrice: getTotalPrice()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Ошибка оплаты");
      }

      router.push("/checkout/success");
      clearBasket();
      
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Неизвестная ошибка";
      router.push(`/checkout/error?message=${encodeURIComponent(errorMessage)}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || items.length === 0) return null;

  return (
    <div className="container">
      
      <h2 className="mb-4 mt-8 font-medium text-lg">Контактные данные</h2>
      <div className="sm:flex ">
      <div className="sm:w-1/2 mb-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-content_3">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full p-2 border"
          />
          {errors.email && (
            <p className="text-accent_red text-sm">{errors.email.message}</p>
          )}

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-content_3">Имя</label>
            <input
              {...register("firstName")}
              className="w-full p-2 border"
            />
            {errors.firstName && (
            <p className="text-accent_red text-sm">{errors.firstName.message}</p>
          )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-content_3">Фамилия</label>
            <input
              {...register("lastName")}
              className="w-full p-2 border"
            />
            {errors.lastName && (
            <p className="text-accent_red text-sm">{errors.lastName.message}</p>
          )}
          </div>
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-content_3">Телефон</label>
            <input
              {...register("phoneNumber")}
              placeholder="+1234567890"
              className="w-full p-2 border"
            />
             {errors.phoneNumber && (
            <p className="text-accent_red text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="mb-16">
            <label className="block text-sm font-medium mb-1 text-content_3">Адрес</label>
            <input
              {...register("address")}
              className="w-full p-2 border"
              placeholder="Ул.Пушкина, 1"
            />
             {errors.address && (
            <p className="text-accent_red text-sm">{errors.address.message}</p>
          )}
        </div>

        <h2 className="font-medium text-lg mb-4">Способ оплаты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
          <label className="block text-sm font-medium mb-1 text-content_3">
            Номер карты
          </label>
          <input
            {...register("cardNumber")}
            placeholder="0000 0000 0000 0000"
            className="w-full p-2 border"
            onInput={(e) => {
              const value = e.currentTarget.value
                .replace(/\D/g, "")
                .match(/.{1,4}/g)
                ?.join(" ")
                .substring(0, 19);
              e.currentTarget.value = value || "";
            }}
          />
          {errors.cardNumber && (
            <p className="text-accent_red text-sm">{errors.cardNumber.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-content_3">CVC</label>
          <input
            {...register("cvc")}
            placeholder="123"
            className="w-full p-2 border"
            maxLength={3}
          />
          {errors.cvc && (
            <p className="text-accent_red text-sm">{errors.cvc.message}</p>
          )}
        </div>
        </div>

        <Button
          type="submit"
          text="Оплатить заказ"
          disabled={isLoading}
        />
      </form>
      </div>
      <div className="sm:w-1/2 sm:pl-48">
        <div className="border-b mb-4">
           <h2 className='font-semibold mb-2 text-lg'>Ваш заказ:</h2>
           <p className='text-content_3 mb-2 text-lg'>Вещи ({getTotalQuantity()}): {getTotalPrice()} ₽ </p>
           <p className='font-semibold mb-4 text-lg'>Итого: {getTotalPrice()} ₽ </p>
        </div>
        {items.map((item) => (
          <div key={item.product._id} className="flex gap-4 mb-4 align-start text-sm">
            <div className="relative size-16 sm:size-24 bg-white brightness-95 hover:brightness-90 duration-300 ease-in-out">
              {item.product.image && (
                <Link href={`/catalog/product/${item.product.slug?.current}`} >
                  <Image
                    alt="Logo"
                    src={imageUrl(item.product.image).url()}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-scale-down"
                  />
                </Link>
              )}
            </div>
    
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-content_1">{item.product.name}</h2>
                <h3 className="font-regular text-sm text-content_3">{item.product.type}</h3>
                <h3 className="font-semibold text-sm text-content_1">{item.product.price} ₽</h3>
                <h3 className="font-semibold text-sm text-content_1">{item.size}</h3>
                <h3 className="font-semibold text-sm text-content_1">{item.quantity} шт.</h3>
              </div>             
            </div>
        </div>
        ))}
      </div>
      </div>
    </div>
  );
}