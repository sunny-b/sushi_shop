var router = new (Backbone.Router.extend({
  routes: {
    'index.html': function() { this.navigate('menu', { trigger: true }); },
    'menu': App.init.bind(App),
    'menu/:id': App.itemDetail.bind(App)
  }
}))();

Backbone.history.start({
  pushState: true 
});

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();

  router.navigate($(e.currentTarget).attr('href').replace(/^\//, ''), { trigger: true });
});