export function constructPageTitle(parts) {
  return parts.filter(Boolean).join(" | ");
}

export function constructMetadata({ title, description, settings }) {
  return {
    title: constructPageTitle([title, settings?.title]),
    description: description || settings?.description,
  }
}