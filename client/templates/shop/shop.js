Template.shop.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('shop');
  }.bind(this));
};

Template.shop.rendered = function () {
//  this.autorun(function () {
//    if (!this.subscription.ready()) {
//      IonLoading.show();
//    } else {
//      IonLoading.hide();
//    }
//  }.bind(this));
};

Template.shop.helpers({
  shops: function () {
    //console.log(Shops.find().fetch());
    return Shops.find();
  },
  shopcount: function () {
    //console.log(Shops.find().fetch());
    return Shops.find().count();
  },
});
