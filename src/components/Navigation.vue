<template>
    <nav class="h-20 flex w-full items-center pl-12 pr-12 w-4/5 background-dark-blue">
        <!--<img src="../img/logo@2x.png" alt="" class="w-full absolute" style="max-width: 200px; left: 50%; transform: translateX(-50%);">-->
        <div class="flex">
            <div v-for="item in menu" :key="item.title">
                <router-link
                        v-if="item.type === 'menu'"
                        router
                        :to="item.link"
                        class="flex items-center p-4 font-bold text-white hover:text-yellow">
                    {{item.name}}
                </router-link>
            </div>

        </div>
        <div class="flex ml-auto">
            <div v-for="item in menu" :key="item.title">
                <router-link
                        v-if="item.type === 'login'"
                        router
                        :to="item.link"

                        class="flex items-center p-4 font-bold text-white hover:text-yellow">
                    {{item.name}}
                </router-link>
            </div>
        </div>
        <button @click.prevent="logout()" class=" p-4 font-bold text-white hover:text-yellow">

            Logout
        </button>
    </nav>
</template>
<script>
  export default {
    data () {
      return {
        menu: [
          {
            name: 'Home',
            link: '/',
            type: 'menu'
          },
          {
            name: 'Trophies',
            link: '/trophies',
            type: 'menu'
          },
          {
            name: 'Profile',
            link: '/profile',
            type: 'menu'
          },
          {
            name: 'Sign up',
            link: 'sign-up/',
            type: 'login'
          },
          {
            name: 'Sign in',
            link: '/sign-in',
            type: 'login'
          },

        ],
        status: false
      }

    },
    computed: {
      statusLogout () {
        return this.$store.getters.logoutStatus
      }
    },
    watch: {
      statusLogout (value) {
        this.status = value
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout', false)
      }
    }
  }
</script>

<!--position: absolute;-->
<!--width: 80%;-->
<!--top: 90px;-->
<!--left: 50%;-->
<!--transform: translateX(-50%);-->