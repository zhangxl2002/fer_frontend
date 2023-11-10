<template>
  <div>
    <div class="upperright">
    <button @click="toggleLogin"> Log in</button>
    <button @click="toggleSignup"> Sign up</button>
    </div>

    <nav>
      <router-link to="/">欢迎页</router-link> |
      <router-link to="/about">图片上传</router-link> |
      <router-link to="/gallery">我的图片</router-link> 
      <!-- <router-link :to="{name: 'login'}"> Login </router-link>  -->
    </nav>

    <div v-if="showLogin">
      <Login @close="toggleLogin">
      </Login>
    </div>

    <div v-if="showSignup">
      <Signup @close="toggleSignup">

      </Signup>
    </div>

    <router-view/>
  </div>
  
</template>

<script>
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
export default {
  components: {
    Signup,
    Login
  },
  data() {
    return {
      showLogin: false,
      showSignup: false
    }
  },
  methods: {
    toggleLogin(){
      this.showLogin = !this.showLogin
    },
    toggleSignup(){
      this.showSignup = !this.showSignup
    }
  }
}
</script>
<style>
.upperright {
  position: absolute;
  top: 0;
  right: 0;  
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
img {
  width: 250px;
  height: 250px;
}
</style>
