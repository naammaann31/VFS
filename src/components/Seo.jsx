import { useEffect } from "react";

export const SITE_URL = "https://vectraforeignservices.com";
export const SITE_NAME = "Vectra Foreign Services";
export const DEFAULT_IMAGE = `${SITE_URL}/logo.webp`;

// index.html already ships a default title, description and social tags so that
// crawlers and link-preview bots that do not run JavaScript still get something
// sensible. This component updates those same tags in place for the current
// route (and creates any that are missing) instead of rendering a second set
// with React 19's <title>/<meta> hoisting, which would leave duplicate
// description/canonical/OG tags in <head> next to the static ones.

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);

  if (content == null || content === "") {
    if (el) el.remove();
    return;
  }

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');

  if (!href) {
    if (el) el.remove();
    return;
  }

  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const toAbsoluteUrl = (path) => (/^https?:\/\//i.test(path) ? path : `${SITE_URL}${path}`);

/**
 * Per-route <head> metadata.
 *
 * path       Route path such as "/about". Becomes the canonical URL and og:url.
 *            Leave it out for pages that must not have a canonical (noindex).
 * robots     e.g. "noindex, nofollow". When omitted, any robots tag is removed
 *            so the page is indexable by default.
 */
function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  robots,
  type = "website",
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
}) {
  useEffect(() => {
    const url = path ? toAbsoluteUrl(path) : null;

    if (title) document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", robots);
    setCanonical(url);

    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", ogTitle || title);
    setMeta("property", "og:description", ogDescription || description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", twitterTitle || ogTitle || title);
    setMeta("name", "twitter:description", twitterDescription || ogDescription || description);
    setMeta("name", "twitter:url", url);
    setMeta("name", "twitter:image", image);
  }, [
    title,
    description,
    path,
    image,
    robots,
    type,
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
  ]);

  return null;
}

export default Seo;
