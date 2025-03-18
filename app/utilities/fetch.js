// sanity.js
import { client } from "../../sanity/lib/client";

const PER = 6;

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function fetchContent(
  { page, type, order, projection, per } = { page: 1, per: PER }
) {
  const filters = [];
  filters.push(`_type == "${type}"`);
  const filterStatement = `*[${filters.join(" && ")}]`;

  const orders = [];
  orders.push(`| order(${order})`);
  const orderStatement = orders.join(" ");

  // NOTE: this is slow pagination, but since the blog will be small, it's fine.
  // Do not replicate this code for larger datasets. Instead, refer to this
  // documentation for help: https://www.sanity.io/docs/paginating-with-groq
  const selectorStatement =
    typeof page === "number" ? `[${(page - 1) * per}...${page * per}]` : "";

  const query = [
    filterStatement,
    orderStatement,
    selectorStatement,
    projection,
  ].join(" ");

  const data = await client.fetch(query);

  if (!Boolean(data.length)) {
    return {
      data: [],
      totalPages: 0,
      currentPage: 0,
      error: {
        status: "404",
        type: "Not Found",
        message: "No records found.",
      },
    };
  }

  const totalPages = await client
    .fetch(`count(${filterStatement})`)
    .then((count) => Math.max(Math.ceil(count / PER), 1));

  return {
    data,
    meta: {
      totalPages,
      currentPage: page,
    },
  };
}

export async function fetchExhibitions({ page } = { page: 1 }) {
  return fetchContent({
    page,
    type: "exhibition",
    order: `endDate desc`,
    per: 6,
    projection: `{
  _id,
  title,
  slug,
  location,
  startDate,
  endDate,
  displayDate,
  externalUrl,
  media[]{
    ...,
    asset->{
      url,
      metadata{
        dimensions{
          width,
          height,
          aspectRatio
        }
      },
      "_key": _id
    }
  },
  description[]{
    ...,
    asset->{
      url,
      metadata{
        dimensions{
          width,
          height,
          aspectRatio
        }
      },
      "_key": _id
    }
  }
}`,
  });
}

export async function fetchWritings({ page } = { page: 1 }) {
  return fetchContent({
    page,
    type: "writing",
    order: `date desc`,
    per: 6,
    projection: `{
  _id,
  title,
  slug,
  publisher,
  contributors,
  date,
  displayDate,
  externalUrl,
  media[]{
    ...,
    asset->{
      url,
      metadata{
        dimensions{
          width,
          height,
          aspectRatio
        }
      },
      "_key": _id
    }
  },
  description[]{
    ...,
    asset->{
      url,
      metadata{
        dimensions{
          width,
          height,
          aspectRatio
        }
      },
      "_key": _id
    }
  }
}`,
  });
}

export async function fetchPublications({ page } = { page: 1 }) {
  return fetchContent({
    page,
    type: "publication",
    order: `date desc`,
    per: 6,
    projection: `{
      _id,
      title,
      slug,
      publisher,
      contributors,
      date,
      displayDate,
      externalUrl,
      media[]{
        ...,
        asset->{
          url,
          metadata{
            dimensions{
              width,
              height,
              aspectRatio
            }
          },
          "_key": _id
        }
      },
      description[]{
        ...,
        asset->{
          url,
          metadata{
            dimensions{
              width,
              height,
              aspectRatio
            }
          },
          "_key": _id
        }
      }
    }
      `,
  });
}

// NOTE: the default is null so that we can find a page where the slug is empty (i.e. the homepage)
export async function fetchPage({ slug = null }) {
  const query = `*[_type == "page" && slug.current == $slug][0] { 
    _id,
    title,
    hideTitle,
    slug,
    description,
    media[]{
      ...,
      asset->{
        url,
        metadata{
          dimensions{
            width,
            height,
            aspectRatio
          }
        },
        "_key": _id
      }
    },
    body[]{
      ...,
      asset->{
        url,
        metadata{
          dimensions{
            width,
            height,
            aspectRatio
          }
        },
        "_key": _id
      }
    }
  }`;
  const page = await client.fetch(query, {
    slug: Array.isArray(slug) ? slug.join("/") : slug,
  });
  return page;
}

export async function fetchSettings() {
  const query = `*[_type == "settings"][0]`;
  const settings = await client.fetch(query);
  return settings;
}
