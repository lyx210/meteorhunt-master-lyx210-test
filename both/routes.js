Router.route('/trending', {
//Router.route('/', {
  name: 'trending'
});

Router.route('/recent', {
  name: 'recent'
});

Router.route('/products/:_id', {
  name: 'products.show'
});

Router.route('/users/:_id', {
  name: 'users.show'
});

Router.route('/notifications', {
  name: 'notifications'
});

Router.route('/profile', {
  name: 'profile'
});


Router.route('/', {
//Router.route('/mall', {
  name: 'mall'
});

// Router.route('/:_id', {
// //Router.route('/mall', {
//   name: 'mall'
// });

Router.route('/shop', {
  name: 'shop'
});
Router.route('/shop/:_id', {
  name: 'shopDetail'
});

Router.route('/preference', {
  name: 'preference'
});

Router.route('/prefset', {
  name: 'prefset'
});
