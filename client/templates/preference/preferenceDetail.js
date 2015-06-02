Template.preferenceDetail.created = function () {
  this.autorun(function () {
  }.bind(this));
};

Template.preferenceDetail.rendered = function () {
 // this.autorun(function () {
 //   if (!this.subscription.ready()) {
 //     IonLoading.show();
 //   } else {
 //     IonLoading.hide();
 //   }
 // }.bind(this));
};


Template.preferenceDetail.helpers({
  preferenceid: function () {
    //return Shopdetails.findOne({_id: Router.current().params._id});
    return (Router.current().params._id);
  },
  preferencedetail: function () {
    //return Shopdetails.findOne({_id: Router.current().params._id});
    return Preferences.findOne({_id: Router.current().params._id});
  },
  getpreferencepic: function (taskId) {
    return Uploads.find({_id: taskId});
  },
});

Template.preferenceDetail.events({
});
