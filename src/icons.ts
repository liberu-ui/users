/**
 * Import the necessary functions and icons from the Font Awesome SVG Core library.
 */
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

/**
 * Add the "faUser" icon to the library.
 * @param icon - The icon to add to the library.
 */
function addIconToLibrary(icon: IconDefinition): void {
  library.add(icon);
}

// Call the "addIconToLibrary" function with the "faUser" icon.
addIconToLibrary(faUser);