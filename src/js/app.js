import Widget from './Widget';

const wdg = new Widget();
wdg.init();

if (navigator.serviceWorker) {
  window.addEventListener('load', async () => {
    try {
      if (navigator.serviceWorker) {
        await navigator.serviceWorker.register(
          './service-worker.js',
        );
      }
    } catch (err) {
      console.log(err);
    }
  });
}
