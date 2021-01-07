import GameEl from "../game/GameEl";
import Card from "./Card";
import EndScene from "../EndScene";

export default class GameScene extends GameEl {
	constructor(app, elementWrap, width, height) {
		super(elementWrap);
		this.$app = app;
		this.width = width;
		this.height = height;
		this.select = [];
		this.isSelected = false;
		this.opened = [];
		this.timer = 60;
		this.timerEnd = false;
		this.init();
	}

	init() {
		this.$title = document.createElement("h2");
		this.$timer = document.createElement("span");
		this.$cardsList = document.createElement("ul");
		this.cards = this.createdArrayNums(this.width, this.height);
		this.$cards = this.createCards(this.cards);

		this.$title.classList.add("game-title");
		this.$title.innerText = "Сouples Game v0.2";
		this.$timer.classList.add("game-timer");
		this.$timer.innerText = "Timer: " + this.timer;
		this.$cardsList.classList.add("card-list");

		this.$title.appendChild(this.$timer);

		this.$cards.forEach(($card) => {
			this.$cardsList.appendChild($card.$el);
			$card.$el.addEventListener("click", (event) => {
				event.preventDefault();
				if (!this.isSelected) {
					this.selectCard($card);
				} else {
					return;
				}
			});
		});

		this.timerFunc = setInterval(() => {
			if (this.timer === 0) {
				this.$timer.innerText = "Timer: " + this.timer;
				this.timerEnd = true;
				this.endGame();
				clearInterval(this.timerFunc);
			} else {
				this.timer--;
				this.$timer.innerText = "Timer: " + this.timer;
			}
		}, 1000);

		this.append([this.$title, this.$cardsList]);

		this.addApp();
	}

	selectCard($card) {
		const card = $card.selectCard();
		if (card) {
			this.select.push($card);
		} else {
			return;
		}
		if (this.select.length >= 2) {
			this.isSelected = true;
			this.isCompare();
		}
		this.endGame();
	}

	endGame() {
		if (this.isEnd()) {
			clearInterval(this.timerFunc);
			setTimeout(() => {
				this.destroy();
				this.createEndScene();
			}, 1000);
		}
	}

	createEndScene() {
		const endScene = new EndScene(this.$app, "menu-wrap");
	}

	isEnd() {
		if (
			this.opened.length === this.$cards.length ||
			this.timerEnd === true
		) {
			return true;
		} else {
			return false;
		}
	}

	isCompare() {
		if (this.select[0].$name.innerText === this.select[1].$name.innerText) {
			this.select[0].openCard = null;
			this.select[1].openCard = null;
			this.opened.push(this.select[0], this.select[1]);
			this.select = [];
			this.isSelected = false;
		} else {
			setTimeout(() => {
				this.select[0].openCard();
				this.select[1].openCard();
				this.select = [];
				this.isSelected = false;
			}, 1000);
		}
	}

	addApp() {
		this.$app.appendChild(this.$el);
	}

	createCards(arrayNum) {
		const $cards = [];

		arrayNum.forEach((item) => {
			const $card = new Card(item);
			$cards.push($card);
		});

		return $cards;
	}

	createdArrayNums(width, height) {
		const cards = [];
		const length = width * height;
		let numForCards = 1;
		for (let i = 1; i <= length; i = i + 2) {
			cards.push(numForCards);
			cards.push(numForCards);
			numForCards++;
		}

		return fisher(cards);

		function fisher(arr) {
			let j, temp;
			for (let i = arr.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				temp = arr[j];
				arr[j] = arr[i];
				arr[i] = temp;
			}
			return arr;
		}
	}
}
