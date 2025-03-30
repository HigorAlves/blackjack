import React from 'react';
import {CardDTO} from "@/core/application/dto/GameState.dto";
import { motion } from "motion/react"

const suitSymbols: Record<string, string> = {
	Hearts: '♥',
	Diamonds: '♦',
	Clubs: '♣',
	Spades: '♠',
	Hidden: '🂠',
};

const suitColors: Record<string, string> = {
	Hearts: 'text-red-500',
	Diamonds: 'text-red-500',
	Clubs: 'text-black',
	Spades: 'text-black',
	Hidden: 'text-gray-400',
};

export const CardView: React.FC<{ card: CardDTO }> = ({ card }) => {
	const symbol = suitSymbols[card.suit] || '?';
	const color = suitColors[card.suit] || 'text-black';

	return (
		<motion.div
			data-testid="card"
			initial={{ scale: 0.8, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 300 }}
		>
		<div data-testid="card" className="relative w-[60px] h-[90px] bg-white border border-gray-400 rounded-lg shadow-sm flex flex-col justify-between px-2 py-1">
			{card.display === '🂠' ? (
				<div className="flex items-center justify-center h-full text-3xl">🂠</div>
			) : (
				<>
					<div className={`text-sm font-semibold ${color}`}>{card.value}</div>
					<div className={`text-xl font-bold text-center ${color}`}>{symbol}</div>
					<div className={`text-sm font-semibold text-right ${color}`}>{card.value}</div>
				</>
			)}
		</div>
			</motion.div>
	);
};
