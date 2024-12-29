import {MasterDetailIcon} from '@sanity/icons'
import { defineField, defineType } from "sanity";
export const newsType = defineType({ 
    name: 'newsType',
    title: 'Новости',
    type: 'document',
    icon: MasterDetailIcon,
    fields: [
        defineField({
          name: 'title',
          title: 'Заголовок',
          type: 'string',
          validation: (Rule) => Rule.required().min(5).max(100),
        }),
        defineField({
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
            source: 'title', // Автоматическое создание slug на основе заголовка
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Изображение',
          type: 'image',
          options: {
            hotspot: true, // Позволяет настроить видимую область изображения
          },
        }),
        defineField({
          name: 'content',
          title: 'Текст новости',
          type: "blockContent",
          validation: (Rule) => Rule.required().min(20),
        }),
        defineField({
          name: 'publishedAt',
          title: 'Дата публикации',
          type: 'datetime',
          validation: (Rule) => Rule.required(),
        }),
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'publishedAt',
          media: 'image',
        },
        prepare({ title, subtitle, media }) {
          return {
            title: title,
            subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'Без даты',
            media: media,
          };
        },
      },
    });