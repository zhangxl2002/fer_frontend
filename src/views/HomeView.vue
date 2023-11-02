<template>
  <div>
    <h1>the home page</h1>  
    <p v-if="token">{{token}}</p>
    <!-- <p>{{globalData.token}}</p> -->
    <!-- <button @click="handleClick"> show token </button> -->
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
      token: localStorage.getItem("token")
    }
  },
  mounted() {
    console.log("mounted")
  },
}
</script>
