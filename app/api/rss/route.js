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
  const limitParameter = parseInt(searchParams.get("limit"), 10) || 20;
  const limit = limitParameter > 20 || limitParameter <= 0 ? 20 : limitParameter;

  const items = await fetchData(contentType, limit);

  const rssItems = items.map((item, index) => `
        <item>
            <id>${index}</id>        
            <title>${item.title}</title>
            <guid isPermaLink="true">${item.link}</guid>
            <link>${item.link}</link>
            <description>${item.description}</description>
            <enclosure url="${item.enclosure}" type="image/jpeg"/>
            <image_link>${item.enclosure}</image_link>
            <pubDate>${new Date(item.publishedDate).toUTCString()}</pubDate>
            <price>0.01 THB</price>
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
        <ttl>${limit}</ttl>
        ${rssItems}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
}
