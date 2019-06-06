<template>
    <nav class="h-20 flex w-full items-center pl-12 pr-12 w-4/5 background-dark-blue">
        <div class="flex justify-end">
            <div v-for="item in menu" :key="item.title">
                <router-link
                        v-if="disableBtn"
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
  import { mapGetters } from 'vuex'
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
      ...mapGetters({
       loginStatus: 'user'
      }),

      statusLogout () {
        return this.$store.getters.logoutStatus
      },
      menuList () {

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