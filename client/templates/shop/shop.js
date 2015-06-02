//var mallParams="0001";

Template.shop.created = function () {
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
        //console.log("shop.created: userid="+Meteor.userId());
        //console.log("shop.created: findone="+UserDataExts.findOne({userID: Meteor.userId()}));
        //的确会出现UserDataExts.findOne为空的情况，主要是由于数据库没有完成初始化导致的
        if(UserDataExts.findOne({userID: Meteor.userId()}))
        {
          mallParams=UserDataExts.findOne({userID: Meteor.userId()}).location;
          //console.log("shop debug 001: mallParams="+mallParams);
        }
        else {
          //console.log("shop debug 001: mallParams=NOT find");
          ;
        }
      }
    }
    //console.log("shop debug 002: mallParams="+mallParams);
    Session.set("mallParams", mallParams);
    //this.subscription = Meteor.subscribe('Shops',Session.get("mallParams"));
  }.bind(this));
};

Template.shop.rendered = function () {
  // this.autorun(function () {
  //   if (!this.subscription.ready()) {
  //     IonLoading.show();
  //   } else {
  //     IonLoading.hide();
  //   }
  // }.bind(this));
};

Template.shop.helpers({
  shops: function () {
    //console.log(Shops.find().fetch());
    return Shops.find({mallindex:Session.get("mallParams")});
  },
  shopcount: function () {
    //console.log(Shops.find().fetch());
    return Shops.find({mallindex:Session.get("mallParams")}).count();
  },
  shoppic1st: function (taskId) {
    // console.log("taskId");
    // console.log(taskId);
    // console.log("Shops.findOne({_id:taskId})");
    // console.log(Shops.findOne({_id:taskId}));
    // console.log("Shops.findOne({_id:taskId}).fileIds[0]");
    // console.log(Shops.findOne({_id:taskId}).fileIds[0]);
    // console.log("end");
    return Shops.findOne({_id:taskId}).fileIds[0];
  },
  getshoppic: function (taskId) {
    //console.log("Each fileId="+taskId);
    //console.log("Each fileId="+taskId+","+Uploads.findOne({_id: taskId}).url);
    return Uploads.find({_id: taskId});
  },

});
