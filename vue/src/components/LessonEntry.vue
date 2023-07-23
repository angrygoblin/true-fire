<template>
    <li>
        <a href="#" @click.prevent="">
            <div class="d-flex">
                <div class="flex-grow-1 overflow-hidden">
                    <h5 class="text-truncate font-size-15 mb-1">{{title}}</h5>
                    <p class="chat-user-message text-truncate mb-0">{{subtitle}}</p>
                </div>
                <div class="font-size-11">04:26</div>
                <div class="unread-message">
                    <span class="badge badge-soft-success rounded-pill">
                        <i class="fa-solid fa-check"></i>
                    </span>
                </div>
            </div>
        </a>
    </li>
</template>
<script>
export default {
    props: ['duration', 'title', 'subtitle'],
    methods: {}
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
</style>