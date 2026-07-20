// MAIN CACHE CONFIG
  const ToCacheFileList = [
    "/NEWTAB/0.png",
    
    "/NEWTAB/ASSETS/BACKGROUNDS/00.mp4",
    
    "/NEWTAB/ASSETS/ICONS/border-radius.svg",
    "/NEWTAB/ASSETS/ICONS/moon.svg",
    "/NEWTAB/ASSETS/ICONS/search.svg",
    "/NEWTAB/ASSETS/ICONS/settings.svg",
    "/NEWTAB/ASSETS/ICONS/sun.svg",
    "/NEWTAB/ASSETS/ICONS/theme.svg",
    "/NEWTAB/ASSETS/ICONS/wallpaper.svg",
    
    "/NEWTAB/app.css",
    "/NEWTAB/app.js",
    
    "/NEWTAB/index.html",
    "/NEWTAB/style.css",
    "/NEWTAB/main.js",
    "/NEWTAB/service-worker.js",
    "/NEWTAB/manifest.json"
    
  ],CacheName = 'v21.07.26';
  
  
// CACHE ALL FILES WHEN INSTALLED
  self.addEventListener('install',(event)=>{
    self.skipWaiting();
    event.waitUntil(
      caches.open(CacheName).then((cache)=>{
        return cache.addAll(ToCacheFileList);
      })
    )
  });
  
  
// FETCH OFFLINE CACHE ON REQUEST
// CACHE FIRST AND CLONE NEW RESOURCE 
  self.addEventListener('fetch',(event)=>{
    event.respondWith(
      caches.match(event.request).then((response)=>{
        if (response) return response;
        
        return fetch(event.request).then((networkResponse)=>{
          const isSelfOrigin = event.request.url.startsWith(self.location.origin);
          if(isSelfOrigin && networkResponse && networkResponse.status === 200){
            const responseToCache = networkResponse.clone();
            caches.open(CacheName).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
        })
      })
    )
  });
  
// DELETE OLD CACHES & UPDATE CACHE
  self.addEventListener('activate',(event)=>{
    self.clients.claim();
    event.waitUntil(
      caches.keys().then((StoredCacheNameList)=>{
        return Promise.all(
          StoredCacheNameList.map((StoredCache)=>{
            if(StoredCache !== CacheName){
              return caches.delete(StoredCache);
            }
          })
        )
      })
    );
  });