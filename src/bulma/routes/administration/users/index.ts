/**
 * The Users Index component.
 * Imports the Index.vue component from the users folder.
 */
const UsersIndex = () => import('../../../pages/users/Index.vue');

export default {
    /**
     * The name of the component.
     */
    name: 'administration.users.index',

    /**
     * The path of the component.
     */
    path: '',

    /**
     * The component to be rendered.
     */
    component: UsersIndex,

    /**
     * The metadata for the component.
     */
    meta: {
        /**
         * The text for breadcrumb navigation.
         */
        breadcrumb: 'index',

        /**
         * The title for the component.
         */
        title: 'Users',
    },
};
