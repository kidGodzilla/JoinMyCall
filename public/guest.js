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
    conn: null
  },
  watch: {
    async currentScreen() {
      if (this.currentScreen === 'step1') {
        setTimeout(() => {
          const mediaStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})
          document.querySelector('#localVideo').srcObject = mediaStream
          document.querySelector('#localVideo').play()
          const id = document.querySelector('#remoteVideoFrame').contentWindow.getID()
          console.log(id)
          conn = peer.call(id, mediaStream)
          conn.on('stream', stream => {
            console.log(stream)
            // `stream` is the MediaStream of the remote peer.
            // Here you'd add it to an HTML video/canvas element.
            document.querySelector('#remoteVideo').srcObject = stream
            document.querySelector('#remoteVideo').play()
          })
        }, 5000)
      } else if (conn.open) {
        conn.close()
      }
    }
  }
})
