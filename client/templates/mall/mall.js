var mallParams = "0002";

Template.mall.created = function () {
  console.log("mall.created:"+Router.current().url);
  this.autorun(function () {
    var tmpmallParams = Router.current().params.query.mall;
    console.log("mall.created: tmpmallParams="+tmpmallParams);
    if(tmpmallParams)
    mallParams=tmpmallParams;
    console.log("mall.created: mallParams="+mallParams);
    this.subscription = Meteor.subscribe('Malls',mallParams);
  }.bind(this));
};

Template.mall.rendered = function () {
  console.log("mall.rendered:"+Router.current().url);
  var mallParams = Router.current().params.query.mall;
  console.log("mall.rendered:"+mallParams);

  //var controller=Router.current();
  //var params = controller.params;
  //console.log("mallid"+controller.params._id);

  // var waypoint = new Waypoint({
  //   element: document.getElementById('#waypoint'),
  //   handler: function(direction) {
  //     console.log('Scrolled to waypoint!')
  //   }
  // });

// ({
//   console.log ('req:' + req) ;
//   //var url = require('url');
//   //var querystring = require('querystring');
//   //var query = querystring.parse(url.parse(req.url).query);
//   var query = url.parse(req.url,true).query;
//   //console.log("mallid:"+query);
// })(jQuery);
//  this.autorun(function () {
//    if (!this.subscription.ready()) {
//      IonLoading.show();
//    } else {
//      IonLoading.hide();
//    }
//  }.bind(this));
};

Template.mall.helpers({
  mallname: function () {
    //console.log(Malls);
    var mall=Malls.findOne();//(Session.get("SelectedMall"));
    return mall && mall.name;

    //console.log("mall name=???"+Meteor.call("mallname_md"));
    //return Meteor.call("mallname_md");
    //return (Malls.find().count());
  },
  mallabout: function () {
    var mall=Malls.findOne();//(Session.get("SelectedMall"));
    return mall && mall.about;

    console.log("mall about=???"+Meteor.call("mallabout_md"));
    //return Meteor.call("mallabout_md");
    //return (Malls.find().count());
  },
});
