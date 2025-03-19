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
    defineField({
      name: 'fontScale',
      title: 'Font Scale',
      description: 'This adjusts the font-size of all text uniformly.',
      type: 'number',
    }),
    defineField({
      name: 'lineHeight',
      title: 'Line Height',
      type: 'number',
    }),
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      description: "Be careful! You can only use fonts that are available on the user's computer. Be sure to use a comma separated list of fallback fonts, which probably will end with “sans-serif”.",
    }),
    defineField({
      name: 'spacerScale',
      title: 'Spacer Scale',
      description: 'This is the base spacing unit for the site. It is used to calculate the spacing between elements.',
      type: 'number',
    }),
    defineField({
      name: 'customCss',
      title: 'Custom CSS',
      type: 'text',
    }),
    defineField({
      name: 'customHtml',
      title: 'Custom HTML',
      type: 'text',
    })
  ],
})
