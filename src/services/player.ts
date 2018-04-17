import {Player} from "../models/player";
import {DatabaseProvider} from "../database/index";
import { getRepository } from "typeorm";

export class PlayerService {
    public async getById(id: number) : Promise<Player> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Player).findOneById(id);
    }

    public async create(player : Player) {
        const newPlayer = player;
        newPlayer.playerName = player.playerName;
        newPlayer.playerScore = player.playerScore;

        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Player).save(newPlayer);
    }

    public async list() : Promise<Player[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Player).find();
    }

    public async update(player: Player) : Promise<Player> {
        const connection = await DatabaseProvider.getConnection();
        const repository = connection.getRepository(Player);
        const entity = await repository.findOneById(player.id);
        entity.playerName = player.playerName;
        entity.playerScore = player.playerScore;

        return await repository.save(entity);
    }

    public async delete(id: number) : Promise<void> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(Player).removeById(id);
    }
}

export const playerService = new PlayerService();