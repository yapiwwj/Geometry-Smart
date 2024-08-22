<template>
  <div>
    <div>
      <video ref="localVideo" autoplay playsinline></video>
      <div v-for="(stream, index) in remoteStreams" :key="index">
        <video :srcObject="stream" autoplay playsinline></video>
      </div>
      <video ref="screenVideo" autoplay playsinline></video>
    </div>
    <button @click="startCall">Start Call</button>
    <button @click="shareScreen">Share Screen</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  setup() {
    const localVideo = ref<HTMLVideoElement | null>(null);
    const screenVideo = ref<HTMLVideoElement | null>(null);
    const remoteStreams = reactive<MediaStream[]>([]);
    let localStream: MediaStream | null = null;
    let peerConnections: { [id: string]: RTCPeerConnection } = {};

    const socket = new WebSocket('ws://your-signaling-server'); // 替换为你的信令服务器地址

    const startCall = async () => {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideo.value && localStream) {
        localVideo.value.srcObject = localStream;
      }

      socket.onmessage = async (message) => {
        const data = JSON.parse(message.data);

        if (data.type === 'offer') {
          const peerConnection = createPeerConnection(data.from);
          await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          socket.send(JSON.stringify({ type: 'answer', answer, to: data.from }));
        }

        if (data.type === 'answer') {
          await peerConnections[data.from].setRemoteDescription(new RTCSessionDescription(data.answer));
        }

        if (data.type === 'ice-candidate') {
          const candidate = new RTCIceCandidate(data.candidate);
          await peerConnections[data.from].addIceCandidate(candidate);
        }
      };

      socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'join', room: 'your-room-id' })); // 房间ID可以是任意字符串，确保所有用户都使用相同的房间ID
      };

      // 当一个新用户加入时，为该用户创建一个新连接
      socket.onmessage = async (message) => {
        const data = JSON.parse(message.data);
        if (data.type === 'new-participant') {
          const peerConnection = createPeerConnection(data.id);
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          socket.send(JSON.stringify({ type: 'offer', offer, to: data.id }));
        }
      };
    };

    const createPeerConnection = (id: string) => {
      const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      };
      const peerConnection = new RTCPeerConnection(configuration);

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate, to: id }));
        }
      };

      peerConnection.ontrack = (event) => {
        if (event.streams[0]) {
          remoteStreams.push(event.streams[0]);
        }
      };

      localStream?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream!);
      });

      peerConnections[id] = peerConnection;

      return peerConnection;
    };

    const shareScreen = async () => {
      const screenStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });

      if (screenVideo.value) {
        screenVideo.value.srcObject = screenStream;
      }

      Object.values(peerConnections).forEach((peerConnection) => {
        const videoTrack = screenStream.getVideoTracks()[0];
        const sender = peerConnection.getSenders().find((s) => s.track?.kind === 'video');
        if (sender) {
          sender.replaceTrack(videoTrack);
        }
      });
    };

    return {
      localVideo,
      screenVideo,
      remoteStreams,
      startCall,
      shareScreen,
    };
  },
});
</script>

<style scoped>
video {
  width: 300px;
  height: 200px;
  margin: 10px;
}
</style>
<!-- <template>
  <div>
    <h1>Conference ID: {{ conferenceId }}</h1>
    <video ref="localVideo" autoplay></video>
    <video ref="remoteVideo" autoplay></video>
    <button @click="startScreenShare">Share Screen</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const conferenceId = route.params.id as string
    const localVideo = ref<HTMLVideoElement | null>(null)
    const remoteVideo = ref<HTMLVideoElement | null>(null)
    let peerConnection: RTCPeerConnection

    onMounted(async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (localVideo.value) {
        localVideo.value.srcObject = mediaStream
      }

      peerConnection = new RTCPeerConnection()
      mediaStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, mediaStream)
      })

      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams
        if (remoteVideo.value) {
          remoteVideo.value.srcObject = remoteStream
        }
      }

      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)

      // 使用 WebSocket 发送信令数据到服务器
      const ws = new WebSocket(`ws://localhost:8080/signaling/${conferenceId}`)
      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data)
        if (data.type === 'offer') {
          await peerConnection.setRemoteDescription(data)
          const answer = await peerConnection.createAnswer()
          await peerConnection.setLocalDescription(answer)
          ws.send(JSON.stringify(peerConnection.localDescription))
        } else if (data.type === 'answer') {
          await peerConnection.setRemoteDescription(data)
        } else if (data.type === 'candidate') {
          await peerConnection.addIceCandidate(data.candidate)
        }
      }

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          ws.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }))
        }
      }
    })

    const startScreenShare = async () => {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      screenStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, screenStream)
      })
    }

    return { conferenceId, startScreenShare }
  }
})
</script> -->
