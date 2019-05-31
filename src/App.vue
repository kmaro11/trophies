<template>
    <div id="app" class="h-full bg-site">
        <Navigation/>
        <router-view></router-view>
    </div>
</template>
<script>
  import Navigation from '@/components/Navigation'

  export default {
    components: {
      Navigation,
    },
  }
</script>

