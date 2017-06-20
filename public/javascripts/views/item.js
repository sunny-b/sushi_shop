var ItemView = Backbone.View.extend({
  template: App.templates.menu_item,
  events: {
    'click .next': 'nextItem',
    'click .prev': 'prevItem'
  },
  id: 'item_details',
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    App.$content.html(this.$el);
    router.navigate('menu/' + this.currentId, { trigger: true });
  },
  nextItem: function(e) {
    App.trigger('next_item', this.currentId);
  },
  prevItem: function(e) {
    App.trigger('prev_item', this.currentId);
  },
  initialize: function(options) {
    this.model = options.model;
    this.currentId = options.model.get('id');
    this.render();
  }
});