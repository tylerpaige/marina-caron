/*
  NOTE: This file is necessary to separate out ISR and client concerns.
  We don't want to make server actions for the `fetcher` and `render` functions,
  so we need a client component in order to pass them into the <InifiniteScrollList> component.
  We *could* just make the `page.tsx` a client component, but we want to keep it
  server-side rendered for SEO purposes.
*/

"use client";

import { fetchWritings } from "../utilities";
import { InfiniteScrollList, Writing } from ".";

export function InfiniteWritingList() {
  return (
    <InfiniteScrollList
      fetcher={fetchWritings}
      render={(writing) => (
        <Writing key={writing._id} writing={writing} />
      )}
    />
  );
}
