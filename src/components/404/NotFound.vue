<template>
  <div class="404">
    <h1>您访问的页面不存在！！！</h1>
    <p>
      将在 {{ time }} 秒后，返回首页！
      <router-link to="/home">点击直接返回首页</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: 5,
      timerId: null
    }
  },

  created () {
    this.timerId = setInterval(() => {
      this.time--

      if (this.time <= 0) {
        this.$router.push('/home')
        clearInterval(this.timerId)
      }
    }, 1000)
  }
}
</script>

<style>
</style>
