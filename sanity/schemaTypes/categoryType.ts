import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Категории',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Название',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField ({
      name: "image",
      title: "Изображение",
      type: "image",
      options: {
          hotspot: true,
      }
  }),

    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),
    
  ],
  preview: {
    select: {
        title: "name",
        description: "description",
        media: "image",
    },
  },
})
