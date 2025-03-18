import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "exhibition",
  title: "Exhibition",
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
      name: "location",
      title: "Location/Institution",
      type: "string",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
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
