import {Card} from "@/core/domain/deck/value-object/card/Card.vo";
import {Game} from "@/core/domain/game/entity/Game.entity";

export type CardDTO = {
	suit: string;
	value: string;
	display: string;
};

export type GameStateDTO = {
	status: string;
	winner: 'player' | 'dealer' | 'draw' | null;
	player: {
		cards: CardDTO[];
		score: number;
		isStanding: boolean;
		isBust: boolean;
		hasBlackjack: boolean;
	};
	dealer: {
		cards: CardDTO[];
		score: number;
		isBust: boolean;
		hasBlackjack: boolean;
		hideSecondCard: boolean;
	};
};

const mapCard = (card: Card): CardDTO => ({
	suit: card.suit,
	value: card.value,
	display: card.toString(),
});

export const createGameStateDTO = (game: Game): GameStateDTO => {
	const player = game.getPlayer();
	const dealer = game.getDealer();

	const playerCards = player.getHand().getCards().map(mapCard);
	const dealerCardsRaw = dealer.getHand().getCards();
	const hideSecondCard = !game.isFinished();

	const dealerCards = hideSecondCard
		? [mapCard(dealerCardsRaw[0]), { suit: 'Hidden', value: 'Hidden', display: '🂠' }]
		: dealerCardsRaw.map(mapCard);

	return {
		status: game.getStatus(),
		winner: game.isFinished() ? game.getWinner() : null,
		player: {
			cards: playerCards,
			score: player.getBestScore(),
			isStanding: player.isStanding(),
			isBust: player.isBust(),
			hasBlackjack: player.hasBlackjack(),
		},
		dealer: {
			cards: dealerCards,
			score: dealer.getBestScore(),
			isBust: dealer.isBust(),
			hasBlackjack: dealer.hasBlackjack(),
			hideSecondCard,
		},
	};
};
