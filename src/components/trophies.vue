<template>
    <div>
        <Navigation/>
        <div class="container">
        <section class="flex items-center">
            <div v-for="achievement in achievements" :key="achievement.name">
                <div>
                    <p>{{achievement.name}}</p>
                    <p>{{allTrophies(achievement.action)}}</p>
                    <p>{{allCompletedTrophies(achievement.action)}}</p>
                </div>
            </div>
        </section>
        <button @click="pushToDb">Save</button>
        <div class="flex flex-row">
            <p>Trophies</p>
            <p>{{spiderman.length}}</p>
        </div>
        <div class="flex flex-row items-center justify-start">
            <p class="">completed</p>
            <p>{{completedTrophiesId.length}}</p>
        </div>
        <div class="flex">
            <div v-for="item in filter">
                <button @click="filterTrophies(item.action)" class="m-5">{{item.name}}</button>
            </div>
        </div>

        <div v-for="game in filteredAchievements">
            <div class="flex flex-row items-center mt-5 mb-5">
                <div class="trophies__trophie-icon mr-5" :class="game.type"></div>
                <div class="flex flex-col mr-5">
                    <div> {{game.title}}</div>
                    <div>{{game.subtitle}}</div>
                </div>
                <input type='checkbox' v-model="game.completed">
            </div>

        </div>
    </div>

        </div>


</template>
<script>
  import Navigation from '@/components/Navigation'

  export default {
    data () {
      return {
        menu: [
          {
            name: 'Spiderman',
            action: 'spiderman',
            logo: 'spiderman.jpeg'
          }
        ],
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
        spiderman: [

          {

            title: 'Be Greater',
            completed: false,
            subtitle: 'Collect all Trophies',
            type: 'platinum',
            id: '2e50f2fc-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Superior Spider-Man',
            completed: false,
            subtitle: 'Unlock all skills',
            type: 'gold',
            id: '2e50f568-7e0a-11e9-8f9e-2a86e4085a59',
          },
          {
            title: 'I Heart Manhattan',
            completed: false,
            subtitle: '100% complete all districts',
            type: 'gold',
            id: '2e50f6bc-7e0a-11e9-8f9e-2a86e4085a59',
          },
          {
            title: 'Masters of Masters',
            completed: false,
            subtitle: 'Defeat Taskmaster',
            type: 'silver',
            id: '2e50f7f2-7e0a-11e9-8f9e-2a86e4085a59',
          },
          {
            title: 'Backpacker',
            completed: false,
            type: 'silver',
            id: '2e50fbe4-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Collect all Backpacks'
          },
          {
            title: 'Cat Prints',
            completed: false,
            type: 'silver',
            id: '2e50fd42-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Track down Black Cat'
          },
          {
            title: 'Inner Sanctuary',
            completed: false,
            type: 'silver',
            id: '2e50febe-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Take down each Demon Warehouse.'
          },
          {
            title: 'All the King\'s Men',
            completed: false,
            type: 'silver',
            id: '2e5100b2-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Take down each Fisk Hideout.'
          },
          {
            title: 'Mercenary Tactics',
            completed: false,
            type: 'silver',
            id: '2e510206-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Take down each Sable Outpost'
          },
          {
            title: 'Back in the Slammer',
            completed: false,
            type: 'silver',
            id: '2e51033c-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Take down each Prisoner Camp'
          },
          {
            title: 'Neighborhood Watch',
            completed: false,
            type: 'silver',
            id: '2e510666-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Complete all Faction Crimes in a district'
          },
          {
            title: 'A Suit For All Seasons',
            completed: false,
            type: 'silver',
            id: '2e5107b0-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Purchase all suits'
          },
          {
            title: 'Schooled',
            completed: false,
            type: 'silver',
            id: '2e5108dc-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Complete all of the Corrupted Student missions'
          },
          {
            title: 'Amazing Coverage',
            completed: false,
            type: 'bronze',
            id: '2e510a08-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'All Surveillance Towers activated'
          },
          {
            title: 'Short Fuse',
            completed: false,
            type: 'bronze',
            id: '2e510b2a-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Get Spectacular or better in a Taskmaster Bomb Challenge'
          },
          {
            title: 'Fists of Fury',
            completed: false,
            type: 'bronze',
            id: '2e510c56-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Get Spectacular or better in a Taskmaster Combat Challenge'
          },
          {
            title: 'Ninja',
            completed: false,
            type: 'bronze',
            id: '2e510d78-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Get Spectacular or better in a Taskmaster Stealth Challenge'
          },
          {
            title: 'Spy Hunter',
            completed: false,
            type: 'bronze',
            id: '2e51108e-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Get Spectacular or better in a Taskmaster Drone Challenge'
          },
          {
            title: 'Challenge Finder',
            completed: false,
            type: 'bronze',
            id: '2e5111c4-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Complete every Taskmaster Challenge in the city once'
          },
          {
            title: 'R&D',
            completed: false,
            type: 'bronze',
            id: '2e5112f0-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Complete all Research Stations'
          },
          {
            title: 'Demons Emerge',
            completed: false,
            type: 'bronze',
            id: '2e511412-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Complete Act 1'
          },
          {
            title: 'The Six Assemble',
            completed: false,
            type: 'bronze',
            id: '2e51153e-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Complete Act 2'
          },
          {
            title: 'End Game',
            completed: false,
            type: 'bronze',
            id: '2e51166a-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Complete Act 3'
          },

          {
            title: 'Science FTW!',
            completed: false,
            type: 'bronze',
            id: '2e5119a8-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Craft 15 Upgrades'
          },
          {
            title: 'Knocking Down Kingpin',
            completed: false,
            type: 'bronze',
            id: '2e511ae8-7e0a-11e9-8f9e-2a86e4085a59',
            subtitle: 'Defeat Fisk'
          },
          {
            title: 'Staying Positive',
            completed: false,
            type: 'bronze',
            subtitle: 'Defeat Li',
            id: '2e511c0a-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Grounded',
            completed: false,
            type: 'bronze',
            subtitle: 'Defeat Electro and Vulture',
            id: '2e511d4a-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Sting and Smash',
            completed: false,
            type: 'bronze',
            subtitle: 'Scorpion and Rhino',
            id: '2e511e80-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Tombstone Takedown',
            completed: false,
            type: 'bronze',
            subtitle: 'Defeat Tombstone',
            id: '2e512088-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Shock and Awe',
            completed: false,
            type: 'bronze',
            subtitle: 'Defeat Shocker',
            id: '2e5121be-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Wing It',
            completed: false,
            type: 'bronze',
            subtitle: 'Traverse across the city rooftops',
            id: '2e512358-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'King of Swing',
            completed: false,
            type: 'bronze',
            subtitle: 'Complete all level 1 Traversal Benchmark',
            id: '2e5124a2-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'And Stay Down!',
            completed: false,
            type: 'bronze',
            subtitle: 'Complete a level 1 Combat Benchmark',
            id: '2e5125c4-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Pigeon Hunter',
            completed: false,
            type: 'bronze',
            subtitle: 'Catch all of Howard\'s Pigeons',
            id: '2e512772-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Hug it Out',
            completed: false,
            type: 'bronze',
            subtitle: 'Knock together 10 pairs of enemies with Trip Mines',
            id: '2e5129b6-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Friendly Neighborhood Spider-Man',
            completed: false,
            type: 'bronze',
            subtitle: 'Complete all Side Missions',
            id: '2e512b00-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'The Scientific Method',
            completed: false,
            type: 'bronze',
            subtitle: 'Craft your first Upgrade',
            id: '2e512c2c-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Spider-Sensible',
            completed: false,
            type: 'bronze',
            subtitle: 'Perfect Dodge 10 attacks',
            id: '2e512d4e-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Overdrive',
            completed: false,
            type: 'bronze',
            subtitle: 'Complete 10 Vehicle Takedowns',
            id: '2e512e7a-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'With Great Power...e',
            completed: false,
            type: 'bronze',
            subtitle: 'Pay respects at Ben Parker\'s grave',
            id: '2e512fa6-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Hero for Higher',
            completed: false,
            type: 'bronze',
            subtitle: 'Hero for Higher',
            id: '2e5132bc-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Sightseeing',
            completed: false,
            type: 'bronze',
            subtitle: 'Photograph all Landmarks on the Map',
            id: '2e513410-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Born to Ridee',
            completed: false,
            type: 'bronze',
            subtitle: 'Ride the Subway 5 times',
            id: '2e51353c-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Sticky and Tricky',
            completed: false,
            type: 'bronze',
            subtitle: 'Chain 4 unique tricks before landing',
            id: '2e513668-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Snappy Dresser',
            completed: false,
            type: 'bronze',
            subtitle: 'Wear 5 new Spider-Suits',
            id: '2e51378a-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Arachnophobia',
            completed: false,
            type: 'bronze',
            subtitle: 'Perform 75 Stealth Takedowns',
            id: '2e5138ac-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Lost and Found',
            completed: false,
            type: 'bronze',
            subtitle: 'Collect 5 Backpacks',
            id: '2e513c08-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Spider-Man About Town',
            completed: false,
            type: 'bronze',
            subtitle: 'Greet 10 Citizens',
            id: '2e513d5c-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Cat\'s Out of the Bag',
            completed: false,
            type: 'bronze',
            subtitle: 'Collect a Black Cat collectible',
            id: '2e513e88-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'A Bit of a Fixer-Upper',
            completed: false,
            type: 'bronze',
            subtitle: 'Complete all optional projects in the lab',
            id: '2e513faa-7e0a-11e9-8f9e-2a86e4085a59'
          },
          {
            title: 'Ace the Base',
            completed: false,
            type: 'bronze',
            subtitle: 'Complete all objectives in a base',
            id: '2e5140d6-7e0a-11e9-8f9e-2a86e4085a59'
          },
        ],
      }
    },
    components: {
      Navigation,
    },
    computed: {
      completedTrophiesId () {
        return (this.spiderman.filter(item => item.completed)).map(x => x.id)
      },
      gettedDataFromDb () {
        return this.$store.getters.dataFromDb
      },
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
      allTrophies (type) {
        return this.spiderman.filter(action => action.type === type).length
      },
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