import GameState from "./simulation/GameState";

declare global {
    interface Window {
        gameState: GameState
    }
}