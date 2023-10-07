```
import { ComponentOptions, Component } from 'vue';

/**
 * Show component for User profile.
 */
const UserShow: ComponentOptions<Component> = () => import('../../../pages/users/Show.vue');

/**
 * Represents the configuration for the Administration user show route.
 */
const administrationUserShowRouteConfig: { 
    name: string; 
    path: string; 
    component: ComponentOptions<Component>; 
    meta: { 
        breadcrumb: string; 
        title: string; 
    }; 
} = {
    name: 'administration.users.show',
    path: ':user',
    component: UserShow,
    meta: {
        breadcrumb: 'show',
        title: 'User Profile',
    },
};

export default administrationUserShowRouteConfig;
```
