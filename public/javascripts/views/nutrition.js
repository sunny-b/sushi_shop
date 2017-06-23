var NutritionView = Backbone.View.extend({
  template: App.templates.nutrition,
  events: {
    'click .nav': 'changeItem',
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
  changeItem: function(e) {
    e.preventDefault();

    if ($(e.target).hasClass('next')) {
      this.triggerFade('next_item');
    } else {
      this.triggerFade('prev_item');
    }
  },
  triggerFade: function(event) {
    var self = this;
    
    this.$('[data-id] figure, article, aside').animate({ opacity: '0.05' }, 100, function() {
      App.trigger(event, self.currentId);
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