var MenuView = Backbone.View.extend({
  tagName: 'ul',
  id: 'items',
  render: function() {
    var self = this;

    this.collection.each(function(model) {
      var item = new MenuItemView({ model: model });
      self.$el.append(item.el);
    });

    App.$content.html(this.$el);
  },
  initialize: function(options) {
    this.render();
  }
});