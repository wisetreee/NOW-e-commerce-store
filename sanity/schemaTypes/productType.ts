import { Select } from "@sanity/ui";
import { rule } from "postcss";
import { defineField, defineType } from "sanity";

export const productType = defineType ({
    name: 'product',
    title: 'Товары',
    type: 'document',
    fields: [
        defineField ({
            name: "name",
            title: "Название товара",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: "slug",
            title: "slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 100,
            }
        }),
        defineField ({
            name: "image",
            title: "Изображение товара",
            type: "image",
            options: {
                hotspot: true,
            }
        }),
        defineField ({
            name: "description",
            title: "Описание товара",
            type: "blockContent",
        }),
        defineField ({
            name: "price",
            title: "Цена товара",
            type: "number",
            validation: (rule) => rule.required().min(0),
        }),
        defineField({
            name: 'genderOptions',
            title: 'Доступные размеры по полу',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'gender', title: 'Пол', type: 'string', options: { list: ['male', 'female'] } },
                  { name: 'sizes', title: 'Размеры', type: 'array', of: [{ type: 'object', fields: [
                    { name: 'size', title: 'Размер', type: 'number' },
                    { name: 'quantity', title: 'Количество', type: 'number' }
                  ] }] },
                ],
              }
            ],
          }),
        defineField ({
            name: "categories",
            title: "Категории товара",
            type: "array",
            of: [{type: "reference", to: {type: "category"}}],
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            price: "price",
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `${select.price}`,
                media: select.media,
            };
        },
    },
});