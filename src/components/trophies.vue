<template>
    <div>
        <!--<Navigation/>-->
        <div class="container">
            <div class="max-width-half mr-auto ml-auto mt-0 mb-6">
                <!--<section class="flex items-center">-->
                    <!--<div v-for="achievement in achievements" :key="achievement.name">-->
                        <!--<div>-->
                            <!--<p>{{achievement.name}}</p>-->
                            <!--<p>{{allTrophies(achievement.action)}}</p>-->
                            <!--<p>{{allCompletedTrophies(achievement.action)}}</p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</section>-->
                <div class="flex justify-center">
                    <div class="relative border border-color-dark-blue border-solid w-64 h-4 rounded-lg">

                        <div class="bg-yellow rounded-lg" :style='{width: `${progressBar}%` }' style="transition: all .3s ease-in-out; height: 14px;">
                            <div class="absolute" style="right: 7px; top: -30px; transition: all .3s ease-in-out" :style='{left: `${progressBar - 6}%` }'>
                                {{progressBar}}%
                            </div>
                        </div>
                    </div>

                </div>
            </div>



            <div class="flex item-center justify-center mb-6">
                <button
                        class="w-32 text-dark-blue border-solid border mr-4 ml-4 h-8 flex item-center justify-center rounded-lg border-color-dark-blue hover:bg-yellow"
                        v-for="item in filter"
                        :key="item.name"
                        @click="filterTrophies(item.action)">
                    {{item.name}}
                </button>
            </div>
            <button @click="pushToDb" class="bg-yellow text-dark-blue border-solid border mt-0 mr-auto ml-auto max-width-half flex justify-center rounded-lg border-color-dark-blue hover:bg-blue hover:text-white">
                Save Trophies
            </button>
            <div class="overflow-y-auto max-width-half mt-2 ml-auto mr-auto" style="height: 420px">
                <div v-for="game in filteredAchievements" :key="game.title">
                    <div class="flex flex-row items-center mt-5 mb-5 bg-brown rounded-lg">
                        <div class="trophies__trophie-icon mr-5" :class="game.type"></div>
                        <div class="flex flex-col mr-5">
                            <div class="text-white"> {{game.title}}</div>
                            <div class="text-white">{{game.subtitle}}</div>
                        </div>
                        <input type='checkbox' v-model="game.completed">
                    </div>

                </div>
            </div>

        </div>

    </div>


</template>
<script>
  // import Navigation from '@/components/Navigation'
  import Spiderman from '@/spiderman'

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
        storedAchievements: [],
        filteredAchievements: [],
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

      }
    },
    components: {
      // Navigation,
    },
    computed: {
      completedTrophiesId () {
        return (this.spiderman.filter(item => item.completed)).map(x => x.id)
      },
      gettedDataFromDb () {
        return this.$store.getters.dataFromDb
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
          this.gettedDataFromDb.map(dbData => {
            if (dbData === item.id) {
              item.completed = true
            }
          })
        })
      },
      // allTrophies (type) {
      //   return this.spiderman.filter(action => action.type === type).length
      // },
      allCompletedTrophies (type) {
        return this.spiderman.filter(action => (action.type === type && action.completed)).length
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
        this.$store.dispatch('pushTrophies', this.completedTrophiesId)
      },
      getFromDb () {
        this.$store.dispatch('getTrophies',)
      }
    },
    created () {
      this.allCompletedTrophies()
      this.getFromDb()
      this.filterTrophies('all')
      this.trophiesFromDb()
    }
  }

</script>
<style scoped lang="scss">
    .trophies {
        &__wrap {
            display: flex;
            align-items: center;
            margin: 20px 0;
        }


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