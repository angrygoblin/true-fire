<script>
import LessonEntry from "@/components/LessonEntry.vue";

export default {
    components: {LessonEntry},
    data: () => ({
        title: '',
        lessons: [],
    }),
    async mounted() {
        await this.openCourse(5)
    },
    methods: {
        async openCourse(courseId) {
            const lessonData = await window.electronAPI.getCourse(courseId);
            this.lessons = lessonData.lessons;
            this.title = lessonData.title;
        },
    }
}
</script>

<template>
    <div class="chat-leftsidebar me-lg-1 ms-lg-0">
        <div class="tab-content">
            <div class="tab-pane fade show active" id="pills-chat" role="tabpanel" aria-labelledby="pills-chat-tab">
                <!-- Start chats content -->
                <div>
                    <div class="px-4 pt-4">
                        <div class="progress mb-4">
                            <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                        </div>
                        <h4 class="mb-4 mt-4">{{this.title}}</h4>
                    </div>
                    <div class="">
                        <div class="chat-message-list px-2" data-simplebar>
                            <ul class="list-unstyled chat-list chat-user-list">
                                <lesson-entry
                                    :title="lesson.title"
                                    :subtitle="lesson.subtitle"
                                    duration=""
                                    v-for="(lesson, key) in lessons"
                                    :key="`lesson-${key}`"
                                    @click="$emit('open-lesson', lesson)"
                                />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-leftsidebar {
    min-width: 380px;
}
.chat-list {
    margin: 0;
}
.chat-list li a {
    position: relative;
    display: block;
    padding: 15px 20px;
    color: var(--bs-secondary-color);
    -webkit-transition: all .4s;
    transition: all .4s;
    border-top: 1px solid var(--bs-sidebar-sub-bg);
    border-radius: 4px;
}
</style>