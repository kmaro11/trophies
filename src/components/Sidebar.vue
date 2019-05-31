<template>
    <div class="w-64 h-full p-4">
        <h2 class="mb-8 text-center">Options</h2>
        <div class="flex justify-center">
            <div class="relative border border-color-dark-blue border-solid w-64 h-4 rounded-lg">
                <div class="bg-yellow rounded-lg"
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
        <!--<multiselect-->
        <!--:options="getGames"-->
        <!--label="name"></multiselect>-->
        <div class="flex flex-col item-center justify-center mb-6">
            <button
                    class="w-32 text-dark-blue border-solid border mr-4 ml-4 h-8 flex item-center justify-center rounded-lg border-color-dark-blue hover:bg-yellow"
                    v-for="item in filter"
                    :key="item.name"
                    @click="filterTrophies(item.action)">
                {{item.name}}
            </button>
        </div>

        <button @click="pushToDb"
                class="w-full bg-yellow text-dark-blue border-solid border mt-0 mr-auto ml-auto flex justify-center rounded-lg border-color-dark-blue hover:bg-blue hover:text-white">
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
  export default {
    data () {
      return {
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
        selectedGame: []
      }
    },
    props: {
      progressBar: Number,
      gameAchievements: Array
    },
    methods: {
      filterTrophies (item) {
        this.$emit('filterGame', item)
      },
      pushToDb () {
        this.$emit('saveToDb')
      },
      // allTrophies (type) {
      //   return this.selectedGame.filter(action => action.type === type).length
      // },
      // allCompletedTrophies (type) {
      //   return this.selectedGame.filter(action => (action.type === type && action.completed)).length
      // },
    },
    created () {
      // this.allCompletedTrophies()
    }
  }
</script>

