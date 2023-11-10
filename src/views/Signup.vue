<template>
    <div class="backdrop" @click.self="handleClose">
        <form @submit.prevent="handleSubmit">
            <label>Email:</label>
            <input type="email" required v-model="email">
            <label>Name: </label>
            <input type="text" required v-model="name">
            <label>Password:</label>
            <input type="password" required v-model="password">
            <div v-if="passwordError" class="error">{{ passwordError }}</div>
            
            <div class="submit">
                <button> Sign up </button>
            </div>
        </form>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            email: '',
            name: '',
            password: '',
            passwordError: '',
            signError: '',
            response: null
        }
    },
    methods: {
        async handleSubmit() {
            const formData = {
                email: this.email,
                name: this.name,
                password: this.password
            }
            try {
                this.response = await axios.post("http://10.250.218.180:8100/api/v1/auth/register", formData);
            } catch (error) {
                this.signupError = '注册失败，请重试'
                console.error("注册失败: ", error);
                alert("注册失败")
            }
            {
                console.error("注册成功")
                alert("注册成功")
                localStorage.setItem("token",this.response.data.token);
                localStorage.setItem("userId",this.response.data.userId);
                localStorage.setItem("name",this.response.data.name);
                this.$emit('close')
                location.reload();
            }
        },
        handleClose() {
            this.$emit('close')
        }

    }
}
</script>

<style>
.submit {
    text-align: center;
}
</style>