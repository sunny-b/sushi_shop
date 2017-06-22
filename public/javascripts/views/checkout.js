var CheckoutView = Backbone.View.extend({
  id: 'checkout',
  events: {
    'click .fa': 'updateQuantity',
    'click footer a': 'cancel',
    'submit': 'order'
  },
  template: App.templates.checkout,
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      total: this.collection.getTotal()
    }));
  },
  updateQuantity: function(e) {
    e.preventDefault();
    var id = $(e.currentTarget).closest('tr').data('id');
    var item = this.collection.get(id);
    var quantity;

    if ($(e.currentTarget).hasClass('fa-minus')) {
      quantity = item.get('quantity') - 1;
    } else {
      quantity = item.get('quantity') + 1;
    }

    this.collection.trigger('update_quantity', { id: id, quantity: quantity });
    this.render();
  },
  cancel: function(e) {
    this.collection.emptyCart();
  },
  order: function(e) {
    e.preventDefault();
    this.collection.emptyCart();
    router.navigate('menu', { trigger: true });
  },
  initialize: function() {
    this.render();
    App.$content.html(this.$el);
    App.$cart.hide();
  }
});