import {Deck} from "@/core/domain/deck/entity/Deck.entity";
import {Player} from "@/core/domain/player/entity/Player.entity";
import {Dealer} from "@/core/domain/dealer/entity/Dealer.entity";

export type GameStatus = 'waiting' | 'in_progress' | 'player_standing' | 'finished';

export class Game {
	private deck: Deck;
	private player: Player;
	private dealer: Dealer;
	private status: GameStatus;

	constructor() {
		this.deck = new Deck();
		this.player = new Player();
		this.dealer = new Dealer();
		this.status = 'waiting';
	}

	start(): void {
		this.deck = new Deck(); // fresh deck
		this.player.reset();
		this.dealer.reset();
		this.status = 'in_progress';

		this.player.hit(this.deck.draw());
		this.dealer.getHand().addCard(this.deck.draw());

		this.player.hit(this.deck.draw());
		this.dealer.getHand().addCard(this.deck.draw());
	}

	playerHit(): void {
		if (this.status !== 'in_progress') return;
		this.player.hit(this.deck.draw());

		if (this.player.isBust()) {
			this.status = 'finished';
		}
	}

	playerStand(): void {
		if (this.status !== 'in_progress') return;

		this.player.stand();
		this.status = 'player_standing';

		this.dealer.play(this.deck);
		this.status = 'finished';
	}

	getPlayer(): Player {
		return this.player;
	}

	getDealer(): Dealer {
		return this.dealer;
	}

	getStatus(): GameStatus {
		return this.status;
	}

	isFinished(): boolean {
		return this.status === 'finished';
	}

	getWinner(): 'player' | 'dealer' | 'draw' | null {
		if (!this.isFinished()) return null;

		const playerBust = this.player.isBust();
		const dealerBust = this.dealer.isBust();

		if (playerBust) return 'dealer';
		if (dealerBust) return 'player';

		const playerScore = this.player.getBestScore();
		const dealerScore = this.dealer.getBestScore();

		if (playerScore > dealerScore) return 'player';
		if (dealerScore > playerScore) return 'dealer';
		return 'draw';
	}

	reset(): void {
		this.player.reset();
		this.dealer.reset();
		this.deck = new Deck();
		this.status = 'waiting';
	}
}
