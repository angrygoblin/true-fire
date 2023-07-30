<template>
    <div class="layout-wrapper d-lg-flex">
        <lessons-list @open-lesson="openLesson" :title="course.title" :lessons="course.lessons" :progress="progress"/>
        <div class="user-chat w-100 overflow-hidden" ref="lessonContent">
            <div class="d-lg-flex">
                <div class="w-100 overflow-hidden position-relative" v-if="lesson">
                    <div class="p-3 p-lg-4 border-bottom user-chat-topbar">
                        <div class="row align-items-center">
                            <div class="col-sm-4 col-4">
                                <h4 class="mb-0">{{lesson.title}}</h4>
                            </div>
                            <div class="col-sm-8 col-4">
                                <ul class="list-inline user-chat-nav text-end mb-0">
                                    <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                        <button type="button lesson-button" class="btn nav-btn" @click="changeStatus">
                                            <span v-if="lesson.status === 2" class="finished">
                                                <i class="fa-solid fa-circle-check"></i>
                                            </span>
                                            <span v-else-if="lesson.status === 1" class="playing">
                                                <i class="fa-regular fa-circle-check"></i>
                                            </span>
                                            <span v-else>
                                                <i class="fa-regular fa-circle"></i>
                                            </span>
                                        </button>
                                    </li>
                                    <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0" v-for="(chart, key) in lesson.assets.chart" :key="`chart-${key}`">
                                        <button type="button lesson-button" class="btn nav-btn" @click="openFile(chart)">
                                            <i class="fa-solid fa-file-pdf"></i>
                                        </button>
                                    </li>
                                    <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0" v-for="(tab, key) in lesson.assets.tabs" :key="`chart-${key}`">
                                        <button type="button lesson-button" class="btn nav-btn btn-svg" @click="openFile(tab)">
                                            <img src="assets/images/gp-icon.svg" alt=""/>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="chat-conversation" data-simplebar="init">
                        <video :src="`../${lesson.assets.video}`" type='video/mp4' :poster="`../${course.poster}`" controls></video>
                    </div>
                    <div class="p-3 p-lg-4" v-html="lesson.overview">
                    </div>
                </div>
                <div class="no-lesson-intro" v-else>
                    <img src="assets/images/truefire-logo.png"/>
                    <h1>The Best Guitar Lessons Online</h1>
                    <h3>Fast. Easy. Fun.</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LessonsList from '@/components/LessonsList.vue';
import PerfectScrollbar from "perfect-scrollbar";
import 'perfect-scrollbar/css/perfect-scrollbar.css';
const LessonStatus = {
    new: 0,
    playing: 1,
    finished: 2,
}
export default {
    components: {LessonsList},
    computed: {
        lesson () {
            for (const lesson of this.course.lessons) {
                if (lesson.id === this.activeLesson) {
                    return lesson;
                }
            }
            return null;
        },
        progress () {
            const lessonsScore = this.course.lessons.reduce((a, b) => {
                return a + +b.status;
            }, 0)
            return  (((lessonsScore / 2) / this.course.lessons.length) * 100 ).toFixed(0);
        }
    },
    data: () => ({
        course: {
            title: '',
            lessons: []
        },
        activeLesson: null,
    }),
    async mounted() {
        const lastLesson = await window.electronAPI.getLastOpenedLesson();
        if (lastLesson) {
            await this.openCourse(lastLesson.course_id);
        }
        window.electronAPI.menuClick((event, id) => {
            this.openCourse(id);
        })
        new PerfectScrollbar(this.$refs.lessonContent);
    },
    methods: {
        openLesson(lesson) {
            this.activeLesson = lesson.id
        },
        async openCourse(id) {
            this.course = await window.electronAPI.getCourse(id);
            console.log(this.course)
        },
        async changeStatus() {
            let status;
            switch (this.lesson.status) {
                case LessonStatus.finished:
                    status = LessonStatus.new;
                    break;
                case LessonStatus.playing:
                    status = LessonStatus.finished;
                    break;
                default:
                    status = LessonStatus.playing;
            }
            await window.electronAPI.updateProgress(this.lesson.id, status)
            await this.openCourse(this.course.id)
        },
        async openFile(file) {
            await window.electronAPI.openFile(file)
        }
    }
}
</script>

<style>
body {
    overflow: hidden;
}
.no-lesson-intro img {
    margin: 0 auto;
}
.no-lesson-intro {
    background-image: url(../../public/assets/images/background.jpg);
    background-size: cover;
    background-position: 100% 100%;
    width: 100%;
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.no-lesson-intro img {
    width: 200px;
}
.user-chat {
    height: 100vh;
    background-color: var(--bs-white);
    -webkit-box-shadow: 0 2px 4px rgba(15,34,58,.12);
    box-shadow: 0 2px 4px rgba(15,34,58,.12);
    -webkit-transition: all .4s;
    transition: all .4s;
}
.btn-svg img {
    width: 15px;
    height: 15px;
    filter: invert(77%) sepia(8%) saturate(828%) hue-rotate(188deg) brightness(92%) contrast(88%);
}
.chat-conversation video {
    width: 100%;
}
.lesson-button:hover span{
    color: #06d6a0;
}
.lesson-button .finished {
    color: #06d6a0;
}
.lesson-button .playing {
    color: #ffd300;
}
</style>