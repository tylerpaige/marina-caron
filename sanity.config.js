/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // list all document types except 'siteSettings'
            ...S.documentTypeListItems().filter(
              (item) => !["settings", "privacy"].includes(item.getId())
            ),
            S.divider(),
            S.listItem()
              .title("Settings")
              .child(
                S.editor()
                  .id("settings")
                  .schemaType("settings")
                  .documentId("settings")
              ),
            S.listItem()
              .title("Privacy")
              .child(
                S.editor()
                  .id("privacy")
                  .schemaType("privacy")
                  .documentId("privacy")
              ),
            // ...other items
          ]),
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
