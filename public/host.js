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
      let clipboard = new ClipboardJS('.copy-btn')
      this.generatedLink = btoa(this.enteredLink)
      clipboard.on('success', () => {
        this.copyStatus = 'Copied'
      })
    }
  }
})
