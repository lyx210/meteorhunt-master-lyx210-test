/**
 * Created by zhongbq on 2015/5/26.
 */
var shopsetfileObjects = [];

Template.shopset.created = function () {
  this.autorun(function () {
    shopsetfileObjects = [];
  }.bind(this));
};

Template.shopset.events({
    'click [data-dismiss=modal]': function (event, template) {
      shopsetfileObjects = [];
    },
    'click .ion-android-camera': function (evevt, template) {
        MeteorCamera.getPicture({width: 1024, height: 768, quality: 100}, function (e, r) {
            if (e) {
                ;//console.log(e);
            } else {
                var newFile = new FS.File();
                newFile.attachData(r, {type: 'image/jpeg'});
                $("#previewImageList").append("<img src='" + r + "' class=\"padding preview-image\" style=\"width:100px;height:100px;\" > </img>");
                shopsetfileObjects.push(newFile);
            }
        });
    },
    //本组件是不会重复选择相同文件的
    //HTML5的 File API允许浏览器访问本地文件系统，借助它我们可以实现以前无法实现的本地图片预览功能
    //http://www.w3.org/TR/2009/WD-FileAPI-20091117/描述的非常细致
    //http://blog.csdn.net/cdnight/article/details/26351129为简单介绍
    //ion-android-image
    // 'change .fileInput': function (evevt, template) {
    //      FS.Utility.eachFile(event, function (file) {
    //         var newFile = new FS.File(file);
    //         //console.log(newFile);
    //         shopsetfileObjects.push(newFile);
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             $("#previewImageList").append("<img src='" + this.result + "' class=\"padding preview-image\"></img>");
    //         }
    //         reader.readAsDataURL(file);
    //     });
    // },

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
            shopsetfileObjects.push(newFile);
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#previewImageList").append("<img src='" + this.result + "' class=\"padding preview-image\" style=\"width:100px;height:100px;\" ></img>");
            }
            reader.readAsDataURL(file);
        });
    },
    'submit form': function (event, template) {
        event.preventDefault();//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
         var name = template.$('[name=name]').val();
         var address = template.$('[name=address]').val();
         var phone = template.$('[name=phone]').val();
         var mail = template.$('[name=mail]').val();
         var about = template.$('[name=about]').val();
         var type = template.$('[name=type]').val();
        var fileIds = [];
        //IonLoading.show({customTemplate: '<h3>Loading…</h3><p>正在上传照片，请稍候....</p>'});
        _.each(shopsetfileObjects, function (fo) {
            var fileObj = Uploads.insert(fo);
            if (fileObj) {
                fileIds.push(fileObj._id);
            }
        });
        shopsetfileObjects = [];

        Meteor.call("shops_insert",{
          // name: "甜蜜蜜蛋糕",
          // address: "1楼36号",
          // phone: "14136363636",
          // mail: "14136363636@139.com",
          // about: "蛋糕-生活",
          // type: "餐饮",
          // index:"0004",
          // mallindex:"0002",
          // createdAt:new Date()
          name: name,
          address: address,
          phone: phone,
          mail: mail,
          about: about,
          type: type,
          index:"FFFF",
          mallindex:Session.get("mallParams"),
          fileIds: fileIds,
          createdAt:new Date()
        });
        //IonLoading.hide();
        IonModal.close();
        // IonPopup.alert({
        //     title: '提示',
        //     template: '新建成功！',
        //     okText: '关闭'
        // });
        Router.go("/shop");
    }
});
