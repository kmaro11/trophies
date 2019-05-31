<template>
    <div class="flex h-full w-full">
        <Sidebar :progressBar="progressBar"
                 :selectedGame="spiderman"
                 v-on:filterGame="filterTrophies($event)"
                 v-on:saveToDb="pushToDb"/>
        <div class="w-full">
            <div class="container">
                <div v-if="selectedGame"
                     class="overflow-y-auto max-width-half mt-2 ml-auto mr-auto width-80"
                     style="height: 420px">
                    <div v-for="game in filteredAchievements" :key="game.title"
                         class="flex flex-row items-center mt-5 mb-5 bg-brown rounded-lg">
                        <div class="trophies__trophie-icon mr-5" :class="game.type"></div>
                        <div class="flex flex-col mr-5">
                            <div class="text-white"> {{game.title}}</div>
                            <div class="text-white">{{game.subtitle}}</div>
                        </div>
                        <input type='checkbox' v-model="game.completed">
                    </div>
                </div>
                <div v-else>
                    <div v-for="game in allGame" @click="selectGame(game.type)" class="w-16">
                        <img @click="selectGame(game.type)"
                             class="w-full"
                             :src="`/trophies/game/src/img/${game.type}.jpg`"
                             alt="">

                        {{game.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Spiderman from '@/spiderman'
  import GodOfWar from '@/godOfWar'
  import Multiselect from 'vue-multiselect'
  import Sidebar from './Sidebar'
  import { mapGetters } from 'vuex'

  export default {
    data () {
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

      }
    },
    components: {
      Multiselect,
      Sidebar
    },
    computed: {
      ...mapGetters({
        dataFromDb: 'dataFromDb',
        allGame: 'allGames',
        selectedGame: 'selectedGame',
        userId: 'userId'
      }),
      completedTrophiesId () {
        return (this.spiderman.filter(item => item.completed)).map(x => x.id)
      },

      progressBar () {
        return Math.round(this.completedTrophiesId.length * 100 / this.spiderman.length)
      },
      // checkAllCheckboxes () {
      //   console.log(this.spiderman.filter(item => item.type).includes('platinum'))
      //   if(this.spiderman.filter(item => item.type === 'platinum') && this.spiderman.filter(item => item.completed)) {
      //     return this.spiderman.filter(item => item.type !== 'platinum').map(item => item.completed = true)
      //   }
      //
      // },
    },
    methods: {
      trophiesFromDb () {
        this.spiderman.filter(item => {
          this.dataFromDb.map(dbData => {
            if (dbData === item.id) {
              item.completed = true
            }
          })
        })
      },

      filterTrophies (action) {
        this.trophiesFromDb()
        if (action === 'completed') {
          this.filteredAchievements = this.spiderman.filter(action => action.completed)
        } else if (action === 'remain') {
          this.filteredAchievements = this.spiderman.filter(action => !action.completed)
        } else {
          this.filteredAchievements = this.spiderman
        }
      },
      pushToDb () {
        this.$store.dispatch('pushTrophies', {trophies: this.completedTrophiesId, game: this.selectedGame, id: this.userId})
      },
      getFromDb () {
        this.$store.dispatch('getTrophies', {game:this.selectedGame, id: this.userId})
      },
      selectGame (game) {
        this.$store.commit('changeGame', game)
        this.getFromDb()
        this.trophiesFromDb()
      },
    },
    created () {
      this.filterTrophies('all')

    }
  }

</script>
<style scoped lang="scss">
    .trophies {
        &__trophie-icon {
            width: 44px;
            height: 40px;
            background-repeat: no-repeat;

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
</style>