Handlebars.registerHelper('horizontalNavActive', function (nav) {
    var currentRoute = Router.current(),
        routeName = currentRoute.route.getName();

  return routeName === nav ? 'horizontalNav--item-active' : '';
});
