Template.shopDetail.created = function () {
  this.autorun(function () {
    //Meteor.subscribe('Shopdetails',Router.current().params._id);
  }.bind(this));
};

Template.shopDetail.rendered = function () {
 // this.autorun(function () {
 //   if (!this.subscription.ready()) {
 //     IonLoading.show();
 //   } else {
 //     IonLoading.hide();
 //   }
 // }.bind(this));
};


Template.shopDetail.helpers({
  shopid: function () {
    //return Shopdetails.findOne({_id: Router.current().params._id});
    return (Router.current().params._id);
  },
  shopdetail: function () {
    //return Shopdetails.findOne({_id: Router.current().params._id});
    return Shops.findOne({_id: Router.current().params._id});
  },
  getshoppic: function (taskId) {
    return Uploads.find({_id: taskId});
  },
  preferences: function () {
    //console.log(Preferences.find().fetch());
    return Preferences.find({shopId:Router.current().params._id},{sort:{createdAt:-1}});
  },
  preferencecount: function () {
    //console.log(Preferences.find().fetch());
    return Preferences.find({shopId:Router.current().params._id}).count();
  },
  preferencepic1st: function (taskId) {
    return Preferences.findOne({_id:taskId}).fileIds[0];
  },
  getpreferencepic: function (taskId) {
    return Uploads.find({_id: taskId});
  },

});

Template.shopDetail.events({
});
