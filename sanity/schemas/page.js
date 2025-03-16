import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "hideTitle",
      title: "Hide Title?",
      type: "boolean",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "This is the path to the page after /pages. For example, if you enter “/about/history” your page will be available at “/pages/about/history”. If you leave this blank, the page will become the homepage.",
      validation: (Rule) =>
        Rule.custom((slug) => {
          // Allow empty values for homepage
          if (!slug || !slug.current) {
            return true;
          }

          return slug.current.startsWith("/")
            ? "Slug cannot start with a forward slash"
            : true;
        }),
      options: {
        source: "title",
        maxLength: 96,
        isUnique: true,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w/-]+/g, "")
            .slice(0, 96),
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "media",
      title: "Media",
      type: "array",
      of: [{ type: "image", title: "Image" }],
    }),
    defineField({
      name: "body",
      title: "Body",
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
