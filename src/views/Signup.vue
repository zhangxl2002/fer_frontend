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
            signError: ''
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
                const response = await axios.post("http://localhost:8100/api/v1/auth/register", formData);
            } catch (error) {
                this.signupError = '注册失败，请重试'
                console.error("注册失败: ", error);
            }
            if (this.signError === null) {
                console.error("注册成功")
                this.$
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