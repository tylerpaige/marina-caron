import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  // This setting restricts the actions to update and publish only, making it a singleton.
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Menu Item',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'href',
              title: 'URL',
              type: 'string',
            },
          ],
        },
      ],
    },
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
    }),
    defineField({
      name: 'foregroundColor',
      title: 'Text Color',
      type: 'string',
    }),
    defineField({
      name: 'linkColor',
      title: 'Link Color',
      type: 'string',
    }),
  ],
})
