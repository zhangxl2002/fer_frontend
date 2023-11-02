<template>
    <div class="backdrop" @click.self="handleClose">
        <form @submit.prevent="handleSubmit">
            <label>Email:</label>
            <input type="email" required v-model="email">
            <label>Password:</label>
            <input type="password" required v-model="password">
            <div v-if="passwordError" class="error">{{ passwordError }}</div>
            
            <div class="submit">
                <button> Log in </button>
            </div>
            <!-- <p v-if="response"> {{globalData.token}}</p> -->
            <!-- <p v-if="response">{{response.data.token}}</p> -->
        </form>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    // inject: ['globalData'],
    data(){
        return {
            email: '',
            password: '',
            passwordError: '',
            loginError: '',
            response: null,
            // token: this.token
        }
    },
    methods: {
        async handleSubmit() {
            // const formData = new FormData();
            // formData.append("email", this.email);
            // formData.append("password", this.password);
            const formData = {
                email: this.email,
                password: this.password
            }
            try {
                this.response = await axios.post("http://localhost:8100/api/v1/auth/authenticate", formData);
            } catch (error) {
                this.loginError = '登录失败，请重试'
                console.error("登录失败: ", error);
            }
            if (this.response.status >= 200 && this.response.status < 300 ) {
                console.log("登录成功")
                // this.globalData.token = this.response.data.token
                localStorage.setItem("token",this.response.data.token);
                localStorage.setItem("userId",this.response.data.userId);
            }
        },
        handleClose() {
            this.$emit('close')
        }

    },
    unmounted() {
        console.log("unmounted")
    },
}
</script>

<style>
.submit {
    text-align: center;
}
</style>