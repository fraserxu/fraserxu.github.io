function registerServiceWorker () {
  if (!navigator.serviceWorker) return

  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  }).then(function (reg) {
    if (!navigator.serviceWorker.controller) {
      return
    }

    function trackInstalling (worker) {
      console.log('track installing...')
      worker.addEventListener('statechange', function () {
        if (worker.state == 'installed') {
          updateReady(worker)
        }
      });
    }

    function updateReady (worker) {
      console.log('update ready...')
      worker.postMessage({action: 'skipWaiting'})
    }

    if (reg.waiting) {
      console.log('wating...')
      updateReady(reg.waiting)
      return
    }

    if (reg.installing) {
      console.log('installing...')
      trackInstalling(reg.installing)
      return
    }

    reg.addEventListener('updatefound', function () {
      console.log('update found...')
      trackInstalling(reg.installing)
    })
  }).catch(function (err) {
    console.log('sw.js register failed.', err)
  })
}

registerServiceWorker()
