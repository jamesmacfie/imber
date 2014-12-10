/* Helper functions that abstract away navigation details */

'use strict';

/*
 * If the current route is active, return the CSS class that displays the active state
 *
 * @param {string} [nav] The route name you want to query against
 *
 * @returns {string} Either the active nav CSS class or an empty string
 */
Handlebars.registerHelper('horizontalNavActive', function (nav) {
    var currentRoute = Router.current(),
        routeName = currentRoute.route.getName();

  return routeName === nav ? 'horizontalNav--item-active' : '';
});
