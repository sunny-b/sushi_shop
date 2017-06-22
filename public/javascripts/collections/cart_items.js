var CartItems = Backbone.Collection.extend({
  setTotal: function() {
    this.total = this.toJSON().reduce(function(a, b) {
      return a + b.price * b.quantity;
    }, 0);

    return this;
  },
  getTotal: function() { return this.total; },
  setQuantity: function() {
    this.quantity = this.toJSON().reduce(function(a, b) {
      return a + b.quantity;
    }, 0);

    return this;
  },
  getQuantity: function() { return this.quantity; },
  readStorage: function() {
    var stored_cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.reset(stored_cart);
    this.setTotal().setQuantity();
  },
  updateStorage: function() {
    localStorage.setItem('cart', JSON.stringify(this.toJSON()));
  },
  removeItem: function(id) {
    this.remove(id);
    this.updateCart();
  },
  updateCart: function() {
    this.update('cart_updated');
  },
  update: function(event) {
    this.setTotal().setQuantity().updateStorage();
    this.trigger(event);
  },
  emptyCart: function() {
    this.reset();

    this.updateCart();
  },
  addItem: function(item) {
    var existing = this.get(item.get('id'));

    if (existing) {
      existing.set('quantity', existing.get('quantity') + 1);
    } else {
      existing = item.clone();
      existing.set('quantity', 1);
      this.add(existing);
    }

    this.updateCart();
  },
  updateQuantity: function(options) {
    var item = this.get(options.id);
    item.set('quantity', options.quantity);
    
    if (item.get('quantity') < 1) {
      this.remove(options.id);
    }

    this.update('update_checkout');
  },
  initialize: function() {
    this.readStorage();
    this.on('empty', this.emptyCart.bind(this));
    this.on('update_quantity', this.updateQuantity.bind(this));
  }
});