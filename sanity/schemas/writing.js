import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "writing",
  title: "Writing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contributors",
      title: "Contributors",
      type: "text",
    }),
    defineField({
      name: "publisher",
      title: "Publisher",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "datetime",
    }),
    defineField({
      name: "displayDate",
      title: "Display Date",
      type: "string",
    }),
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "string",
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [
        { type: "image", title: "Image" },
      ],
    }),
    defineField({
      name: "description",
      title: "description",
      type: "blockContent",
    }),
  ],

  preview: {
    select: {
      title: "title",
      // author: 'author.name',
      // media: 'mainImage',
    },
    // prepare(selection) {
    //   const {author} = selection
    //   return {...selection, subtitle: author && `by ${author}`}
    // },
  },
});
