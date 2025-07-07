export const htmlTemplate = ({
  title,
  description,
  icon,
  manifest,
  themeColor,
  ogTitle,
  ogType,
  ogUrl,
  ogImage,
  ogImageAlt,
  appleTouchIcon,
  styles,
  script,
  content,
}) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="${icon}" />
    <link rel="manifest" href="${manifest}" />
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${ogTitle ?? title}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:image" content="${ogImage ?? icon}" />
    <meta property="og:image:alt" content="${ogImageAlt}" />
    <link rel="apple-touch-icon" href="${appleTouchIcon ?? icon}" />
    <meta name="theme-color" content="${themeColor}" />
    <title>${title}</title><style>${styles}</style>
  </head>
  <body>
    ${content}
    <script src="${script}"></script>
  </body>
</html>`
