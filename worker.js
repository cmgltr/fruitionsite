const NOTION_PAGE = '1ddd6db7d2508011b79cf032297d399f'; // Senin sayfa ID'in
const CUSTOM_DOMAIN = 'https://www.mecsys.com.tr'; // Kendi domain adresin
const NOTION_DOMAIN = 'https://www.notion.so';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Notion URL’sini hedefle
  const targetUrl = `${NOTION_DOMAIN}/${NOTION_PAGE}${url.pathname}${url.search}`;

  const response = await fetch(targetUrl, {
    headers: {
      'host': 'www.notion.so',
      'user-agent': request.headers.get('user-agent'),
      'accept-language': request.headers.get('accept-language'),
      'cookie': request.headers.get('cookie') || '',
    },
    redirect: 'follow'
  });

  // HTML içeriğini al
  let html = await response.text();

  // Notion linklerini senin domain adresinle değiştir
  html = html.replaceAll(NOTION_DOMAIN, CUSTOM_DOMAIN);
  html = html.replaceAll(`https://${url.host}`, CUSTOM_DOMAIN);

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8'
    }
  });
}
