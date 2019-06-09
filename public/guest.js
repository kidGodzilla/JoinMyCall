/* global Vue, atob, window */
/* eslint-disable no-new */
new Vue({
  /* eslint-enable no-new */
  el: '#app',
  data: {
    currentScreen: 'start',
    callLink: atob(window.location.pathname.split('/')[2]) // Get the call link from our magic link
  }
})
