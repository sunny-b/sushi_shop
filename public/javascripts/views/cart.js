var CartView = Backbone.View.extend({
  template: App.templates.cart,
  el: $('#cart').get(0),
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));

    if (this.collection.getQuantity() < 1) {
      this.$el.slideUp();
    }
  },
  initialize: function() {
    this.render();
  }
});