```typescript
/**
 * Module for importing routes dynamically.
 * @module routeImporter
 */

/** 
 * The context module for the route importer.
 * @type {object}
 * @property {function} keys - Returns an array of all possible request keys that the module is able to handle.
 * @property {function} resolve - Function that returns the module corresponding to the passed request key. 
 */
import routeImporter from '@liberu-ui/ui/src/modules/importers/routeImporter';

/**
 * Imports all route modules from the given context module.
 * @function
 * @param {object} context - The context module containing the route modules.
 * @returns {object[]} An array of imported route modules.
 */
const importRoutes = (context: object): object[] => {
  return routeImporter(context.keys().map((key: string) => context(key)));
};

/**
 * The administration routes configuration.
 * @type {object}
 * @property {string} path - The base path for the administration routes.
 * @property {object[]} children - The imported route modules for the administration section.
 */
const administrationRoutes = {
  path: '/administration',
  children: importRoutes(require.context('./administration', false, /.*\.ts$/))
};

export default administrationRoutes;
```