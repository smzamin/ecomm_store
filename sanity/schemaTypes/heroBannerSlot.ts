import { TagIcon } from '@sanity/icons';
import { defineType, defineField, defineArrayMember } from 'sanity';

export const heroBannerSlot = defineType({
  name: 'heroBannerSlot',
  title: 'HeroBannerSlot',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'Title',
      type: 'string',
      description:
        'The name of this content slot, e.g., "Home Page Hero Banner"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'contents',
      title: 'Hero Banners',
      type: 'array',
      description: 'Add multiple images for the hero banner slot.',
      of: [
        defineArrayMember({
          type: 'image',
          title: 'Hero Banner Image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'Title',
      subtitle: 'Subtitle',
      media: 'image',
    },
  },
});
