<template>
    <div class="h-full bg-white">
        <!--<Navigation/>-->
        <div class="h-full ">
            <div class="trophies__background-img spiderman h-full relative">
                <div class="bg-opacity absolute inset-0 flex justify-center items-center">
                    <h1 class="text-white text-6xl font-bold">Only Playstation Game</h1>
                </div>

            </div>
            <div class="trophies__background-img godofwar h-full relative">
                <div class="bg-opacity absolute inset-0 flex justify-center items-center">
                    <h2 class="text-white text-6xl font-bold">Collect all Trophies in one place</h2>
                </div>
            </div>
            <!--<div v-if="!userLoginStatus">-->
            <!--<h1 class="text-white text-6xl">You not Sign in yet</h1>-->
            <!--</div>-->
            <!--<div v-else>-->
            <!--<h1 class="text-white">You just Sign in</h1>-->
            <!--</div>-->
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
        methods: {}

    }
</script>
<style scoped lang="scss">
    .trophies__background-img {
        width: 100%;
        background: url("../img/console@2x.png") no-repeat center;
    }

    .trophies__background-img {
        width: 100%;

        &.spiderman {
            background: url("../img/spiderman.jpg") no-repeat center;
        }

        &.godofwar {
            background: url("../img/godofwar.jpg") no-repeat center;
        }
    }


</style>