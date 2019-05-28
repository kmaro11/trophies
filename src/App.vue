<template>
    <div id="app" class="h-full bg-site">
        <Navigation/>
        <div class="w-full m-auto mt-0 absolute" style="max-width: 80%; top: 150px; left: 50%; transform: translateX(-50%)">
            <router-view></router-view>

        </div>

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

