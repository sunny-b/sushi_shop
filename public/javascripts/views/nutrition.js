var NutritionView = Backbone.View.extend({
  template: App.templates.nutrition,
  events: {
    'click .next': 'nextItem',
    'click .prev': 'prevItem',
    'click .add_cart': 'addToCart'
  },
  id: 'item_details',
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$('[data-id] figure, article, aside').css({ opacity: '.2' });
    App.$content.html(this.$el);
    this.$('[data-id] figure, article, aside').animate({ opacity: '1'}, 50);
    router.navigate('menu/' + this.currentId, { trigger: true });
  },
  nextItem: function(e) {
    var self = this;
    this.$('[data-id] figure, article, aside').animate({ opacity: '0.05' }, 100, function() {
      App.trigger('next_item', self.currentId);
    });
  },
  prevItem: function(e) {
    var self = this;
    this.$('[data-id] figure, article, aside').animate({ opacity: '0.05' }, 100, function() {
      App.trigger('prev_item', self.currentId);
    });
  },
  addToCart: function(e) {
    e.preventDefault();

    App.trigger('add_cart', this.model);
  },
  initialize: function(options) {
    this.currentId = options.model.get('id');
    this.render();
  }
});