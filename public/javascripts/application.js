var App = {
  templates: JST,
  $content: $('#content'),
  renderMenu: function() {
    new MenuView({
      collection: this.menu_items,
      cart: this.cart
    });
  },
  createCart: function() {
    this.cart = new CartItems();
    this.cart.view = new CartView({
      collection: this.cart
    });

    this.cart.header = new HeaderView({
      collection: this.cart
    });
  },
  itemDetail: function(id) {
    var model = this.menu_items.get(+id);

    new ItemView({
      model: model
    });
  },
  nextItem: function(id) {
    var length = this.menu_items.length;
    var nextID = id === length ? 1 : id + 1;

    router.navigate('menu/' + nextID, { trigger: true });
  },
  prevItem: function(id) {
    var previousID = id === 1 ? 19 : id - 1;

    router.navigate('menu/' + previousID, { trigger: true });
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on('next_item', this.nextItem.bind(this));
    this.on('prev_item', this.prevItem.bind(this));
  },
  init: function() {
    this.createCart();
    this.renderMenu();
    this.bindEvents();
  }
};

Handlebars.registerHelper('format_price', function(price) {
  return (+price).toFixed(2);
});