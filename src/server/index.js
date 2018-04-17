"use strict";
exports.__esModule = true;
var restify = require("restify");
var index_1 = require("../controllers/index");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.prototype.get = function (url, reqHandler) {
        this.addRoute("get", url, reqHandler);
    };
    Server.prototype.post = function (url, reqHandler) {
        this.addRoute("post", url, reqHandler);
    };
    Server.prototype.del = function (url, reqHandler) {
        this.addRoute("del", url, reqHandler);
    };
    Server.prototype.put = function (url, reqHandler) {
        this.addRoute("put", url, reqHandler);
    };
    Server.prototype.addRoute = function (method, url, reqHandler) {
        this.restify[method](url, reqHandler);
        console.log("Added route ${method.toUpperCase()} ${url}");
    };
    Server.prototype.start = function (port) {
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.queryParser());
        this.restify.use(restify.plugins.bodyParser());
        this.addControllers();
        this.restify.listen(port, function () { return console.log("Server is up and running on port " + port); });
    };
    Server.prototype.addControllers = function () {
        var _this = this;
        index_1.CONTROLLERS.forEach(function (controller) { return controller.initialize(_this); });
    };
    return Server;
}());
exports.Server = Server;
