<template>
    <div class="side-menu flex-lg-column me-lg-1 ms-lg-0">
        <div class="navbar-brand-box">
            <a href="index.html" class="logo logo-dark">
                <span class="logo-sm">
                    <img src="/assets/images/logo2.png" alt="">
                </span>
            </a>
        </div>
        <div class="flex-lg-column my-auto">
            <ul class="nav nav-pills side-menu-nav justify-content-center" role="tablist">
                <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Profile">
                    <a class="nav-link" id="pills-user-tab" data-bs-toggle="pill" href="#" role="tab">
                        <i class="fa-sharp fa-solid fa-guitar"></i>
                        <i class="fa-solid fa-saxophone"></i>
                        <i class="fa-solid fa-saxophone-fire"></i>
                    </a>
                </li>
                <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Chats">
                    <a class="nav-link active" id="pills-chat-tab" data-bs-toggle="pill" href="#" role="tab">
                        <i class="fa-sharp fa-solid fa-guitar"></i>
                    </a>
                </li>
                <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Groups">
                    <a class="nav-link" id="pills-groups-tab" data-bs-toggle="pill" href="#" role="tab">
                        <i class="ri-group-line"></i>
                    </a>
                </li>
                <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Contacts">
                    <a class="nav-link" id="pills-contacts-tab" data-bs-toggle="pill" href="#" role="tab">
                        <i class="ri-contacts-line"></i>
                    </a>
                </li>
                <li class="nav-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Settings">
                    <a class="nav-link" id="pills-setting-tab" data-bs-toggle="pill" href="#" role="tab">
                        <i class="ri-settings-2-line"></i>
                    </a>
                </li>
                <li class="nav-item dropdown profile-user-dropdown d-inline-block d-lg-none">
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Profile <i class="ri-profile-line float-end text-muted"></i></a>
                        <a class="dropdown-item" href="#">Setting <i class="ri-settings-3-line float-end text-muted"></i></a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Log out <i class="ri-logout-circle-r-line float-end text-muted"></i></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style >
    .side-menu {
        min-width: 75px;
        max-width: 75px;
        height: 100vh;
        min-height: 570px;
        background-color: var(--bs-sidebar-bg);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        z-index: 9;
        -webkit-box-shadow: 0 2px 4px rgba(15,34,58,.12);
        box-shadow: 0 2px 4px rgba(15,34,58,.12);
    }
    .chat-leftsidebar {
        height: 100vh;
        background-color: var(--bs-sidebar-sub-bg);
    }
    .logo img {
        width: 60px;
        margin-left: 8px;
        margin-top: 8px;
    }
</style>
