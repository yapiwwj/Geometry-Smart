<template>
  <div>
    <video ref="remoteVideo" autoplay playsinline></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const remoteVideo = ref<HTMLVideoElement | null>(null)
    let peerConnection: RTCPeerConnection | null = null
    const socket = new WebSocket('ws://your-signaling-server') // 替换为你的信令服务器地址

    socket.onmessage = async (message) => {
      const data = JSON.parse(message.data)
      if (data.type === 'offer') {
        peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        })

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate }))
          }
        }

        peerConnection.ontrack = (event) => {
          if (remoteVideo.value) {
            remoteVideo.value.srcObject = event.streams[0]
          }
        }

        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)
        socket.send(JSON.stringify({ type: 'answer', answer }))
      } else if (data.type === 'ice-candidate') {
        const candidate = new RTCIceCandidate(data.candidate)
        await peerConnection?.addIceCandidate(candidate)
      }
    }

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'viewer-join', room: 'your-room-id' })) // 通知服务器，观众已加入
    }

    return {
      remoteVideo
    }
  }
})
</script>

<style scoped>
video {
  width: 100%;
  height: 100%;
}
</style>
