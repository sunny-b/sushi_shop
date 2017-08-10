var App = {
  templates: JST,
  $content: $('#content'),
  $cart: $('#cart'),
  renderMenu: function() { new MenuView({ collection: this.menu_items })},
  createCart: function() {
    this.cart = new CartItems();
    new CartView({
      collection: this.cart
    });

    new HeaderView({
      collection: this.cart
    });
  },
  itemNutrition: function(id) {
    var model = this.menu_items.get(+id);

    new NutritionView({ model: model });
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
  renderCheckout: function() {
    new CheckoutView({
      collection: this.cart
    });
  },
  renderCheckoutHtml: function(html) {
    this.$content.html(html);
    this.$cart.hide();
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
    this.on('next_item', this.nextItem.bind(this));
    this.on('prev_item', this.prevItem.bind(this));
    this.on('add_cart', this.cart.addItem.bind(this.cart));
    this.on('render_checkout_html', this.bind(this));
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