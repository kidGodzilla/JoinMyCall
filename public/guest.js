/* global Vue, atob, window, Peer, document, navigator */
const peer = new Peer()

peer.on('open', id => {
  console.log('My peer ID is: ' + id)
})

let conn = {}

/* eslint-disable no-new */
new Vue({
  /* eslint-enable no-new */
  el: '#app',
  data: {
    currentScreen: 'start',
    callLink: atob(window.location.pathname.split('/')[2]), // Get the call link from our magic link
    conn: null,
    loading: null,
    isMobile: (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
  },
  watch: {
    currentScreen() {
      if (this.currentScreen === 'step1') {
        this.loading = true // Start loading
        setTimeout(async () => {
          const mediaStream = await navigator
            .mediaDevices
            .getUserMedia({audio: true, video: true})
            .catch(() => {
              // Realize that a user disallowed us camera access
              this.loading = 'NOTALLOWED'
            })
          document.querySelector('#localVideo').srcObject = mediaStream
          document.querySelector('#localVideo').play()
          const id = document.querySelector('#remoteVideoFrame').contentWindow.getID()
          console.log(id)
          conn = peer.call(id, mediaStream)
          conn.on('stream', stream => {
            // `stream` is the MediaStream of the remote peer.
            console.log(stream)
            this.loading = false // Show the MediaStream!
            // Document.querySelector('#remoteVideo').srcObject = stream
            // Document.querySelector('#remoteVideo').play()
          })
        }, 5000)
      } else if (conn.open) {
        conn.close()
      }
    }
  }
})
