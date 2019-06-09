/* global Vue, btoa, ClipboardJS */
/* eslint-disable no-new */
new Vue({
  /* eslint-enable no-new */
  el: '#app',
  data: {
    generatedLink: '',
    enteredLink: ''
  },
  methods: {
    genLink() {
      this.generatedLink = btoa(this.enteredLink)
    }
  }
})

/* eslint-disable no-new */
new ClipboardJS('.copy-btn')
/* eslint-enable no-new */
