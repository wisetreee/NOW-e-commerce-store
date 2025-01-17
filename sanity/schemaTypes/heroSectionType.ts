import {defineField, defineType} from 'sanity'
import {DesktopIcon} from '@sanity/icons'

export const heroSectionType = defineType({
    name: 'hero',
    title: 'Шапка сайта',
    type: 'document',
    icon: DesktopIcon,
    fields: [
      defineField({
        name: 'title',
        title: 'Заголовок',
        type: 'string',
      }),

      defineField({
        name: 'description',
        title: 'Описание',
        type: 'text',
      }),

      defineField ({
        name: "image",
        title: "Изображение на шапке сайта",
        type: "image",
        options: {
            hotspot: true,
        }
    }),

      defineField({
        name: 'buttonText',
        title: 'Текст на главной кнопке',
        type: 'text',
      }),
    ],
    preview: {
        select: {
            title: "title",
            media: "image",
        },
    },
  });
  