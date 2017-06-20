var MenuView = Backbone.View.extend({
  template: App.templates.menu,
  events: {
    'click li[data-id]': 'menuItem'
  },
  el: $('#content').get(0),
  renderMenu: function() {
    this.$el.html(this.template({
      menu_items: this.collection.toJSON()
    }));

    if (this.cart.length < 1) {
      $('#cart').slideUp();
    }
  },
  menuItem: function(e) {
    e.preventDefault();

    var id = $(e.currentTarget).closest('li').data('id');

    App.itemDetail(id);
  },
  initialize: function(options) {
    this.cart = options.cart
    this.renderMenu();
  }
});