<template>
    <div class="h-full">
        <Navigation/>
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

        <!--<div class="flex w-full h-full">-->
        <!--<div class="w-32 p-6">-->
        <!--<template v-for="item in sideBar">-->
        <!--<button class="p-2">{{item.name}}</button>-->
        <!--</template>-->
        <!--</div>-->
        <!--<div class="w-full">Content</div>-->

        <!--</div>-->

    </div>
</template>
<script>
  import Navigation from '@/components/Navigation'

  export default {
    name: 'home',
    data () {
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
      Navigation,
    },
    computed: {
      userLoginStatus () {
        return this.$store.getters.signInStatus
      }
    },
    methods: {
      getFromDb () {
        this.$store.dispatch('getTrophies')

      }
    }

  }
</script>