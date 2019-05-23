<template>
    <nav class="bg-blue-800 h-20 flex items-center pl-12 pr-12" style="background: #b23850">
        <div class="flex">
            <div v-for="item in menu" :key="item.title">
                <router-link
                        v-if="item.type === 'menu'"
                        router
                        :to="item.link"
                        class="flex items-center text-white p-4" style="color: #e7e3d4">
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

                        class="flex items-center text-white p-4" style="color: #e7e3d4">
                    {{item.name}}
                </router-link>
            </div>
        </div>
        <button @click.prevent="logout()" class="text-white p-4" style="color: #e7e3d4">

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