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
      type: "date",
    }),
    defineField({
      name: "displayDate",
      title: "Display Date",
      type: "string",
    }),
    defineField({
      name: "type",
      title: "Type",
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
      name: "pdf",
      title: "PDF",
      type: "file",
    }),
    defineField({
      name: "files",
      title: "Files",
      description:
        "These files will not be displayed on the front end but can be used for archiving purposes. You can copy the file's URL if you need to share it.",
      type: "array",
      of: [
        {
          type: "file",
          title: "File",
          options: { accept: "*/*" },
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
