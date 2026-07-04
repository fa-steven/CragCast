/* CragCast service worker
   - HTML / navigations: network-first (revalidated) so a fresh deploy always
     wins when online; falls back to the cached shell only when offline.
   - Other same-origin assets (icons, manifest): stale-while-revalidate.
   - Weather API: network-first, fall back to last good response offline.
   Bump VERSION on each deploy to guarantee old caches are cleared. */
const VERSION = "2026-07-03";
const SHELL = "cragcast-shell-" + VERSION;
const DATA  = "cragcast-data-v1";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icon-180.png", "./icon-192.png", "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== SHELL && k !== DATA).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isHTML(req){
  if (req.mode === "navigate") return true;
  const accept = req.headers.get("accept") || "";
  return req.method === "GET" && accept.includes("text/html");
}

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);

  // Weather API: network-first, fall back to last good response when offline.
  if (url.hostname.endsWith("open-meteo.com")) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(DATA).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Only handle our own GET requests below.
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  // HTML / navigations: network-first. `cache: "no-cache"` forces a revalidation
  // so we bypass the CDN's HTML cache and always pick up the newest deploy.
  if (isHTML(req)) {
    e.respondWith(
      fetch(req, { cache: "no-cache" }).then(res => {
        const copy = res.clone();
        caches.open(SHELL).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
    return;
  }

  // Static assets: stale-while-revalidate — serve cache instantly, refresh in the
  // background so the next load has the latest.
  e.respondWith(
    caches.match(req).then(hit => {
      const network = fetch(req).then(res => {
        const copy = res.clone();
        caches.open(SHELL).then(c => c.put(req, copy));
        return res;
      }).catch(() => hit);
      if (hit) e.waitUntil(network);   // keep the background refresh alive
      return hit || network;
    })
  );
});
