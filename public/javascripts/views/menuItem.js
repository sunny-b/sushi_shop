var MenuItemView = Backbone.View.extend({
  tagName: 'li',
  template: App.templates.menuItem,
  events: {
    'click header': 'nutrition',
    'click .add_cart': 'addToCart'
  },
  nutrition: function(e) {
    e.preventDefault();

    var id = this.model.get('id');

    router.navigate('menu/' + id, { trigger: true });
  },
  addToCart: function(e) {
    e.preventDefault();

    App.trigger('add_cart', this.model);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },
  initialize: function() {
    this.render();
  }
});