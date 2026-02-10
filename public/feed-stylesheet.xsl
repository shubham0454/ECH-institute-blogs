<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>
          <xsl:value-of select="/rss/channel/title"/>
        </title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@400;500;600;700&amp;family=Roboto:wght@300;400;500;700&amp;display=swap" rel="stylesheet"/>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #0a0a0a;
            background: #f5f5f5;
            padding: 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          header {
            border-bottom: 3px solid #000000;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          h1, h2 {
            font-family: 'Antonio', sans-serif;
            color: #000000;
          }
          h1 {
            font-size: 2em;
            margin-bottom: 10px;
          }
          .description {
            color: #666;
            font-size: 1.1em;
            margin-bottom: 10px;
          }
          .meta {
            color: #999;
            font-size: 0.9em;
          }
          .item {
            border-bottom: 1px solid #eee;
            padding: 25px 0;
          }
          .item:last-child {
            border-bottom: none;
          }
          .item-title {
            font-size: 1.4em;
            margin-bottom: 10px;
          }
          .item-title a {
            color: #000000;
            text-decoration: none;
          }
          .item-title a:hover {
            text-decoration: underline;
          }
          .item-meta {
            color: #999;
            font-size: 0.9em;
            margin-bottom: 15px;
          }
          .item-description {
            color: #555;
            line-height: 1.8;
            margin-bottom: 15px;
          }
          .item-description img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 10px 0;
          }
          .item-link {
            display: inline-block;
            margin-top: 10px;
            color: #000000;
            text-decoration: none;
            font-weight: 500;
          }
          .item-link:hover {
            text-decoration: underline;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #999;
            font-size: 0.9em;
          }
          .rss-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background: #000000;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
          }
          .rss-link:hover {
            background: #333333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>
              <xsl:value-of select="/rss/channel/title"/>
            </h1>
            <div class="description">
              <xsl:value-of select="/rss/channel/description"/>
            </div>
            <div class="meta">
              <xsl:if test="/rss/channel/link">
                <a href="{/rss/channel/link}" style="color: #000000; text-decoration: none;">
                  <xsl:value-of select="/rss/channel/link"/>
                </a>
              </xsl:if>
              <xsl:if test="/rss/channel/lastBuildDate">
                <br/>Last updated: <xsl:value-of select="/rss/channel/lastBuildDate"/>
              </xsl:if>
            </div>
          </header>
          <main>
            <xsl:for-each select="/rss/channel/item">
              <article class="item">
                <h2 class="item-title">
                  <a href="{link}">
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <div class="item-meta">
                  <xsl:if test="pubDate">
                    <strong>Published:</strong> <xsl:value-of select="pubDate"/>
                  </xsl:if>
                  <xsl:if test="author">
                    <br/><strong>Author:</strong> <xsl:value-of select="author"/>
                  </xsl:if>
                </div>
                <xsl:if test="description">
                  <div class="item-description">
                    <xsl:value-of select="description" disable-output-escaping="yes"/>
                  </div>
                </xsl:if>
                <xsl:if test="link">
                  <a href="{link}" class="item-link">Read more →</a>
                </xsl:if>
              </article>
            </xsl:for-each>
          </main>
          <footer class="footer">
            <xsl:if test="/rss/channel/copyright">
              <div>
                <xsl:value-of select="/rss/channel/copyright"/>
              </div>
            </xsl:if>
            <!-- <a href="{/rss/channel/link}/feed.xml" class="rss-link">Subscribe to RSS Feed</a> -->
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
