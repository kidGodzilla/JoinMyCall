/* global Vue, atob, window, Peer */

const peer = new Peer()

peer.on('open', id => {
  console.log('My peer ID is: ' + id)
})

peer.on('call', async call => {
  // Answer the call, providing our mediaStream
  console.log(call)
  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
  call.answer(mediaStream)
  console.log(call.remoteStream)
  setTimeout(() => {
    document.getElementById('remoteVideo').srcObject = call.remoteStream
    console.log(call.remoteStream)
  }, 1000)
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
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        document.getElementById('localVideo').srcObject = mediaStream
        document.getElementById('localVideo').play()
        conn = peer.call(peer.id, mediaStream)
        
        conn.on('stream', function(stream) {
          console.log(stream)
          // `stream` is the MediaStream of the remote peer.
          // Here you'd add it to an HTML video/canvas element.
          document.getElementById('remoteVideo').srcObject = stream
          document.getElementById('remoteVideo').play()
        })
      }
    }
  }
})
