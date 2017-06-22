var CartView = Backbone.View.extend({
  template: App.templates.cart,
  events: {
    'click .empty_cart': 'emptyCart'
  },
  delay: 300,
  el: App.$cart.get(0),
  render: function() {
    if (this.collection.getQuantity() < 1) {
      this.$el.hide();
    } else {
      this.$el.html(this.template({
        items: this.collection.toJSON(),
        total: this.collection.getTotal()
      }));
      
      this.$el.slideDown(this.delay);
    }
  },
  emptyCart: function(e) {
    e.preventDefault();
    var self = this;
    
    this.$el.slideUp(this.delay, function() {
      self.collection.trigger('empty');
    });
  },
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'cart_updated', this.render);
  }
});