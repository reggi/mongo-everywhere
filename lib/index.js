'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressMongoDb = require('express-mongo-db');

var _expressMongoDb2 = _interopRequireDefault(_expressMongoDb);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var MongoStore = (0, _connectMongo2['default'])(_expressSession2['default']);

exports['default'] = function (uri, secret) {
  var resave = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
  var saveUninitialized = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

  var router = _express2['default'].Router();
  // set express mongo allows for req.db
  router.use((0, _expressMongoDb2['default'])(uri));
  // set mongo db session
  router.use(function (req, res, next) {
    return (0, _expressSession2['default'])({
      secret: secret,
      store: new MongoStore({ db: req.db }),
      resave: resave,
      saveUninitialized: saveUninitialized
    })(req, res, next);
  });
  return router;
};

module.exports = exports['default'];