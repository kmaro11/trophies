<template>
    <div class="h-full bg-white">
        <!--<Navigation/>-->
        <div class="container">
            <div v-if="!userLoginStatus">
                <h1>You not Sign in yet</h1>
            </div>
            <div v-else>
                <h1>You just Sign in</h1>
                <button @click.prevent="pushToDb">push</button>
                <button @click.prevent="getFromDb">get</button>
            </div>
        </div>
    </div>
</template>
<script>
    // import Navigation from '@/components/Navigation'

    export default {
        name: 'home',
        data() {
            return {
                sideBar: [
                    {
                        name: 'Games'
                    },
                    {
                        name: 'User'
                    }
                ],
                // signIn: false
            }

        },
        components: {
            // Navigation,
        },
        computed: {
            userLoginStatus() {
                return this.$store.getters.signInStatus
            }
        },
        methods: {
            getFromDb() {
                this.$store.dispatch('getTrophies')

            }
        }

    }
</script>
<style scoped lang="scss">
    .trophies__background-img {
        width: 100%;
        background: url("../img/console@2x.png") no-repeat center;
    }


</style>