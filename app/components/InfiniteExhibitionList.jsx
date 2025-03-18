/*
  NOTE: This file is necessary to separate out ISR and client concerns.
  We don't want to make server actions for the `fetcher` and `render` functions,
  so we need a client component in order to pass them into the <InifiniteScrollList> component.
  We *could* just make the `page.tsx` a client component, but we want to keep it
  server-side rendered for SEO purposes.
*/

"use client";

import { fetchExhibitions } from "../utilities";
import { InfiniteScrollList, Exhibition } from "../components";

export function InfiniteExhibitionList() {
  return (
    <InfiniteScrollList
      fetcher={fetchExhibitions}
      render={(exhibition) => (
        <Exhibition key={exhibition._id} exhibition={exhibition} />
      )}
    />
  );
}
