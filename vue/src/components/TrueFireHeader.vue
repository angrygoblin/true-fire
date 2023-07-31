<script>

export default {
    name: "TrueFireHeader",
    methods: {
        closeApp() {
            return window.electronAPI.closeApp();
        },
        toggle() {
            if (this.$route.name === 'menu') {
                this.$router.push('/')
            } else {
                this.$router.push('/menu')
            }
        }
    }
}
</script>

<template>
    <div class="true-fire-header">
        <span class="menu-button" @click="toggle">
            <i class="fa-solid fa-bars"></i>
        </span>
        <div class="true-fire-window-header"></div>
        <span class="close-button" @click="closeApp">
            <i class="fa-solid fa-xmark"></i>
        </span>
    </div>
</template>

<style>

.true-fire-window-header {
    height: 40px;
    width: calc(100% - 80px);
    left: 40px;
    position: fixed;
    -webkit-app-region: drag;
}
.true-fire-header {
    height: 40px;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
}
.close-button {
    display: block;
    position: absolute;
    top: 5px;
    right: 14px;
    font-size: 20px;
}
.menu-button {
    display: block;
    position: absolute;
    top: 18px;
    left: 24px;
    font-size: 20px;
}
</style>