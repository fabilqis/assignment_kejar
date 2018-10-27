(function() {
  'use strict';

  var filesToCache = [
	'.',
	'index.html',
	'404.html',
	'index.css',
	'Project1/index.js',
	'Project1/index.html',
	'Project2/index.html',
	'Asset/barelang.jpg',
	'Asset/dilla.jpg',
	'Asset/kejar.png',
	'Asset/kepiting.jpg',
	'Asset/love.jpg',
	'Asset/sei.jpg',
	'Asset/wey.jpg'
  ];

  var staticCacheName = 'pages-cache-v1';

  self.addEventListener('install', function(event) {
	console.log('Attempting to install service worker and cache static assets');
	event.waitUntil(
	  caches.open(staticCacheName)
	  .then(function(cache) {
		return cache.addAll(filesToCache);
	  })
	);
  });

  self.addEventListener('fetch', function(event) {
	console.log('Fetch event for ', event.request.url);
	event.respondWith(
	  caches.match(event.request).then(function(response) {
		if (response) {
		  console.log('Found ', event.request.url, ' in cache');
		  return response;
		}
		console.log('Network request for ', event.request.url);
		return fetch(event.request).then(function(response) {
		  if (response.status === 404) {
			return caches.match('404.html');
		  }
		  return caches.open(staticCacheName).then(function(cache) {
			if (event.request.url.indexOf('test') < 0) {
			  cache.put(event.request.url, response.clone());
			}
			return response;
		  });
		});
	  }).catch(function(error) {
		console.log('Error, ', error);
		return caches.match('pages/offline.html');
	  })
	);
  });

})();
