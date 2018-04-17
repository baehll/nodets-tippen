import {HttpServer} from "./httpServer";
import {RequestHandler, Server as RestifyServer} from "restify";
import * as restify from "restify";
import {PlayerController} from "../controllers/player";
import {CONTROLLERS} from "../controllers/index";

export class Server implements HttpServer{
    private restify: RestifyServer;

    public get(url: string, reqHandler: RequestHandler) : void {
        this.addRoute("get", url, reqHandler);
    }

    public post(url: string, reqHandler: RequestHandler) : void {
        this.addRoute("post", url, reqHandler);
    }

    public del(url: string, reqHandler: RequestHandler) : void {
        this.addRoute("del", url, reqHandler);
    }

    public put(url: string, reqHandler: RequestHandler) : void {
        this.addRoute("put", url, reqHandler);
    }

    private addRoute(method: "get"|"post"|"del"|"put", url: string, reqHandler: RequestHandler) : void {
        this.restify[method](url, reqHandler);
        console.log(`Added route ${method.toUpperCase()} ${url}`);
    }

    public start(port: number) : void {
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.queryParser());
        this.restify.use(restify.plugins.bodyParser());

        this.addControllers();
        
        this.restify.listen(port, () => console.log(`Server is up and running on port ${port}`));
    }

    private addControllers() : void {
        CONTROLLERS.forEach(controller => controller.initialize(this));
    }
}