<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom">
    
<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/rss/channel">
<html>
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title><xsl:value-of select="title"/> - RSS Feed</title>

    <link rel="stylesheet" href="/syntax.css"/>
    <style>
        :root {
            --bg-color: #FFFFFF;
            --fg-color: #000000;
            --unvisited: #004080;
            --visited: #800040;
            --table-border: #ddd;
            --table-heading: #f2f2f2;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #121212;
                --fg-color: #FFFFFF;
                --unvisited: #B0CFFF;
                --visited: #FFA7CE;
                --table-border: #353535;
                --table-heading: #252525;
            }
        }

        @font-face {
            font-family: 'Gadelica';
            src: url('/fonts/Gadelica.woff');
            font-weight: 100;
            font-style: normal;
        }

        @font-face {
            font-family: 'EB Garamond';
            src: url('/fonts/EBGaramond12-Regular.otf') format('opentype');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: 'EB Garamond';
            src: url('/fonts/EBGaramond12-Italic.otf') format('opentype');
            font-weight: normal;
            font-style: italic;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background-color: var(--bg-color);
            color: var(--fg-color);
            font-family: 'EB Garamond', Serif;
            font-size: 1.15em;
            line-height: 1.25;
            max-width: 600pt;
            text-align: justify;
            text-justify: inter-word;
            margin: auto;
            padding-left: 20pt;
            padding-right: 20pt;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        
        main {
            flex: 1;
        }
        
        header {
            border-bottom: 2px solid var(--table-border);
            padding-bottom: 20px;
            margin-bottom: 30px;
            margin-top: 20px;
        }
        
        h1 {
            text-align: center;
            margin: 0.5em 0;
            line-height: 1.1;
            font-weight: normal;
            font-family: 'Gadelica', serif;
        }
        
        h2 {
            text-align: center;
            font-weight: normal;
            margin: 1em 0 0.5em 0;
        }
        
        .feed-info {
            text-align: center;
            margin-bottom: 15px;
            opacity: 0.9;
        }
        
        .feed-info a {
            color: var(--fg-color);
            text-underline-offset: 0.18em;
        }
        
        .feed-info a:hover {
            color: var(--unvisited);
        }
        
        .subscribe-info {
            background-color: var(--table-heading);
            border-left: 4px solid var(--fg-color);
            padding: 15px;
            margin-bottom: 30px;
            font-style: italic;
        }
        
        .subscribe-info p {
            margin-bottom: 8px;
        }
        
        .subscribe-info p:last-child {
            margin-bottom: 0;
        }
        
        .items {
            list-style: none;
            padding: 0;
        }
        
        .item {
            padding: 20px 0;
            border-bottom: 1px solid var(--table-border);
        }
        
        .item:last-child {
            border-bottom: none;
        }
        
        .item h2 a {
            color: var(--unvisited);
            text-decoration: underline;
            text-underline-offset: 0.18em;
            word-break: break-word;
            overflow-wrap: anywhere;
        }
        
        .item h2 a:hover {
            opacity: 0.8;
        }
        
        .item-meta {
            text-align: center;
            font-size: 0.9em;
            margin-bottom: 12px;
            font-variant-numeric: oldstyle-nums;
            font-feature-settings: "onum";
        }
        
        .item-description {
            line-height: 1.5;
            margin-top: 10px;
        }
        
        @media (max-width: 650px) {
            body {
                padding-left: 10pt;
                padding-right: 10pt;
            }
        }
    </style>
</head>
<body>
    <main>
        <header>
            <h1><xsl:value-of select="title"/></h1>
            <div class="feed-info">
                <p><xsl:value-of select="description"/></p>
                <xsl:if test="link">
                    <p><a href="{link}">Visit Website →</a></p>
                </xsl:if>
            </div>
        </header>
        
        <div class="subscribe-info">
            <p><strong>📡 This is an RSS feed</strong></p>
            <p>Copy the URL from your browser's address bar and paste it into your RSS reader to subscribe.</p>
        </div>
        
        <ul class="items">
            <xsl:for-each select="item">
                <li class="item">
                    <h2>
                        <a href="{link}">
                            <xsl:value-of select="title"/>
                        </a>
                    </h2>
                    <div class="item-meta">
                        <xsl:if test="pubDate">
                            <time><xsl:value-of select="pubDate"/></time>
                        </xsl:if>
                    </div>
                    <xsl:if test="description">
                        <div class="item-description">
                            <xsl:value-of select="description" disable-output-escaping="yes"/>
                        </div>
                    </xsl:if>
                </li>
            </xsl:for-each>
        </ul>
    </main>
</body>
</html>
</xsl:template>

</xsl:stylesheet>
