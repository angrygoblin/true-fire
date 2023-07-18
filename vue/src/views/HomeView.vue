<template>
    <div class="layout-wrapper d-lg-flex">
        <lessons-list/>
        <div class="user-chat w-100 overflow-hidden">
            <div class="d-lg-flex">
                <div class="w-100 overflow-hidden position-relative">
                    <div class="p-3 p-lg-4 border-bottom user-chat-topbar">
                        <div class="row align-items-center">
                            <div class="col-sm-4 col-4">
                                <h4 class="mb-0">Jazz Blues Riff</h4>
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
                                            <img src="/assets/images/gp-icon.svg" alt=""/>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="chat-conversation" data-simplebar="init">
                        <video  src="/lessons/16/lesson2.mp4" type='video/mp4' controls></video>
                    </div>
                    <div class="p-3 p-lg-4">
                        Here is a great jazz blues riff. When you work on this, really try to keep your technique as clean as you can. The better you get, the more you need to really zero in on your technique since bad technique can really derail your progress. Keep your hands as efficient as you can - always thinking about minimum motion.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LessonsList from "@/components/LessonsList.vue";

export default {
    components: {LessonsList},
    created() {
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