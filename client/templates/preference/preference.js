Template.preference.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('preference');
  }.bind(this));
};

Template.preference.rendered = function () {
//  this.autorun(function () {
//    if (!this.subscription.ready()) {
//      IonLoading.show();
//    } else {
//      IonLoading.hide();
//    }
//  }.bind(this));
};

Template.preference.helpers({
  preferences: function () {
    //console.log(Preferences.find().fetch());
    return Preferences.find({},{sort:{createdAt:-1}});
  },
  preferencecount: function () {
    //console.log(Preferences.find().fetch());
    return Preferences.find().count();
  },
  /*
  preferencepics: function (taskId) {
    //console.log(Preferences.find().fetch());
    //console.log("taskId="+taskId);
    //console.log("taskId="+taskId+" name="+Preferences.findOne({_id:taskId}).name);
    //console.log(Preferences.findOne({_id:taskId}).fileIds[0])}).
    //console.log(Preferences.findOne({_id:taskId}).fileIds[0])})

    //if(Preferences.findOne({_id:taskId}).fileIds)
    //{
    //  console.log("fileIds="+Preferences.findOne({_id:taskId}).fileIds);
    //}
    return Preferences.findOne({_id:taskId}).fileIds;
  },*/
  preferencepic: function (taskId) {
    //console.log("Each fileId="+taskId);
    //console.log("Each fileId="+taskId+","+Uploads.findOne({_id: taskId}).url);
    return Uploads.find({_id: taskId});
  },
});


//Template.shares.helpers({
//    shares:function(){
//        return Shares.find({},{sort:{createdAt:-1}});
//    }
//});
