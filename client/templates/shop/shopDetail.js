Template.shopDetail.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('shopdetail', Router.current().params._id);
  }.bind(this));
};

Template.shopDetail.rendered = function () {
};


Template.shopDetail.helpers({
  shopdetail: function () {
    return Shops.findOne({_id: Router.current().params._id});
  }
  //name: function () {
  //  return Shops.findOne({_id: Router.current().params._id}).name;
  //}
});

Template.shopDetail.events({
});
