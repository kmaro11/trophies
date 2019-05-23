<template>
    <nav class="bg-blue-800 h-20 flex items-center pl-12 pr-12" style="background: #b23850">
        <div class="flex">
            <router-link v-for="item in menu"
                         v-if="item.type === 'menu'"
                         :key="item.title"
                         router
                         :to="item.link"
                         class="flex items-center text-white p-4" style="color: #e7e3d4">
                    {{item.name}}
            </router-link>
        </div>
        <div class="flex ml-auto">
            <router-link v-for="item in menu"
                         v-if="item.type === 'login'"
                         :key="item.title"
                         router
                         :to="item.link"

                         class="flex items-center text-white p-4" style="color: #e7e3d4">
                {{item.name}}
            </router-link>
        </div>
        <button @click.prevent="logout()" class="text-white p-4" style="color: #e7e3d4">
            Logout
        </button>
    </nav>
</template>
<script>
    export default {
        data() {
            return {
                menu: [
                    {
                        name: 'Home',
                        link: '/',
                        type: 'menu'
                    },
                    {
                        name: 'Trophies',
                        link: '/trophies',
                        type: 'menu'
                    },
                    {
                        name: 'Profile',
                        link: '/profile',
                        type: 'menu'
                    },
                    {
                        name: 'Sign up',
                        link: 'sign-up/',
                        type: 'login'
                    },
                    {
                        name: 'Sign in',
                        link: '/sign-in',
                        type: 'login'
                    },


                ],
                status: false
            }

        },
        computed: {
            statusLogout() {
                return this.$store.getters.logoutStatus
            }
        },
        watch: {
            statusLogout(value) {
                this.status = value
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout', false)
            }
        }
    }
</script>