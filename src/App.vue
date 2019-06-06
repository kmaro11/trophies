<template>
    <div id="app" class="h-full bg-site">
        <Navigation/>
        <router-view style="height: calc(100vh - 0px); padding-top: 80px"></router-view>
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

