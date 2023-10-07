/**
 * Represents the user creation page component.
 * @component
 */
const UserCreate: React.FC = () => import('../../../pages/users/Create.vue');

/**
 * Represents the user creation route configuration.
 * @typedef {Object} UserCreateRoute
 * @property {string} name - The name of the route.
 * @property {string} path - The route path.
 * @property {React.FC} component - The component to be rendered for this route.
 * @property {Object} meta - The metadata for this route.
 * @property {string} meta.breadcrumb - The breadcrumb label for this route.
 * @property {string} meta.title - The title for this route.
 */

/**
 * Represents the user creation route configuration.
 * @type {UserCreateRoute}
 */
const userCreateRoute: UserCreateRoute = {
    name: 'administration.users.create',
    path: 'create/:person',
    component: UserCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create User',
    }
};

export default userCreateRoute;