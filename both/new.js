Malls = new Mongo.Collection("malls");
Shops = new Mongo.Collection("shops");
Preferences = new Mongo.Collection("preferences");
UserDataExts = new Mongo.Collection("userDataExts");

if (Meteor.isClient) {
  Session.setDefault("mallParams", "0001");
  Meteor.subscribe("Malls");
  Meteor.subscribe("Shops");
  Meteor.subscribe("Preferences");
  Meteor.subscribe("UserDataExts");
}

// On server startup, create some data if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Malls.find().count() === 0) {
      Malls.insert({
        name: "N道口华联",
        address: "学院路xxx号",
        phone: "010-12345678",
        mail: "ndkhn@hn.com",
        about: "宇宙的中心，周边学校众多，人流量大",
        index:"0001",
        createdAt:new Date()
      });
      Malls.insert({
        name: "喜隆多购物中心",
        address: "金顶路xxx号",
        phone: "010-87654321",
        mail: "xldgwzx@xld.com",
        about: "石景山，周边住宅多，社区大",
        index:"0002",
        createdAt:new Date()
      });
    }

    // if (Shops.find().count() === 0) {
    //   Shops.insert({
    //     name: "大众影城",
    //     address: "5楼27号",
    //     phone: "14012345678",
    //     mail: "14012345678@139.com",
    //     about: "最新大片",
    //     type: "影视",
    //     index:"0001",
    //     mallindex:"0001",
    //     createdAt:new Date()
    //   });
    //   Shops.insert({
    //     name: "百花影城",
    //     address: "3楼12号",
    //     phone: "14187654321",
    //     mail: "14187654321@139.com",
    //     about: "文艺小清新",
    //     type: "影视",
    //     index:"0002",
    //     mallindex:"0002",
    //     createdAt:new Date()
    //   });
    //   Shops.insert({
    //     name: "香锅53度",
    //     address: "2楼11号",
    //     phone: "14053535353",
    //     mail: "14053535353@139.com",
    //     about: "好想吃啊！！！",
    //     type: "餐饮",
    //     index:"0003",
    //     mallindex:"0001",
    //     createdAt:new Date()
    //   });
    //   Shops.insert({
    //     name: "甜蜜蜜蛋糕",
    //     address: "1楼36号",
    //     phone: "14136363636",
    //     mail: "14136363636@139.com",
    //     about: "蛋糕-生活",
    //     type: "餐饮",
    //     index:"0004",
    //     mallindex:"0002",
    //     createdAt:new Date()
    //   });
    // }
    //
    // if (Preferences.find().count() === 0) {
    //   Preferences.insert({
    //     name: "半价看<<一路梨花>>",
    //     //name: "大众影城",
    //     about: "最新大片<<一路梨花>>，影院周年庆",
    //     type: "影视",
    //     shopindex:"0001",
    //     mallindex:"0001",
    //     createdAt:new Date()
    //   });
    //   Preferences.insert({
    //     name: "科幻片午夜怀旧专场",
    //     //name: "百花影城",
    //     about: "星球大战-<<新希望>><<帝国反击战>><<绝地归来>>",
    //     type: "影视",
    //     shopindex:"0002",
    //     mallindex:"0002",
    //     createdAt:new Date()
    //   });
    //   Preferences.insert({
    //     name: "会员卡特惠",
    //     //name: "香锅53度",
    //     about: "会员卡充100元送30元",
    //     type: "餐饮",
    //     shopindex:"0003",
    //     mallindex:"0001",
    //     createdAt:new Date()
    //   });
    //   Preferences.insert({
    //     name: "轮子蛋糕买一赠一",
    //     //name: "甜蜜蜜蛋糕",
    //     about: "新品上市：轮子蛋糕",
    //     type: "餐饮",
    //     shopindex:"0004",
    //     mallindex:"0002",
    //     createdAt:new Date()
    //   });
    //
    //   Preferences.insert({
    //     name: "青春记忆专场",
    //     //name: "百花影城",
    //     about: "<<三傻大闹宝莱坞>><<同桌的妳>>",
    //     type: "影视",
    //     shopindex:"0002",
    //     mallindex:"0002",
    //     createdAt:new Date()
    //   });
    // }

  });
}


//if (Meteor.isServer) {

// At the bottom of simple-todos.js, outside of the client-only block
Meteor.methods({
   mallname_md : function () {
     //console.log( Meteor.userId() + "OOOOO" + taskId);
     //console.log("name="+Malls.findOne().name);
     //return (Malls.find().count());
     return (Malls.findOne().name);
     //return ("name");
   },
   mallabout_md : function () {
     //console.log( Meteor.userId() + "OOOOO" + taskId);
     //console.log("about="+Malls.findOne().about);
     //return (Malls.find().count());
     return (Malls.findOne().about);
     //return ("about");
   },
   shops_insert : function (varlist) {
     return(Shops.insert(varlist));
   },
   preferences_insert : function (varlist) {
     return(Preferences.insert(varlist));
   },
   Uploads_insert : function (fo) {
     var fileObj = Uploads.insert(fo);
     //console.log("fileObj="+fileObj);
     return(fileObj);
   },
   userlocation_set:function(location,userID) {
     if(UserDataExts.find({userID: userID}).count()){
       //console.log("update location="+location+" userID="+userID);
       if(UserDataExts.findOne({userID: userID}).location===location)
       ;
       else
       ( UserDataExts.update({userID: userID},{$set:{location:location,updatedAt:new Date()}}) );
       return 1;
     }
     else {
       //console.log("insert location="+location+" userID="+userID);
       ( UserDataExts.insert({userID : userID,location : location,access : 1,type : 1,createdAt:new Date(),updatedAt:new Date()}) );
       return 1;
     }
   },
});
//}


// At the bottom of simple-todos.js
if (Meteor.isServer) {
  Meteor.publish("UserDataExts", function () {
    //return UserDataExts.find();
    if (this.userId) {
      //console.log("UserDataExts this.userId="+this.userId);
      return UserDataExts.find({userID:this.userId});
    }
    else {
      console.log("UserDataExts Meteor.userId()="+"UNDEFINE");
      this.ready();
    }
  });
  Meteor.publish("Malls", function () {
    return Malls.find({});
  });
  Meteor.publish("Shops", function () {
    return Shops.find({});
  });
  // Meteor.publish("Shopdetails", function (id) {
  //   return Shops.find({_id:id});
  // });
  Meteor.publish("Preferences", function () {
    return Preferences.find({});
  });
};
