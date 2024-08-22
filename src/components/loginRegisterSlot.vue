<template>
  <div class="container">
    <!-- <iframe src="/static/home.html" frameborder="0" scrolling="no"></iframe> -->
    <iframe
      src="http://121.40.154.188:8080/courseware/img/6442c6ea-679b-46d0-b199-62eb7174dcbf.html"
      frameborder="0"
      scrolling="no"
    ></iframe>
    <div class="box">
      <slot name="title"></slot>
      <slot name="subTitle"></slot>
      <div class="content">
        <slot name="left"></slot>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import url('@/styles/components/loginRegisterSlot.scss');
</style>
