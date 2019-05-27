<template>
    <nav class="h-20 flex items-center pl-12 pr-12 absolute w-4/5 border-solid border-t border-b" style="top:50px; left: 50%; transform: translateX(-50%); border-color: #f3843e">
        <img src="../img/logo@2x.png" alt="" class="w-full absolute" style="max-width: 200px; left: 50%; transform: translateX(-50%);">
        <div class="flex">
            <div v-for="item in menu" :key="item.title">
                <router-link
                        v-if="item.type === 'menu'"
                        router
                        :to="item.link"
                        class="flex items-center text-white p-4 font-bold" style="color: #ff5a09">
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

                        class="flex items-center text-white p-4 font-bold" style="color: #ff5a09">
                    {{item.name}}
                </router-link>
            </div>
        </div>
        <button @click.prevent="logout()" class="text-white p-4 font-bold" style="color: #ff5a09">

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