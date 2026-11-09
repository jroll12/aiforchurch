/*
 * Every internal link goes through url() so the site keeps working if it is
 * ever served from a subpath. Change `base` in astro.config.mjs, not here.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site path ("/register/") with the base. Anchors and external URLs pass through. */
export function url(path: string): string {
  return path.startsWith('/') ? `${BASE}${path}` : path;
}
