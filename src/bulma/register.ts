import App from '@liberu-ui/ui/src/core/app';
import ProfileController from './components/navbar/ProfileControl.vue';

/**
 * Registers a navbar item with the given parameters.
 * 
 * @param {string} name - The name of the navbar item.
 * @param {ProfileController} controller - The controller component for the navbar item.
 * @param {number} order - The order of the navbar item.
 * @returns {void}
 */
function registerNavbarItem(name: string, controller: ProfileController, order: number): void {
  App.registerNavbarItem(name, controller, order);
}

registerNavbarItem('profile-controller', ProfileController, 400);