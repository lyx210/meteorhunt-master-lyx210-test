/**
 * Created by zhongbq on 2015/5/26.
 */

var uploadsStore = new FS.Store.FileSystem("uploads", {path:'d:/temp'/*'~/temp'*/});
var thumbStore = new FS.Store.FileSystem("thumbs", {
    path: 'd:/temp/thumbs'/*'~/temp/thumbs'*/,
beforeWrite: function (fileObj) {
    // We return an object, which will change the
    // filename extension and type for this store only.
    return {
        extension: 'png',
        type: 'image/png'
    };
},
transformWrite: function (fileObj, readStream, writeStream) {
    // Transform the image into a 120x120px PNG thumbnail
    //gm(readStream).resize('120','120').stream('PNG').pipe(writeStream);
    gm(readStream,fileObj.name()).resize('120','120').stream('PNG').pipe(writeStream);
    // The new file size will be automatically detected and set for this store
}
});
Uploads = new FS.Collection("uploads", {
    stores: [
        uploadsStore,
        thumbStore
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

if (Meteor.isClient) {
  Meteor.subscribe("Uploads");
}

if (Meteor.isServer) {
  Meteor.publish("Uploads", function () {
    return Uploads.find();
  });
}

// In a file loaded on the server (ignored on the client)
Uploads.allow({
  insert: function () {
    // can only create posts where you are the author
    return true;
  },
  remove: function () {
    // can only delete your own posts
    return true;
  },
  update: function () {
    // can only delete your own posts
    return true;
  },
  download: function() {
    return true;
  },
});

//Shares  = new Mongo.Collection("shares");
