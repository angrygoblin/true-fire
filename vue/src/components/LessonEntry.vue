<template>
    <li :class="['lesson', {active}]">
        <a href="#" @click.prevent="">
            <div class="d-flex">
                <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-15 mb-1">{{title}}</h5>
                    <p class="chat-user-message text-truncate mb-0">{{subtitle}}</p>
                </div>
                <div class="font-size-11">{{durationFormatted}}</div>
                <div class="unread-message">
                    <span v-if="state === 2" class="finished">
                        <i class="fa-solid fa-circle-check"></i>
                    </span>
                    <span v-else-if="state === 1" class="playing">
                        <i class="fa-regular fa-circle-check"></i>
                    </span>
                    <span v-else>
                        <i class="fa-regular fa-circle"></i>
                    </span>
                </div>
            </div>
        </a>
    </li>
</template>
<script>
export default {
    components: {},
    props: ['duration', 'title', 'subtitle', 'active', 'state'],
    computed: {
        durationFormatted() {
            let min = Math.floor(this.duration/60);
            let sec = this.duration%60;
            if (sec < 9) {
                sec = `0` + sec;
            }
            return `${min}:${sec}`;
        }
    }
}
</script>
<style>
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

.font-size-11 {
    font-size: 11px !important;
}
.chat-list li .unread-message {
    position: absolute;
    display: inline-block;
    right: 24px;
    left: auto;
    top: 33px;
}
.chat-list li .unread-message .badge{
    display: block;
    width: 22px;
    height: 22px;
    text-align: center;
    line-height: 20px;
}
.chat-list li .unread-message span.finished {
    color: #06d6a0;
}
.chat-list li .unread-message span.playing {
    color: #ffd300;
}
</style>