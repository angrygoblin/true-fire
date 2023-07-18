<script>
import LessonEntry from "@/components/LessonEntry.vue";

export default {
    components: {LessonEntry},
    data: () => ({
        lessons: []
    }),
    mounted() {
        this.lessons = this.readCourse()
    },
    methods: {
        readCourse() {
            const courseDir = 'app/lessons/Play Jazz Guitar 2 Rhythm & Lead Fundamentals';
            const lessonsDirsList = window.electronAPI.readDir(courseDir);
            const lessons = [];
            for (const lessonDir of lessonsDirsList) {
                if (!window.electronAPI.isDir(courseDir + '/' + lessonDir)) {
                    continue;
                }
                const info = window.electronAPI.readFile(courseDir + '/' + lessonDir + '/info.json', 'utf8')
                const lessonTitleParts = /^([\d]+) - (.*)$/.exec(lessonDir)
                const lesson = {
                    number: +lessonTitleParts[1],
                    title: lessonTitleParts[2],
                    ...JSON.parse(info),
                    video: [],
                    chart: [],
                    tabs: []
                }
                const lessonFiles = window.electronAPI.readDir(courseDir + '/' + lessonDir);
                for(const lessonFile of lessonFiles) {
                    if(lessonFile.includes('lesson')) {
                        lesson.video.push(lessonFile);
                    }
                    if(lessonFile.includes('tabs')) {
                        lesson.tabs = lessonFile;
                    }
                    if(lessonFile.includes('chart')) {
                        lesson.chart = lessonFile;
                    }
                }
                lessons.push(lesson)
            }
            lessons.sort((a, b) => a.number - b.number)
            return lessons;
        }
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
                        <h4 class="mb-4 mt-4">Rhythm & Lead Fundamentals</h4>
                    </div>
                    <div class="">
                        <div class="chat-message-list px-2" data-simplebar>
                            <ul class="list-unstyled chat-list chat-user-list">
                                <lesson-entry :title="lesson.title" :subtitle="lesson.subTitle" duration="" v-for="(lesson, key) in lessons" :key="`lesson-${key}`"/>
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