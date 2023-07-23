<template>
    <div class="layout-wrapper d-lg-flex">
        <lessons-list @open-lesson="openLesson" :title="course.title" :lessons="course.lessons"/>
        <div class="user-chat w-100 overflow-hidden">
            <div class="d-lg-flex">
                <div class="w-100 overflow-hidden position-relative">
                    <div class="p-3 p-lg-4 border-bottom user-chat-topbar">
                        <div class="row align-items-center">
                            <div class="col-sm-4 col-4">
                                <h4 class="mb-0">{{lesson.title}}</h4>
                            </div>
                            <div class="col-sm-8 col-4">
                                <ul class="list-inline user-chat-nav text-end mb-0">
                                    <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                        <button type="button" class="btn nav-btn">
                                            <i class="fa-solid fa-check"></i>
                                        </button>
                                    </li>
                                    <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                        <button type="button" class="btn nav-btn">
                                            <i class="fa-solid fa-file-pdf"></i>
                                        </button>
                                    </li>
                                    <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                                        <button type="button" class="btn nav-btn btn-svg">
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
                    <div class="p-3 p-lg-4">
                        {{lesson.overview}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LessonsList from '@/components/LessonsList.vue';

export default {
    components: {LessonsList},
    data: () => ({
        course: {
            title: '',
            lessons: []
        },
        lesson: {
            title: '',
            subtitle: '',
            overview: '',
            assets: {
                video: '',
                chart: [],
                tabs: []
            },
        },
    }),
    async mounted() {
        await this.openCourse(5);
    },
    methods: {
        openLesson(lesson) {
            this.lesson = lesson
        },
        async openCourse(lessonId) {
            this.course = await window.electronAPI.getCourse(lessonId);
        },
    }
}
</script>

<style>
.user-chat {
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
</style>