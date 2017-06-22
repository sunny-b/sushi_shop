var router = new (Backbone.Router.extend({
  routes: {
    'index.html': function() { this.navigate('menu', { trigger: true }); },
    'menu': App.init.bind(App),
    'menu/:id': App.itemNutrition.bind(App),
    'checkout': App.renderCheckout.bind(App)
  }
}))();

Backbone.history.start({
  pushState: true 
});

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  var href = $(e.currentTarget).attr('href').replace(/^\//, '');
  href = href || 'menu';

  router.navigate(href, { trigger: true });
});