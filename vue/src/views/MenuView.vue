<script>
import PerfectScrollbar from "perfect-scrollbar";

export default {
    props: ['title', 'lessons', 'progress'],
    data: () => ({
        jazz: [],
        acoustic: [],
        supplementary: [],
    }),
    mounted() {
        new PerfectScrollbar(this.$refs.lessonContent);
        this.getCategory(1).then((data) => {
            this.jazz = data;
        })
        this.getCategory(2).then((data) => {
            this.acoustic = data;
        })
        this.getCategory(3).then((data) => {
            this.supplementary = data;
        })
    },
    methods: {
        getCategory(id) {
            return window.electronAPI.getCategory(id)
        },
        openCourse(id) {
            this.$router.push('/?course=' + id);
        },
    }
}
</script>

<template>
    <div class="layout-wrapper d-lg-flex menu-view">
        <div class="user-chat w-100 overflow-hidden" ref="lessonContent">
            <div class="d-lg-flex">
                <div class="container">
                    <div class="row">
                        <img src="assets/images/truefire-logo.png"/>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h3>Jazz</h3>
                            <ul>
                                <li v-for="(item, key) in jazz" :key="`jazz-${key}`"><a href="#" @click="openCourse(item.id)">{{item.name}}</a></li>
                            </ul>
                        </div>
                        <div class="col">
                            <h3>Acoustic</h3>
                            <ul>
                                <li v-for="(item, key) in acoustic" :key="`jazz-${key}`"><a href="#" @click="openCourse(item.id)">{{item.name}}</a></li>
                            </ul>
                        </div>
                        <div class="col">
                            <h3>Supplementary</h3>
                            <ul>
                                <li v-for="(item, key) in supplementary" :key="`jazz-${key}`"><a href="#" @click="openCourse(item.id)">{{item.name}}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.menu-view .user-chat {
    background: none;
}
.menu-view .container{
    max-width: 90vw;
}
.menu-view {
    background-image: url(../../public/assets/images/background.jpg);
    background-size: cover;
    background-position: 100% 100%;
    width: 100%;
    height: 100vh;
}
.menu-view img {
    margin: 50px auto;
    width: 200px;
}
.menu-view ul {
    list-style: none;
    padding: 0;
}
.menu-view h3 {
    margin-bottom: 25px;
}
.menu-view ul li{
    font-size: 16px;
    margin-bottom: 15px;
    line-height: 18px;
    display: block;
}
.menu-view ul li a{
    color: rgba(255, 255, 255, 0.5);
}
.menu-view ul li:hover a{
    color: white;
}
</style>