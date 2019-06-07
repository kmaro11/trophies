<template>
    <div class="max-w-xs w-full h-full bg-light-green flex-col flex justify-between">
        <div class=" p-4">
            <h2 class="mb-8 text-center font-bold text-xl">Options</h2>
            <div class="mb-8 flex flex-col">
                <div class="mb-2"> Your Username:</div>
                <div class="relative cursor-pointer">
                    <input type="text" v-model="changeUsername" class="bg-transparent w-full" placeholder="Set username">
                    <button @click="setUsername" class="absolute right-0 pl-2 pr-2 text-bold">-></button>
                </div>
            </div>
            <div class="flex justify-center mb-8">
                <div class="relative border border-color-dark-blue border-solid w-64 h-4 rounded-lg">
                    <div class="bg-pink rounded-lg"
                         :style='{width: `${progressBar}%` }'
                         style="transition: all .3s ease-in-out; height: 14px;">
                        <div class="absolute"
                             style="right: 7px; top: -30px; transition: all .3s ease-in-out"
                             :style='{left: `${progressBar - 6}%` }'>
                            {{progressBar}}%
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col item-center justify-center mb-8">
                <button
                        class="w-full mb-2 text-white background-dark-blue border-solid border h-8 flex item-center justify-center rounded-lg border-color-dark-blue hover:bg-pink hover:text-pink"
                        v-for="item in filter"
                        :key="item.type"
                        @click="filterTrophies(item.action)">
                    {{item.name}}
                </button>
            </div>
            <div v-if="selectedGame.length !== 0">
                <multiselect
                        :options="allGame"
                        :value="selectedGame"
                        @select="selectGame"
                        :show-labels="false"
                        label="name"></multiselect>
            </div>
        </div>

        <button @click="pushToDb"
                class="w-full background-dark-blue font-bold text-white flex justify-center hover:bg-pink hover:text-dark-blue p-2">
            Save Trophies
        </button>
        <!--<section class="flex items-center">-->
        <!--<div v-for="achievement in achievements" :key="achievement.name">-->
        <!--<div>-->
        <!--<p>{{achievement.name}}</p>-->
        <!--&lt;!&ndash;<p>{{allTrophies(achievement.action)}}</p>&ndash;&gt;-->
        <!--&lt;!&ndash;<p>{{allCompletedTrophies(achievement.action)}}</p>&ndash;&gt;-->
        <!--</div>-->
        <!--</div>-->
        <!--</section>-->
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import Multiselect from 'vue-multiselect'

    export default {
        data() {
            return {
                userName: '',
                openMultiselect: false,
                filter: [
                    {
                        name: 'All',
                        action: 'all'
                    },
                    {
                        name: 'Completed',
                        action: 'completed'
                    },
                    {
                        name: 'Remain',
                        action: 'remain'
                    }
                ],
                achievements: [
                    {
                        name: 'platinum',
                        action: 'platinum'
                    },
                    {
                        name: 'gold',
                        action: 'gold'
                    },
                    {
                        name: 'silver',
                        action: 'silver'
                    },
                    {
                        name: 'bronze',
                        action: 'bronze'
                    }
                ],
                // selectedGame: []
            }
        },
        props: {
            progressBar: Number,
            gameAchievements: Array
        },
        components: {
            Multiselect,
        },
        computed: {
            ...mapGetters({
                allGame: 'allGames',
                selectedGame: 'selectedGame',
                userId: 'userId',
                userNameFromDb: 'getAllUserNames'
            }),
            changeUsername: {
                get() {
                    return this.$store.state.userName
                },
                set(value) {
                    console.log(value)
                    this.$store.commit('changeUsername', value);
                },
            }
        },
        methods: {

            trophiesFromDb() {
                this.spiderman.filter(item => {
                    this.dataFromDb.map(dbData => {
                        if (dbData === item.id) {
                            item.completed = true
                        }
                    })
                })
            },
            getFromDb() {
                this.$store.dispatch('getTrophies', {game: this.selectedGame.type, id: this.userId})
                this.trophiesFromDb()
            },
            filterTrophies(item) {
              this.$store.commit('filterGame', item)
                // this.$emit('filterGame', item)
            },
            pushToDb() {
                this.$emit('saveToDb')
            },
            selectGame(game) {
                this.$emit('changeGameName', game)
            },
            setUsername() {
                console.log('sidebar', this.changeUsername)
                this.$store.dispatch('createUserName', {
                    userName: this.changeUsername,
                    id: this.userId
                })
            },
            // allTrophies (type) {
            //   return this.selectedGame.filter(action => action.type === type).length
            // },
            // allCompletedTrophies (type) {
            //   return this.selectedGame.filter(action => (action.type === type && action.completed)).length
            // },
            getUser() {
                this.$store.dispatch('getUsernames', this.userId)
            }
        },
        created() {
            this.getUser()
            // this.allCompletedTrophies()
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
