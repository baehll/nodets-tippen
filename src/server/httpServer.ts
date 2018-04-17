import {RequestHandler} from "restify";

export interface HttpServer{
    get(url: String, requestHandler: RequestHandler): void;
    post(url: String, requestHandler: RequestHandler): void;
    del(url: String, requestHandler: RequestHandler): void;
    put(url: String, requestHandler: RequestHandler): void;
}