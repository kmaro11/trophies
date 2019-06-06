<template>
    <div>
        <div class="w-full h-full relative">
            <div class="flex flex-col max-w-xl w-full bg-white m-auto">
                <p class="m-auto">sign up</p>
                <form @submit.prevent="onSignin" class="flex flex-col ">
                    <input type="email" id="email" v-model="email" required class="border-solid border-2 border-gray-600 m-2">
                    <input type="password" id="password" v-model="password" class="border-solid border-2 border-gray-600 m-2">
                    <button type="submit" >Sign up</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                email: '',
                password: '',

            }
        },
        components: {
        },
        computed: {},
        methods: {
            onSignin () {
                this.$store.dispatch('signUserIn', {email: this.email, password: this.password})


            }
        }
    }
</script>