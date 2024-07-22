import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', onSubmit);

  function onSubmit(event) {
    event.preventDefault();

    const delay = parseInt(form.elements.delay.value);
    const state = form.elements.state.value;

    createPromise(delay, state)
      .then(message => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${message}ms`,
          position: 'topRight',
          class: 'iziToast-custom',
          icon: '',
          iconText: '',
        });
      })
      .catch(message => {
        iziToast.error({
          message: `❌ Rejected promise in ${message}ms`,
          position: 'topRight',
          class: 'iziToast-custom',
          icon: '',
          iconText: '',
        });
      });
  }

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }
});
