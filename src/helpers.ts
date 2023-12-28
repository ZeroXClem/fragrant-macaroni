import { Client, isFullPage } from "@notionhq/client";
import {
  PageObjectResponse
} from "@notionhq/client/build/src/api-endpoints";

export function getPageTitle(page: PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse): string {
  if ('parent' in page || 'properties' in page) {
    const title = page.properties.Name ?? page.properties.title;
    if (title.type === "title") {
      return title.title.map((text) => text.plain_text).join("");
    }
  }
  if ('title' in page) {
    return page.title;
  }
  throw Error(
    `Cannot extract page title, given object does not match expected page types. The underlying Notion API might have changed, please report an issue to the author.`
  );
}

export async function getCoverLink(
  page_id: string,
  notion: Client
): Promise<{link: string, expiry_time: string | null} | null> {
  const page = await notion.pages.retrieve({ page_id });
  if (!isFullPage(page)) return null;
  if (page.cover === null) return null;
  if (page.cover.type === "external") return {
    link: page.cover.external.url,
    expiry_time: null
  };
  else return {
    link: page.cover.file.url,
    expiry_time: page.cover.file.expiry_time
  };
}

export function getFileName(title: string, page_id: string): string {
  return title.replaceAll(" ", "-").replace(/--+/g, "-") +
  "-" +
  page_id.replaceAll("-", "") + '.md';
}