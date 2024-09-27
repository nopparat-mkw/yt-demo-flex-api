import { NextResponse } from 'next/server';
import { fetchDrContents } from '../../../lib/drContent';  // ดึงข้อมูลจาก lib

export async function GET() {
  const items = await fetchDrContents();

  const rssItems = items.map(item => `
    <item>
      <title>${item.title}</title>
      <guid isPermaLink="true">${item.link}</guid>
      <link>${item.link}</link>
      <description>${item.description}</description>
      <enclosure url="${item.enclosure}" type="image/jpeg"/>
      <pubDate>${new Date(item.publishedDate).toUTCString()}</pubDate>
      <media:thumbnail url="${item.thumbnail}" />
    </item>
  `).join('');

  const rssFeed = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>RSS Feed</title>
        <link>https://dr.yuanta.co.th/</link>
        <description>Latest data from rss</description>
        <language>th</language>
        <pubDate>${new Date().toUTCString()}</pubDate>
        ${rssItems}
      </channel>
    </rss>
  `;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    //   'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}
