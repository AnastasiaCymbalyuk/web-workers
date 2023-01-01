/* eslint-disable no-console */
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
        console.log('registered');
      }
    } catch (err) {
      console.log(err);
    }
  });
}
