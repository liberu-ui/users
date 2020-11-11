import Vue from 'vue';
import App from '@enso-ui/ui/src/core/app';
import ProfileController from './components/navbar/ProfileControl.vue';

Vue.component('navbar-profile-controller', ProfileController);
App.registerNavbarItem('navbar-profile-controller', 5);
