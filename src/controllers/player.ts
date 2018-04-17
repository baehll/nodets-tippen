import {Controller} from "./controller";
import {HttpServer} from "../server/httpServer";
import {Request, Response} from "restify";
import { playerService } from "../services/player";

export class PlayerController implements Controller {
    public initialize(httpServer: HttpServer) : void {
        //httpServer.get("/players", this.list.bind(this));
        //httpServer.get("/players/:id", this.getById.bind(this));
        httpServer.post("/player", this.create.bind(this));
        httpServer.put("/player/:id", this.update.bind(this));
        httpServer.del("/player/:id", this.remove.bind(this));
    }

    private async list(req: Request, res: Response): Promise<void> {
        res.send(await playerService.list());
    }
    private async getById(req: Request, res: Response): Promise<void> {
        const player = await playerService.getById(req.params.id);
        res.send(player ? 200 : 404, player);
    }
    private async create(req: Request, res: Response): Promise<void> {
        res.send(await playerService.create(req.body));
    }
    private async update(req: Request, res: Response): Promise<void> {
        res.send(await playerService.update({...req.body, id: req.params.id}))
    }
    private async remove(req: Request, res: Response): Promise<void> {
        res.send(await playerService.delete(req.params.id));
    }
}