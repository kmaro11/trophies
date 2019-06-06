<template>
    <div>
        <div class="w-full h-full relative">
            <div class="flex flex-col max-w-xl w-full bg-white m-auto">
                <p class="m-auto">sign up</p>
                <form @submit.prevent="onSignup" class="flex flex-col ">
                    <input type="email" id="email" v-model="email" required
                           class="border-solid border-2 border-gray-600 m-2">
                    <input type="password" id="password" v-model="password"
                           class="border-solid border-2 border-gray-600 m-2">
                    <input type="password" id="confirmPassword" v-model="confirmPassword"
                           class="border-solid border-2 border-gray-600 m-2">
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import Navigation from '@/components/Navigation'

    export default {
        data() {
            return {
                email: '',
                password: '',
                confirmPassword: ''
            }
        },
        components: {
            Navigation,
        },
        computed: {
            comparePasswords() {
                return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
            },
            user() {
                return this.$store.getters.user
            }
        },
        watch: {
            user(value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        },
        methods: {
            onSignup() {
                this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
            }
        }
    }
</script>