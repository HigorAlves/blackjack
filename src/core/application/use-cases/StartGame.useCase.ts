import {Game} from "@/core/domain/game/entity/Game.entity";

export class StartGame {
	constructor(private game: Game) {}

	execute(): void {
		this.game.start();
	}
}
