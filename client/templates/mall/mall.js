Template.mall.created = function () {
  //console.log("mall.created:"+Router.current().url);
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

        //console.log("mall.created: profile.mallParams="+_(Meteor.user().profile.mallParams));
        //Meteor.user().profile.mallParams=tmpmallParams;
      }
    }
    else {
      if(Meteor.userId())
      {
        // console.log("mall.created: mallParams="+Meteor.user().profile.mallParams);
        // tmpmallParams=Meteor.user().profile.mallParams;

        //console.log("mall.created: userid="+Meteor.userId());
        //console.log("mall.created: findone="+UserDataExts.findOne({userID: Meteor.userId()}));
        //的确会出现UserDataExts.findOne为空的情况，主要是由于数据库没有完成初始化导致的
        if(UserDataExts.findOne({userID: Meteor.userId()}))
        {
          mallParams=UserDataExts.findOne({userID: Meteor.userId()}).location;
          //console.log("mall debug 001: mallParams="+mallParams);
        }
        else {
          //console.log("mall debug 001: mallParams=NOT find");
        }
      }
    }
    //console.log("mall.created: mallParams="+mallParams);
    Session.set("mallParams", mallParams);
    //this.subscription = Meteor.subscribe('Malls',Session.get("mallParams"));
  }.bind(this));
};

Template.mall.rendered = function () {
  // this.autorun(function () {
  //   if (!this.subscription.ready()) {
  //     IonLoading.show();
  //   } else {
  //     IonLoading.hide();
  //   }
  // }.bind(this));
};

Template.mall.helpers({
  mallname: function () {
    //console.log(Malls);
    var mall=Malls.findOne({index:Session.get("mallParams")});//(Session.get("SelectedMall"));
    return mall && mall.name;

    //console.log("mall name=???"+Meteor.call("mallname_md"));
    //return Meteor.call("mallname_md");
    //return (Malls.find().count());
  },
  mallabout: function () {
    var mall=Malls.findOne({index:Session.get("mallParams")});//(Session.get("SelectedMall"));
    return mall && mall.about;

    //console.log("mall about=???"+Meteor.call("mallabout_md"));
    //return Meteor.call("mallabout_md");
    //return (Malls.find().count());
  },
});
