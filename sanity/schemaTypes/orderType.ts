import { BasketIcon } from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
export  const orderType = defineType({ 
    name: 'order',
    title: 'Заказы',
    type: 'document',
    icon: BasketIcon,
    fields: [
        defineField ({
            name: 'orderNumber',
            title: 'Номер заказа',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: 'customerId',
            title: 'ID покупателя',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: 'firstName',
            title: 'Имя покупателя',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: 'lastName',
            title: 'Фамилия покупателя',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: 'phoneNumber',
            title: 'Номер телефона покупателя',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: 'address',
            title: 'Адрес доставки',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: 'email',
            title: 'Email покупателя',
            type: 'string',
            validation: (rule) => rule.required().email(),
        }),
        defineField ({
            name: 'products',
            title: 'Товары',
            type: 'array',
            of:[
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField ({
                            name: 'product',
                            title: 'Купленный товар',
                            type: 'reference',
                            to: [{type: "product"}],
                        }),
                        defineField ({
                            name: 'size',
                            title: 'Размер',
                            type: 'number',
                        }),
                        defineField ({
                            name: 'quantity',
                            title: 'Количество',
                            type: 'number',
                        }),
                    ],
                    preview:{
                        select: {
                            product: "product.name",
                            quantity: "quantity",
                            image: "product.image",
                            price: "product.price",
                        },
                        prepare(select) {
                         return {
                            title: `${select.product} x ${select.quantity}`,
                            subtitle: `${select.price * select.quantity}`,
                            media: select.image,
                         };
                        },
                    },
                })
            ]
        }),
        defineField ({
            name: 'totalPrice',
            title: 'Итого',
            type: 'number',
            validation: (rule) => rule.required().min(0),
        }),

        defineField ({
            name: 'status',
            title: 'Статус заказа',
            type: 'string',
            options: {
                list:[
                    {title: "В обработке", value: 'pending'},
                    {title: "Оплачено", value: 'paid'},
                    {title: "Отправлено", value: 'shipped'},
                    {title: "Доставлено", value: 'delivered'},
                    {title: "Отменено", value: 'cancelled'},
                ],
            },
        }),
        
        defineField ({
            name: 'orderDate',
            title: 'Дата заказа',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
    ],
        preview: {
            select:{
                firstName: "firstName",
                lastName: "lastName",
                amount: "totalPrice",
                currency:"currency",
                orderId: "orderNumber",
                email: "email",
            },
            prepare(select) {
                const orderIdSnippet= `${select.orderId.slice(0,5)}...${select.orderId.slice(-5)}`;
                return{
                  title: `${select.firstName} ${select.lastName} (${orderIdSnippet})`,
                  subtitle: `${select.amount} ₽, ${select.email}`,
                  media: BasketIcon,
                    };
                 },
        },
    
});