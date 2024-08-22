<script setup>
// const deskVideo = document.getElementById('deskVideo');
// async function captureDesk() {
//             deskVideo.srcObject = await navigator.mediaDevices.getDisplayMedia({
//                 video: {
//                     cursor: "always"
//                 },
//                 audio: false
//             });
//         }();
</script>

<template>
  <div class="ai-container">
    <ul class="box left">
      <li>
        <!-- <div id="local-video"></div> -->
        <video src="" id="deskVideo" autoplay controls="true"></video>
      </li>
    </ul>
    <ul class="box right">
      <li>
        <div id="remote-video"></div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import url('../../styles/function/onlineClass.scss');
// iframe{
//   width: 100%;
//   height: 80vh;
// }
</style>
