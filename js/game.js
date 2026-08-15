// Test v0.1용 임시 game.js
// 최종 game.js는 모든 시스템이 완성된 후 다시 작성합니다.

import { getMoney } from "./stats.js";

export function startGame() {
    const money = getMoney();
    document.getElementById("game").textContent = `money: $${money}`;
}
