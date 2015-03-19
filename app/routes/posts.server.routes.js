'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var posts = require('../../app/controllers/posts.server.controller');

	// Posts Routes
	app.route('/posts')
        .get(posts.list)
		.post(users.requiresLogin, posts.create);

	app.route('/posts/:postId')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update);

    app.route('/posts/:postId/interested')
        .post(users.requiresLogin, posts.hasAuthorization, posts.addInterest);

    app.route('/posts/:postId/remove')
        .put(users.requiresLogin, posts.hasAuthorization, posts.setInactive);

	// Finish by binding the Post middleware
	app.param('postId', posts.postByID);
};
