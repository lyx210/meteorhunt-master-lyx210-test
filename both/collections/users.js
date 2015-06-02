Meteor.users.before.insert(function (userId, doc) {
  //doc.profile.votedProductIds = [];
  //doc.profile = [{"votedProductIds":""}];
  // doc.profile.votedProductIds = [];
  // doc.votedProductIds = [];

  doc.profile = {"votedProductIds":[],"mallParams":"0001"};//ok
  //doc.mallParams = "0001"


  //doc.profile = {"votedProductIds":""};
  ////doc.profile = [];
  ////doc.profile["votedProductIds"]=[];
});

Meteor.users.helpers({
  votedProducts: function () {
    //return Products.find();
    return Products.find({_id: {$in: this.profile.votedProductIds}});
  }
});
