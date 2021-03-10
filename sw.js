//Cachear archivos de la pagina para que funcione sin internet
const nombreCache = 'clima-v1';
const archivos = [
    //Para evitar error de ruta colocamos un . es decir la ruta relativa
    '/clima/',
    '/clima/index.html',
    '/clima/error.html',
    '/clima/css/tailwind.min.css',
    '/clima/css/styles.css',
    '/clima/js/app.js',
    '/clima/js/clima.js'
];


//Cuando se  instala el service Worker(Solo se ejecuta una vez)
self.addEventListener('install', e => {
    console.log('Instalado el service Worker');

    //Guardar en cache
    e.waitUntil(
        caches.open(nombreCache)
        .then(cache => {
            console.log('Cacheando');
            //agregamos los caches
            cache.addAll(archivos);
        })
    )
});


self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then((response) => response || fetch(e.request)),
    );
  });