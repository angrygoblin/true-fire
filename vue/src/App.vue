<script>
import { RouterView } from 'vue-router'
import TrueFireHeader from "@/components/TrueFireHeader.vue";
// const illustrations = require.context('@/lessons', true)
// console.log(illustrations.keys())
export default {
    components: {TrueFireHeader, RouterView},
}
</script>

<template>
    <true-fire-header/>
    <router-view/>
</template>

<style>
body {
    -webkit-user-select: none;
}
@import url(https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600&display=swap);
:root {
    --bs-body-color: #a6b0cf;
    --bs-body-color-rgb: 166,176,207;
    --bs-body-bg: #303841;
    --bs-body-bg-rgb: 48,56,65;
    --bs-emphasis-color: #f8f9fa;
    --bs-emphasis-color-rgb: 248,249,250;
    --bs-secondary-color: #abb4d2;
    --bs-secondary-color-rgb: 171,180,210;
    --bs-secondary-bg: #36404a;
    --bs-secondary-bg-rgb: 54,64,74;
    --bs-tertiary-color: rgba(166, 176, 207, 0.5);
    --bs-tertiary-color-rgb: 166,176,207;
    --bs-tertiary-bg: #272e34;
    --bs-tertiary-bg-rgb: 39,46,52;
    --bs-primary-text-emphasis: #aaa5f5;
    --bs-secondary-text-emphasis: #afb2c2;
    --bs-success-text-emphasis: #6ae6c6;
    --bs-info-text-emphasis: #96c9f7;
    --bs-warning-text-emphasis: #ffe3a3;
    --bs-danger-text-emphasis: #f591a9;
    --bs-light-text-emphasis: #f8f9fa;
    --bs-dark-text-emphasis: #f0eff5;
    --bs-primary-bg-subtle: rgba(114, 105, 239, 0.15);
    --bs-secondary-bg-subtle: #343a40;
    --bs-success-bg-subtle: #025640;
    --bs-info-bg-subtle: #204260;
    --bs-warning-bg-subtle: #665429;
    --bs-danger-bg-subtle: #601c2c;
    --bs-light-bg-subtle: #343a40;
    --bs-dark-bg-subtle: #1a1d20;
    --bs-primary-border-subtle: #443f8f;
    --bs-secondary-border-subtle: #495057;
    --bs-success-border-subtle: #048060;
    --bs-info-border-subtle: #306391;
    --bs-warning-border-subtle: #997d3d;
    --bs-danger-border-subtle: #8f2b43;
    --bs-light-border-subtle: #495057;
    --bs-dark-border-subtle: #343a40;
    --bs-heading-color: inherit;
    --bs-link-color: #aaa5f5;
    --bs-link-hover-color: #b7b3f7;
    --bs-link-color-rgb: 170,165,245;
    --bs-link-hover-color-rgb: 183,179,247;
    --bs-code-color: #f18bba;
    --bs-border-color: #36404a;
    --bs-border-color-translucent: #39414b;
    --bs-form-valid-color: #6ae6c6;
    --bs-form-valid-border-color: #6ae6c6;
    --bs-form-invalid-color: #f591a9;
    --bs-form-invalid-border-color: #f591a9;
    --bs-white: #262e35;
    --bs-white-rgb: 38,46,53;
    --bs-light: #36404a;
    --bs-light-rgb: 54,64,74;
    --bs-dark: #eff2f7;
    --bs-dark-rgb: 239,242,247;
    --bs-secondary: #7a7f9a;
    --bs-secondary-rgb: 122,127,154;
    --bs-text-muted: #9aa1b9;
    --bs-text-muted-rgb: 154,161,185;
    --bs-sidebar-bg: #36404a;
    --bs-sidebar-menu-item-color: #a6b0cf;
    --bs-sidebar-menu-item-active-color: #ffffff;
    --bs-sidebar-menu-item-active-bg: #3e4a56;
    --bs-sidebar-sub-bg: #303841;
    --bs-accordion-button-bg: #36404a;
    --bs-accordion-bg: transparent;
    --bs-theme-mode-icon: "";
    --bs-dropdown-bg: #313a43;
}
.true-fire-header span {
    cursor: pointer;
}
</style>
