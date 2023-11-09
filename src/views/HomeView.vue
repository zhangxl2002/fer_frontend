<template>
  <div>
    <h1>Facial Expression Recognition</h1>  
    <p v-if="name">Welcome!{{ name }}</p>
    <img src="../assets/hf.jpg" alt="">
  </div>

</template>

<script>

export default {
  name: 'HomeView',
  // inject: ['globalData'],
  methods: {
    // handleClick() {
    //   console.log(this.globalData.token)
    // }
  },
  data() {
    return {
      token: localStorage.getItem("token"),
      name: localStorage.getItem("name")
    }
  },
  mounted() {
    console.log("mounted")
  },
}
</script>
