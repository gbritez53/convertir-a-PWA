//asignar Nombre y Version al cache

const CACHE_NAME = "v1_cache_programador_fitness",
  urlsToCache = [
    "./",
    "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap",
    "https://use.fontawesome.com/releases/v5.0.7/css/all.css",
    "./style.css",
    "./main.js",
    "./img/ProgramadorFitness.png",
    "./img/icon_1024.png",
    "./img/icon_512.png",
    "./img/icon_384.png",
    "./img/icon_256.png",
    "./img/icon_192.png",
    "./img/icon_128.png",
    "./img/icon_96.png",
    "./img/icon_64.png",
    "./img/icon_32.png",
    "./img/favicon.png",
  ];

//Durante la fase de instalación, generalmente se almacena en cache los activos estáticos
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting());
      })
      .catch((err) => console.log("Fallo registro de cache", err))
  );
});

//Una vez se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cachesNames) => {
        cachesNames.map((cacheName) => {
          //Eliminamos lo que ya no se necesita en cache
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        });
      })
      //Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  );
});

//Cuando el navegador recupera una URL
self.addEventListener("fetch", (e) => {
  //Responde ya sera con el objeto en caché o a continuar y buscar la URL real
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        //recuperar del cache
        return res;
      }
      //recuperar de la peticion a la URL
      return fetch(e.request);
    })
  );
});
