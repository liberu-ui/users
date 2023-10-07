/**
 * Import the routeImporter function from the 'routeImporter' module in the '@liberu-ui/ui/src/modules/importers' directory.
 * This function imports all the route modules from the './users' directory that match the regular expression '/.*\.ts$/'
 */
import routeImporter from '@liberu-ui/ui/src/modules/importers/routeImporter';

/**
 * Define a constant variable 'routes' which holds an array of route modules imported using the 'routeImporter' function.
 * The 'require.context' function is used to import all modules from the './users' directory.
 * The regular expression '/.*\.ts$/' is used to match all JavaScript files within the directory.
 */
const routes = routeImporter(require.context('./users', false, /.*\.ts$/));

/**
 * Define a functional component 'Router' which asynchronously imports the 'Router.vue' component from the '@liberu-ui/ui/src/bulma/pages' directory.
 */
const Router = () => import('@liberu-ui/ui/src/bulma/pages/Router.vue');

/**
 * Export an object as the default export of this module.
 * The object represents a route configuration for the 'users' path.
 */
export default {
    /**
     * The path property represents the path segment for the users route.
     * It is set as 'users'.
     */
    path: 'users',
    
    /**
     * The component property represents the component to be rendered when the users route is visited.
     * It is set as the 'Router' functional component.
     */
    component: Router,
    
    /**
     * The meta property represents additional metadata for the users route.
     * It contains a breadcrumb string and a route string.
     */
    meta: {
        /**
         * The breadcrumb property represents the title to be displayed in the breadcrumb navigation.
         * It is set as 'users'.
         */
        breadcrumb: 'users',
        
        /**
         * The route property represents the route identifier for the users route.
         * It is set as 'administration.users.index'.
         */
        route: 'administration.users.index',
    },
    
    /**
     * The children property represents an array of child route configurations for the users route.
     * It is set as the 'routes' array, which holds the imported route modules.
     */
    children: routes,
};
