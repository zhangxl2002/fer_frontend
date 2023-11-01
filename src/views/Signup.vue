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
export default {
    data(){
        return {
            email: '',
            name: '',
            password: '',
            passwordError: ''
        }
    },
    methods: {
        handleSubmit() {
            this.passwordError = this.password.length > 5 ? '' : 'Password must be at least 6 chars long'
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