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
            name: "type",
            title: "Тип товара",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: "slug",
            title: "slug",
            type: "slug",
            validation: (rule) => rule.required(),
            options: {
                source: "name",
                maxLength: 100,
            }
        }),
        defineField ({
            name: "image",
            title: "Основное изображение товара",
            type: "image",
            validation: (rule) => rule.required(),
            options: {
                hotspot: true,
            }
        }),

        defineField({
            name: "gallery",
            title: "Галерея изображений",
            type: "array",
            of: [
              {
                type: "image",
                options: {
                  hotspot: true, // Для кадрирования изображений
                },
              },
            ],
            validation: (Rule) =>
              Rule.required()
                .min(4)
                .max(4)
                .error("Галерея должна содержать ровно 4 изображения"),
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

        defineField ({
            name: "gender",
            title: "Пол",
            type: "string",
            options: { list: ['male', 'female'] },
            validation: (rule) => rule.required(),
        }),
        defineField ({
            name: "sizes",
            title: "Размеры",
            validation: (rule) => rule.required(),
            type: 'array', of: [{ type: 'object', fields: [
                { name: 'size', title: 'Размер', type: 'number', validation: (rule) => rule.required(), },
                { name: 'quantity', title: 'Количество', type: 'number', validation: (rule) => rule.required(), }
              ] }]
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