/**
 * Post-build prerender script.
 *
 * For each blog article route, writes a dist/blog/[slug]/index.html that
 * has the correct <title>, <meta description>, <link rel="canonical">,
 * Open Graph tags, and JSON-LD baked directly into the HTML.
 *
 * This means Googlebot sees full metadata immediately — no JS execution
 * required — so each blog post is indexed as an individual page.
 *
 * Run after `vite build`:
 *   node scripts/prerender.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const baseHtmlPath = path.join(distDir, "index.html");

if (!fs.existsSync(baseHtmlPath)) {
  console.error("❌  dist/index.html not found — run `npm run build` first.");
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, "utf-8");

// Article data mirrored from client/src/data/articles.ts
// Keep in sync when new articles are added.
const articles = [
  {
    slug: "hair-dye-cancer-risk",
    title: "染髮劑致癌？醫師破解PPD迷思＋5個安全染髮關鍵",
    metaDescription:
      "染髮劑致癌嗎？醫師指出PPD僅屬第3類致癌物，風險遠低於想像。了解IARC分級、染髮劑副作用，以及5大安全染髮方法，讓你染得美又放心。",
    category: "頭皮知識",
    date: "2026-04-01",
    readingTime: 7,
    coverImage:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&q=85&auto=format&fit=crop",
    coverAlt:
      "美髮師為客人進行染髮護理，了解PPD染髮劑致癌風險與安全染髮方法 — 沐璿草本護髮中心",
  },
  {
    slug: "heat-styling-hair-damage",
    title: "吹風機、直髮夾天天用？頭髮斷裂毛躁的真正原因在這裡",
    metaDescription:
      "吹風機、直髮夾、捲髮棒天天用導致頭髮斷裂、毛躁、角蛋白流失？本文解析熱造型傷髮原理、直髮夾溫度設定建議、熱防護噴霧正確用法，以及草本深層修護如何幫助熱傷害髮質恢復光澤。沐璿草本護髮中心提供天然熱傷害修復療程。",
    category: "護髮教學",
    date: "2026-03-18",
    readingTime: 5,
    coverImage:
      "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1200&q=100&sharp=20&auto=format&fit=crop",
    coverAlt:
      "美髮師使用捲髮棒為客人進行熱造型，展示高溫工具對毛鱗片與角蛋白的影響及正確護髮方式 — 沐璿草本護髮中心",
  },
  {
    slug: "conditioner-scalp-mistakes",
    title: "護髮素直接抹頭皮？關於這個習慣，你需要知道的事",
    metaDescription:
      "護髮素抹頭皮真的沒問題嗎？本文以 Q&A 解析矽靈堆積、毛囊堵塞與頭皮出油惡性循環的成因，並教你正確使用護髮素的步驟，適合油性頭皮、落髮族群必讀。",
    category: "護髮教學",
    date: "2026-03-05",
    readingTime: 5,
    coverImage: "https://muxuantw.com/blog/conditioner-scalp-mistakes.png",
    coverAlt:
      "護髮素正確塗抹於髮中髮尾示範，避免直接接觸頭皮導致毛孔阻塞與頭皮出油加重 — 沐璿草本護髮中心",
  },
  {
    slug: "postpartum-hair-loss",
    title: "產後落髮怎麼辦？原因解析與草本護理建議",
    metaDescription:
      "產後落髮的原因、持續時間與草本護理建議。沐璿草本護髮中心提供溫和天然的頭皮養護，幫助產後媽媽在安心的環境中恢復頭皮健康。",
    category: "護髮教學",
    date: "2026-02-20",
    readingTime: 5,
    coverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85&auto=format&fit=crop",
    coverAlt:
      "女性梳理長髮反映產後落髮困擾，透過草本頭皮護理幫助休止期脫髮後恢復髮量 — 沐璿草本護髮中心",
  },
  {
    slug: "herbal-vs-chemical-dye",
    title: "草本染髮 vs 化學染髮：您的頭皮受得了嗎？",
    metaDescription:
      "草本染髮 vs 化學染髮全面比較：成分安全性、對頭皮的影響、染色持久度與適合族群。沐璿草本護髮中心不含 PPD、不含 PTD，提供敏感肌友善的天然染髮選擇。",
    category: "草本知識",
    date: "2026-02-07",
    readingTime: 6,
    coverImage:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=85&auto=format&fit=crop",
    coverAlt:
      "天然草本精油滴落於手心，象徵草本染髮無 PPD 無氨水配方對頭皮安全溫和 — 沐璿草本護髮中心",
  },
  {
    slug: "scalp-oil-causes",
    title: "頭皮老是出油？背後的 4 個真正原因",
    metaDescription:
      "頭皮出油的 5 大真正原因：皮脂腺過度分泌、洗髮方式錯誤、飲食油膩、壓力荷爾蒙、以及錯誤的護髮產品。沐璿草本護髮中心為您深度解析並提供天然調理建議。",
    category: "頭皮知識",
    date: "2026-01-26",
    readingTime: 5,
    coverImage: "https://muxuantw.com/blog/scalp-oil-causes.webp",
    coverAlt:
      "女性照鏡子審視頭髮狀態，了解頭皮出油、皮脂腺過度分泌與草本調理改善方法 — 沐璿草本護髮中心",
  },
];

function buildJsonLd(article) {
  const url = `https://muxuantw.com/blog/${article.slug}`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: "https://muxuantw.com" },
          { "@type": "ListItem", position: 2, name: "護髮部落格", item: "https://muxuantw.com/blog" },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": url,
        headline: article.title,
        name: article.title,
        description: article.metaDescription,
        datePublished: article.date,
        dateModified: article.date,
        articleSection: article.category,
        inLanguage: "zh-TW",
        url,
        isPartOf: { "@id": "https://muxuantw.com/blog" },
        author: {
          "@type": "Person",
          name: "沐璿護理師",
          worksFor: { "@id": "https://muxuantw.com/#organization" },
        },
        publisher: { "@id": "https://muxuantw.com/#organization" },
        image: {
          "@type": "ImageObject",
          url: article.coverImage,
          description: article.coverAlt,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      },
    ],
  });
}

function escape(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

let count = 0;

for (const article of articles) {
  const url = `https://muxuantw.com/blog/${article.slug}`;
  const pageTitle = `${article.title} | 沐璿草本護髮部落格`;

  let html = baseHtml;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(pageTitle)}</title>`);

  // <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escape(article.metaDescription)}"`
  );

  // <link rel="canonical">
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${url}"`
  );

  // OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escape(pageTitle)}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escape(article.metaDescription)}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${url}"`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="article"`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*"/,
    `<meta property="og:image" content="${escape(article.coverImage)}"`
  );
  html = html.replace(
    /<meta property="og:image:alt" content="[^"]*"/,
    `<meta property="og:image:alt" content="${escape(article.coverAlt)}"`
  );

  // Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escape(pageTitle)}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escape(article.metaDescription)}"`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${escape(article.coverImage)}"`
  );

  // Inject article-specific JSON-LD just before </head>
  // (the base JSON-LD with Organization/WebSite stays; this adds BlogPosting)
  const articleJsonLd = `  <script type="application/ld+json">\n  ${buildJsonLd(article)}\n  </script>\n</head>`;
  html = html.replace("</head>", articleJsonLd);

  // Write to dist/blog/[slug]/index.html
  const outDir = path.join(distDir, "blog", article.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");

  console.log(`✅  dist/blog/${article.slug}/index.html`);
  count++;
}

console.log(`\n🎉  Prerendered ${count} blog routes.`);

// ─── Static shell pages for all main SPA routes ──────────────────────────────
// Vite's `emptyOutDir: true` wipes dist/ on every build, so these files must
// be re-created here (after the Vite build) rather than committed to git.
// Having a real file at dist/about/index.html means Vercel serves it directly
// instead of relying on catch-all rewrites, which avoids any routing edge cases.

const shellRoutes = [
  { route: "about",     title: "關於沐璿 | 沐璿草本護髮中心",     desc: "了解沐璿草本護髮中心的品牌故事、創辦理念，以及16年草本護髮專業經驗。" },
  { route: "cases",     title: "成功案例 | 沐璿草本護髮中心",     desc: "查看沐璿草本護髮真實調理案例，包括白髮、落髮、頭皮屑與油脂失衡等問題的改善成果。" },
  { route: "services",  title: "服務介紹 | 沐璿草本護髮中心",     desc: "沐璿草本護髮中心提供草本頭皮護理、草本染髮等服務，採用天然當歸、人蔘、何首烏配方，安全溫和。" },
  { route: "contact",   title: "聯絡我們 | 沐璿草本護髮中心",     desc: "聯絡沐璿草本護髮中心，預約台北林森店或嘉義店草本頭皮護理服務。" },
  { route: "locations", title: "門市資訊 | 沐璿草本護髮中心",     desc: "查看沐璿草本護髮中心台北林森店、嘉義店及新加坡門市地址、電話與營業時間。" },
  { route: "faq",       title: "草本護髮常見問題 | 沐璿草本護髮中心", desc: "關於沐璿草本護髮的常見問題：療程是否有效、能否改善落髮、草本與化學染髮的差異，以及費用與護理頻率說明。" },
  { route: "blog",      title: "護髮部落格 | 沐璿草本護髮中心",   desc: "沐璿草本護髮部落格：草本護髮知識、頭皮保養教學、染髮安全指南，由專業護理師撰寫。" },
];

let shellCount = 0;
for (const { route, title, desc } of shellRoutes) {
  const url = `https://muxuantw.com/${route}`;
  let html = baseHtml;

  // Patch <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Patch <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${desc}"`
  );

  // Patch <link rel="canonical"> — THIS is the critical fix
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${url}"`
  );

  // Patch OG tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${desc}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${url}"`);

  // Patch Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${desc}"`);

  const outDir = path.join(distDir, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
  console.log(`✅  dist/${route}/index.html  (canonical: ${url})`);
  shellCount++;
}

console.log(`\n🎉  Wrote ${shellCount} static shell pages for SPA routes.`);
