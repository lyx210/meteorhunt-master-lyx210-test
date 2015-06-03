/**
 * Created by zhongbq on 2015/5/26.
 */
var fileObjects = [];

Template.prefset.created = function () {
  this.autorun(function () {
    //console.log("pref set !!!");
    //console.log("Router.current().params._id");
    //console.log(Router.current().params._id);
    fileObjects = [];
  }.bind(this));

  //console.log('prefset create ')
  //console.log(this);
};

Template.prefset.events({
    //'click [data-action=sign-out]': function (event, template) {
    //  console.log("cancel !!!");
    //},
    'click [data-dismiss=modal]': function (event, template) {
      //console.log("cancel !!!");
      fileObjects = [];
    },
    'click .ion-android-camera': function (evevt, template) {
        MeteorCamera.getPicture({width: 1024, height: 768, quality: 100}, function (e, r) {
            if (e) {
                ;//console.log(e);
            } else {
                var newFile = new FS.File();
                newFile.attachData(r, {type: 'image/jpeg'});
                $("#previewImageList").append("<img src='" + r + "' class=\"padding preview-image\"  style=\"width:100px;height:100px;\" ></img>");
                fileObjects.push(newFile);
            }
        });
    },
    //本组件是不会重复选择相同文件的
    //HTML5的 File API允许浏览器访问本地文件系统，借助它我们可以实现以前无法实现的本地图片预览功能
    //http://www.w3.org/TR/2009/WD-FileAPI-20091117/描述的非常细致
    //http://blog.csdn.net/cdnight/article/details/26351129为简单介绍
      // 'change .fileInput': function (evevt, template) {
      //    FS.Utility.eachFile(event, function (file) {
      //       var newFile = new FS.File(file);
      //       //console.log(newFile);
      //       fileObjects.push(newFile);
      //       var reader = new FileReader();
      //       reader.onload = function (e) {
      //           $("#previewImageList").append("<img src='" + this.result + "' class=\"padding preview-image\"></img>");
      //       }
      //       reader.readAsDataURL(file);
      //   });
      // }

      'click .fileNewupload': function (event, template) {
          //console.log("click on fileNewupload");
          //console.log(event.offsetX+" "+event.offsetY);
          //console.log(event.pageX+" "+event.pageY);
          //console.log(event.screenX+" "+event.screenY);
          if(((event.offsetX===0)&&(event.offsetY===0))&&((event.pageX===0)&&(event.pageY===0))&&((event.screenX===0)&&(event.screenY===0)))
          {
            //全0表示该click是点击其他控件调用的，可以执行
            ;
          }
          else
          {
            //点击file控件本身导致的调用，不执行
            event.preventDefault();
          }
      },
      'click .ion-android-image': function (event, template) {
          //console.log("call fileNewupload.click()");
          //console.log(event);
          fileNewupload.click(event, template);
          //event.preventDefault();
      },
      'change .fileNewupload': function (evevt, template) {
        //console.log("enter fileNewupload.change()");
        FS.Utility.eachFile(event, function (file) {
            var newFile = new FS.File(file);
            //console.log(newFile);
            fileObjects.push(newFile);
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#previewImageList").append("<img src='" + this.result + "' class=\"padding preview-image\"  style=\"width:100px;height:100px;\" ></img>");
            }
            reader.readAsDataURL(file);
        });
      },

      'submit form': function (event, template) {
        event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
         var name = template.$('[name=name]').val();
         var about = template.$('[name=about]').val();
        var fileIds = [];
        //IonLoading.show({customTemplate: '<h3>Loading…</h3><p>正在上传照片，请稍候....</p>'});
        _.each(fileObjects, function (fo) {
            //console.log("fo="+fo);
            //Meteor.call("Uploads_insert",fo);
            //var fileObj = Meteor.call("Uploads_insert",fo);
            var fileObj = Uploads.insert(fo);
            //var fileObj = prefset_insertpci(fo);
            //var fileObj;
            //console.log("fileObj="+fileObj);
            if (fileObj) {
                //console.log("fileObj=have id");
                fileIds.push(fileObj._id);
            }
        });
        fileObjects = [];
        //fileObjects.

        //console.log("name="+name);
        //console.log("Preferences="+Preferences.findOne().name);
        //console.log("about="+about);
        Meteor.call("preferences_insert",{
            name: name,
            about: about,
            //type: "餐饮",
            type:Shops.findOne({_id:Router.current().params._id}).type,
            shopindex:Shops.findOne({_id:Router.current().params._id}).index,
            mallindex:Session.get("mallParams"),
            //mallindex:"0002",
            shopId:Router.current().params._id,
            fileIds: fileIds,
            createdAt:new Date()
        });
        //IonLoading.hide();
        IonModal.close();
        // IonPopup.alert({
        //     title: '提示',
        //     template: '优惠添加成功！',
        //     okText: '关闭'
        // });
        Router.go("/shop/"+Router.current().params._id);
      }
});
