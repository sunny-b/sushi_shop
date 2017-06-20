var HeaderView = Backbone.View.extend({
  template: App.templates.header,
  el: $('.cart').get(0),
  render: function() {
    this.$el.html(this.template({
      quantity: this.collection.getQuantity()
    }));
  },
  initialize: function() {
    this.render();
  }
});