<template>
    <div class="flex h-full w-full justify-between" v-if="userSignIn">
        <div class="w-full h-full max-w-4xl mr-auto ml-auto mt-6">
            <div v-if="selectedGame.length !== 0"
                 class="overflow-y-auto max-width-half mt-2 ml-auto mr-auto width-80"
                 style="height: 540px">
                <div v-for="game in filterTrophies" :key="game.title"
                     class="flex flex-row items-center py-2 px-4 mt-5 mb-5 background-dark-blue rounded-lg">
                    <div class="circule mr-4">
                        <div class="trophies__trophie-icon mr-5" :class="game.type"></div>
                    </div>
                    <div class="flex flex-col mr-auto">
                        <div class="text-white"> {{game.title}}</div>
                        <div class="text-white">{{game.subtitle}}</div>
                    </div>
                    <div class="pretty p-icon p-round p-pulse p-bigger">
                        <input type="checkbox" v-model="game.completed"/>
                        <div class="state p-success">
                            <i class="icon mdi mdi-check p-bigger"></i>
                            <label></label>
                        </div>
                    </div>

                </div>
            </div>
            <div v-else class="flex items-start justify-center">
                <div v-for="game in allGame"
                     @click="selectGame(game)"
                     :key="game.type"
                     class="w-16 trophies__background-img m-2 text-white text-3xl flex justify-center items-center cursor-pointer"
                     :class="game.type">
                    <div>{{game.name}}</div>

                </div>
            </div>
        </div>
        <transition name="slide-fade">
            <Sidebar :progressBar="progressBar"
                     v-on:changeGameName="selectGame"
                     v-on:saveToDb="pushToDb"/>
        </transition>
    </div>
</template>
<script>
    import Spiderman from '@/spiderman'
    import GodOfWar from '@/godOfWar'
    import Sidebar from './Sidebar'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                menu: [
                    {
                        name: 'Spiderman',
                        action: 'spiderman',
                        logo: 'spiderman.jpeg',
                    }
                ],
                spiderman: Spiderman,
                godofwar: GodOfWar,
                storedAchievements: [],
                filteredAchievements: [],
                selectedGameArray: [],
            }
        },
        components: {
            Sidebar
        },
        computed: {
            ...mapGetters({
                dataFromDb: 'dataFromDb',
                allGame: 'allGames',
                selectedGame: 'selectedGame',
                userId: 'userId',
                userSignIn: 'signInStatus',
                filterOption: 'filterOption'
            }),

            completedTrophiesId() {
                return (this.selectedGameArray.filter(item => item.completed)).map(x => x.id)
            },

            progressBar() {
                return Math.round(this.completedTrophiesId.length * 100 / this.selectedGameArray.length)
            },
            // checkAllCheckboxes () {
            //     this.filterTrophies.forEach( item => {
            //         if (item.type === 'platinum' && item.completed) {
            //             item.completed = true
            //         }
            //     })
            //
            //   // if(this.spiderman.filter(item => item.type === 'platinum') && this.spiderman.filter(item => item.completed)) {
            //   //   return this.spiderman.filter(item => item.type !== 'platinum').map(item => item.completed = true)
            //   // }
            //
            // },
            filterTrophies() {
                // this.trophiesFromDb()
                this.selectedGameArray.forEach(item => {
                    if (this.dataFromDb.includes(item.id)) {
                        item.completed = true
                    }
                })
                if (this.filterOption === 'completed') {
                    return this.selectedGameArray.filter(action => action.completed)
                } else if (this.filterOption === 'remain') {
                    return this.selectedGameArray.filter(action => !action.completed)
                } else {
                    return this.selectedGameArray
                }
            },
        },

        methods: {
            pushToDb() {
                this.$store.dispatch('pushTrophies', {
                    trophies: this.completedTrophiesId,
                    game: this.selectedGame.type,
                    id: this.userId
                })
            },
            getFromDb() {
                this.$store.dispatch('getTrophies', {game: this.selectedGame.type, id: this.userId})
            },
            selectGame(game) {
                this.$store.commit('changeGame', game)
                this.changeSelectedGameTrophies(game)
                this.getFromDb()

            },
            changeSelectedGameTrophies(game) {
                this.selectedGameArray = [...this[game.type]]
            },
            getAllData() {
                this.$store.dispatch('getAllTrophies', {game: this.selectedGame.type})
            }

        },
    }

</script>
<style scoped lang="scss">
    .trophies {
        &__trophie-icon {
            width: 44px;
            height: 40px;
            background-repeat: no-repeat;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            &.gold {
                background: url("data:image/svg+xml,%3Csvg class='icon-trophy' width='100%' height='100%' viewBox='0 0 44 40' xmlns='http://www.w3.org/2000/svg' style='width: 44px; height: 40px;'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23ffd700' cx='22' cy='12' r='12'%3E%3C/circle%3E%3Cg stroke='%238c6200' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.12'%3E%3Cpath d='M17.00571429 12.34615385c-4e-8 1.80556535.9540837 3.47397655 2.50285711 4.37675925 1.5487734.9027827 3.45694094.9027827 5.0057143 0 1.5487735-.9027827 2.5028572-2.5711939 2.5028572-4.37675925V6.34038461H17.00571429v6.00576924z'%3E%3C/path%3E%3Cpath d='M16.96571429 8.05961538h-2.65714286v3.12115385L17.00571429 13.05M27.0342857 8.05961538h2.6571429v3.12115385l-2.6742857 1.85192308M22.01142857 17.4980769v3.1615385M20.26857143 20.6596154h3.48571428M20.51428571 9.35769231h2.97142858'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Ctext fill='%238c6200' x='50%25' y='36' style='font-size: 9px; font-weight: bold; font-family: ff-din-round-web-pro, sans-serif; text-anchor: middle;'%3EGOLD%3C/text%3E%3C/svg%3E");
            }

            &.platinum {
                background: url("data:image/svg+xml,%3Csvg class='icon-trophy' width='100%' height='100%' viewBox='0 0 44 40' xmlns='http://www.w3.org/2000/svg' style='width: 44px; height: 40px;'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23bdcbd0' cx='22' cy='12' r='12'%3E%3C/circle%3E%3Cg stroke='%2330342f' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.12'%3E%3Cpath d='M17.00571429 12.34615385c-4e-8 1.80556535.9540837 3.47397655 2.50285711 4.37675925 1.5487734.9027827 3.45694094.9027827 5.0057143 0 1.5487735-.9027827 2.5028572-2.5711939 2.5028572-4.37675925V6.34038461H17.00571429v6.00576924z'%3E%3C/path%3E%3Cpath d='M16.96571429 8.05961538h-2.65714286v3.12115385L17.00571429 13.05M27.0342857 8.05961538h2.6571429v3.12115385l-2.6742857 1.85192308M22.01142857 17.4980769v3.1615385M20.26857143 20.6596154h3.48571428M20.51428571 9.35769231h2.97142858'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Ctext fill='%2330342f' x='50%25' y='36' style='font-size: 9px; font-weight: bold; font-family: ff-din-round-web-pro, sans-serif; text-anchor: middle;'%3EPLATINUM%3C/text%3E%3C/svg%3E");

            }

            &.bronze {
                background: url("data:image/svg+xml,%3Csvg class='icon-trophy' width='100%' height='100%' viewBox='0 0 44 40' xmlns='http://www.w3.org/2000/svg' style='width: 44px; height: 40px;'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23cd7f32' cx='22' cy='12' r='12'%3E%3C/circle%3E%3Cg stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.12'%3E%3Cpath d='M17.00571429 12.34615385c-4e-8 1.80556535.9540837 3.47397655 2.50285711 4.37675925 1.5487734.9027827 3.45694094.9027827 5.0057143 0 1.5487735-.9027827 2.5028572-2.5711939 2.5028572-4.37675925V6.34038461H17.00571429v6.00576924z'%3E%3C/path%3E%3Cpath d='M16.96571429 8.05961538h-2.65714286v3.12115385L17.00571429 13.05M27.0342857 8.05961538h2.6571429v3.12115385l-2.6742857 1.85192308M22.01142857 17.4980769v3.1615385M20.26857143 20.6596154h3.48571428M20.51428571 9.35769231h2.97142858'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Ctext fill='%23cd7f32' x='50%25' y='36' style='font-size: 9px; font-weight: bold; font-family: ff-din-round-web-pro, sans-serif; text-anchor: middle;'%3EBRONZE%3C/text%3E%3C/svg%3E");
            }

            &.silver {
                background: url("data:image/svg+xml,%3Csvg class='icon-trophy' width='100%' height='100%' viewBox='0 0 44 40' xmlns='http://www.w3.org/2000/svg' style='width: 44px; height: 40px;'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23ccc' cx='22' cy='12' r='12'%3E%3C/circle%3E%3Cg stroke='%234c575d' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.12'%3E%3Cpath d='M17.00571429 12.34615385c-4e-8 1.80556535.9540837 3.47397655 2.50285711 4.37675925 1.5487734.9027827 3.45694094.9027827 5.0057143 0 1.5487735-.9027827 2.5028572-2.5711939 2.5028572-4.37675925V6.34038461H17.00571429v6.00576924z'%3E%3C/path%3E%3Cpath d='M16.96571429 8.05961538h-2.65714286v3.12115385L17.00571429 13.05M27.0342857 8.05961538h2.6571429v3.12115385l-2.6742857 1.85192308M22.01142857 17.4980769v3.1615385M20.26857143 20.6596154h3.48571428M20.51428571 9.35769231h2.97142858'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3Ctext fill='%234c575d' x='50%25' y='36' style='font-size: 9px; font-weight: bold; font-family: ff-din-round-web-pro, sans-serif; text-anchor: middle;'%3ESILVER%3C/text%3E%3C/svg%3E");
            }
        }
    }

    .slide-fade-enter-active {
        transition: all .5s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */
    {
        transform: translateX(50px);
        opacity: 0;
    }

    .trophies__background-img {
        max-width: 250px;
        height: 250px;
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
    .circule{
        background: white;
        height: 52px;
        width: 52px;
        position: relative;
        border-radius: 50px;
    }

</style>