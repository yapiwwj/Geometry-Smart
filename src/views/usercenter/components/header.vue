<script setup lang="ts"></script>

<template>
  <div class="header-box">
    <div class="left">
      <img src="../../../assets/icons/me.svg" alt="" />
      <span>Admin</span>
    </div>
    <div class="right">
      <div class="score-box">
        <p>95</p>
        <span>分</span>
      </div>
      <button>综合成绩</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-box {
  display: flex;
  justify-content: space-between;
  padding: 10px;

  .left {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      color: #ffffff;
      margin-right: 10px;
    }

    span {
      font-weight: 600;
    }
  }

  .right {
    margin-right: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .score-box {
      display: flex;
      justify-content: center;
      align-items: baseline;

      p {
        font-size: 32px;
        font-weight: 600;
        margin-right: 2px;
      }
    }

    button {
      background: #ffffff;
      color: #89b0ff;
      border: 1px solid #89b0ff;
      border-radius: 16px;
      padding: 5px 10px;
    }
  }
}
</style>
