import { NextResponse } from "next/server";
import { fetchDrContents, fetchBlogYuanta } from "../../../lib/rssData"; // ดึงข้อมูลจาก lib

const fetchData = async (contentType, limit) => {
    switch(contentType) {
      case "dr":
          return  await fetchDrContents(limit);
      default:
        return await fetchBlogYuanta(limit);
    }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const contentType = searchParams.get("content") || "";
  const limit = parseInt(searchParams.get("limit"), 20) || 20;

  const items = await fetchData(contentType, limit);

//   <media:thumbnail url="${item.thumbnail}" />
  const rssItems = items.map((item) => `
        <item>
            <title>${item.title}</title>
            <guid isPermaLink="true">${item.link}</guid>
            <link>${item.link}</link>
            <description>${item.description}</description>
            <enclosure url="${item.enclosure}" type="image/jpeg"/>
            <pubDate>${new Date(item.publishedDate).toUTCString()}</pubDate>
        </item>
    `).join("").trim();

  const rssFeed = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>RSS Feed</title>
        <link>https://yuanta.co.th/</link>
        <description>Latest data from rss</description>
        <language>th</language>
        <copyright>Copyright 2016 Yuanta Securities (Thailand). All Rights Reserved.</copyright>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <ttl>20</ttl>
        ${rssItems}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
