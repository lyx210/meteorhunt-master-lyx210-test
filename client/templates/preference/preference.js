Template.preference.created = function () {
  this.autorun(function () {
    var mallParams = Session.get("mallParams");
    var tmpmallParams = Router.current().params.query.mall;//for /?mall=0001
    //console.log("mall.created: tmpmallParams="+tmpmallParams);
    if(tmpmallParams)
    {
      mallParams=tmpmallParams;
      if(Meteor.userId())
      {
        //console.log("mall.created: userid="+Meteor.userId());
        Meteor.call("userlocation_set",tmpmallParams,Meteor.userId());
        //console.log("mall.created: location="+tmpmallParams);
      }
    }
    else {
      if(Meteor.userId())
      {
        if(UserDataExts.findOne({userID: Meteor.userId()}))
        mallParams=UserDataExts.findOne({userID: Meteor.userId()}).location;
      }
    }
    //console.log("mall.created: mallParams="+mallParams);
    Session.set("mallParams", mallParams);
    //this.subscription = Meteor.subscribe('Preferences',Session.get("mallParams"));
  }.bind(this));
};

Template.preference.rendered = function () {
 // this.autorun(function () {
 //   if (!this.subscription.ready()) {
 //     IonLoading.show();
 //   } else {
 //     IonLoading.hide();
 //   }
 // }.bind(this));
};

Template.preference.helpers({
  preferences: function () {
    //console.log(Preferences.find().fetch());
    return Preferences.find({mallindex:Session.get("mallParams")},{sort:{createdAt:-1}});
  },
  preferencecount: function () {
    //console.log(Preferences.find().fetch());
    return Preferences.find({mallindex:Session.get("mallParams")}).count();
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
  preferencepic1st: function (taskId) {
    return Preferences.findOne({_id:taskId}).fileIds[0];
  },
  getpreferencepic: function (taskId) {
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
