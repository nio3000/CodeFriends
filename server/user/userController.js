'use strict';

var models = require('../models.js').models;

var userController = {};

/**
 * Create User
 */
userController.post = function (req, res) {

  // console.log(req.body);
  var username = req.body.username;
  var githubId = req.body.githubId;
  var githubName = req.body.githubName;
  var githubEmail = req.body.githubEmail;
  var githubLocation = req.body.githubLocation;
  var githubAccessToken = req.body.githubAccessToken;
  var githubAvatarUrl = req.body.githubAvatarUrl;

  if (!username || !githubId || !githubName || !githubEmail ||
    !githubLocation || !githubAccessToken || !githubAvatarUrl
  ) {
    res.status(400).end();
  }
  new models.User({
      username: username,
      githubId: githubId,
      githubName: githubName,
      githubEmail: githubEmail,
      githubLocation: githubLocation,
      githubAccessToken: githubAccessToken,
      githubAvatarUrl: githubAvatarUrl
    })
    .save()
    .then(function (model) {
      res.json(model.toJSON());
    });
};

/////////////////////////////////////////    GET    /////////////////////////////////////////
userController.getAllUsers = function (req, res) {
  models.User
    .fetchAll({
      withRelated: ['project']
    })
    .then(function (coll) {
      res.json(coll.toJSON()).end();
    });
};

//CHANGE TO GET BY USERNAME OR ID
userController.getSpecificUser = function (req, res) {
  models.User
    .query('where', 'username', '=', req.params.username)
    .fetch({
      withRelated: ['project']
    })
    .then(function (coll) {
      res.send(coll);
    });
};

//CHANGE TO GET BY USERNAME OR ID
userController.getSpecificUserById = function (req, res) {
  // models.User
  //  .query('where', 'username', '=', req.params.username)
  //  .fetch({
  //    withRelated: ['project']
  //  })
  //  .then(function (coll) {
  //    res.send(coll);
  //  });
};

/////////////////////////////////////////    PUT    /////////////////////////////////////////
userController.put = function (req, res) {
  res.status(200).end();
};

/////////////////////////////////////////    DELETE    /////////////////////////////////////////
userController.delete = function (req, res) {
  res.status(200).end();
};

module.exports = userController;