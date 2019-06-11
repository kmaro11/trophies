<template>
    <div class="h-full bg-white">
        <!--<Navigation/>-->
        <div class="h-full ">
            <div class="trophies__background-img playstation h-full flex justify-start">
                <div class="bg-opacity absolute inset-0 flex items-center justify-start pt-32 flex-col">
                    <h1 class="text-white text-6xl font-bold">Only Playstation Game</h1>
                    <h2 class="text-white text-5xl font-bold">Collect all Trophies in one place</h2>
                </div>

            </div>
            <div class="trophies__background-img spiderman h-full ">
                <!--<div class="bg-opacity absolute inset-0 flex justify-center items-center">-->
                <!--&lt;!&ndash;<h1 class="text-white text-6xl font-bold">Only Playstation Game</h1>&ndash;&gt;-->
                <!--</div>-->

            </div>
            <div class="trophies__background-img godofwar h-full ">
                <!--<div class="bg-opacity absolute inset-0 flex justify-center items-center">-->
                <!--<h2 class="text-white text-6xl font-bold"></h2>-->
                <!--</div>-->
            </div>
            <div class="trophies__background-img uncharted-colection h-full ">
                <!--<div class="bg-opacity absolute inset-0 flex justify-center items-center">-->
                <!--<h2 class="text-white text-6xl font-bold"></h2>-->
                <!--</div>-->
            </div>
            <div class="trophies__background-img uncharted-4 h-full ">
                <!--<div class="bg-opacity absolute inset-0 flex justify-center items-center">-->
                <!--<h2 class="text-white text-6xl font-bold"></h2>-->
                <!--</div>-->
            </div>
            <div class="trophies__background-img uncharted-5 h-full ">
                <!--<div class="bg-opacity absolute inset-0 flex justify-center items-center">-->
                <!--<h2 class="text-white text-6xl font-bold"></h2>-->
                <!--</div>-->
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
        methods: {
            getAllUsers() {
                this.$store.dispatch('getAllTrophies',)
            }
        },
        mounted() {
            this.getAllUsers()
        }

    }
</script>
<style scoped lang="scss">
    .trophies__background-img {
        width: 100%;

    }

    .trophies__background-img {
        width: 100%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.playstation {
            background-image: url("../img/console@2x.png");
        }

        &.spiderman {
            background-image: url("../img/spiderman.jpg");
        }

        &.godofwar {
            background-image: url("../img/godofwar.jpg");
        }

        &.uncharted-colection {
            background-image: url("../img/uncharted-colection.jpg");
        }

        &.uncharted-4 {
            background-image: url("../img/uncharted-4.jpg");
        }

        &.uncharted-5 {
            background-image: url("../img/uncharted-5.jpg");
        }
    }


</style>