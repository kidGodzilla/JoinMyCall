/* global Vue, btoa, ClipboardJS */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    generatedLink: '',
    enteredLink: '',
    copyStatus: 'Copy'
  },
  methods: {
    genLink() {
      this.copyStatus = 'Copy' // Set status to default after every new generated link
      new ClipboardJS('.copy-btn')
      this.generatedLink = btoa(this.enteredLink)
      /* Clipboard.on('success', () => {
        this.copyStatus = 'Copied'
      }) */ // There were some issues with the clipboard on iOS 9
    }
  }
})
