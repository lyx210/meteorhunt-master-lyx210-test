AccountsTemplates.configure({
  negativeValidation: false,
  negativeFeedback: false,
  positiveValidation: false,
  positiveFeedback: false,
});

// Template.signIn.events({
//   'click [data-action=sign-in]': function (event, template) {
//     Meteor.loginWithMeteorDeveloperAccount({}, function (error) {
//       if (error) {
//         alert(error);
//       } else {
//         IonModal.close();
//       }
//     });
//   }
// });

// AccountsTemplates.signIn.events({
//   'click [data-action=sign-in]': function (event, template) {
//     Meteor.loginWithMeteorDeveloperAccount({}, function (error) {
//       if (error) {
//         alert(error);
//       } else {
//         IonModal.close();
//       }
//     });
//   }
// });

AccountsTemplates.configureRoute('signIn', {
    redirect: function(error){
        // var user = Meteor.user();
        // if (user)
        //   Router.go('/user/' + user._id);        Meteor.loginWithMeteorDeveloperAccount({}, function (error) {
          if (error) {
            alert(error);
          } else {
            IonModal.close();
            //Router.go("/preference");
          }
          //testfor gib
    }
});

// AccountsTemplates.configureRoute('signIn', {
//     name: 'signin',
//     path: '/',
//     //template: 'myLogin',
//     //layoutTemplate: 'myLayout',
//     redirect: '/mall',
// });
