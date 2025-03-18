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
      name: "location",
      title: "Location/Institution",
      type: "string",
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "blockContent",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
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
      name: "description",
      title: "description",
      type: "blockContent",
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
      name: "files",
      title: "Files",
      description: "These files will not be displayed on the front end but can be used for archiving purposes. You can copy the file's URL if you need to share it.",
      type: "array",
      of: [
        {
          type: 'file',
          title: 'File',
          options: { accept: '*/*' },
        },
      ],
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
