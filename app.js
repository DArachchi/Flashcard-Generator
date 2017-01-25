var inquirer = require("inquirer");

var count = 0;
var score = 0;

function BasicCard(front, back) {
	this.front = front;
	this.back = back;
	this.askQuestion = function() {
		inquirer.prompt([
		{
			name: "question",
			message: this.front
		}
		]).then(function(answer) {
			if(answer.question === basicCards[count].back) {
				console.log("Correct!");
				score++;
			} else {
				console.log("Incorrect. The correct answer is: " + basicCards[count].back + ".");
			}
			console.log("******************");
			count++;
			if (count < basicCards.length) {
				basicCards[count].askQuestion();
			} else {
			finishGame();
			}
		})
	}
}

function ClozeCard(text1, text2, cloze) {
	this.text1 = text1;
	this.text2 = text2;
	this.cloze = cloze;
	this.askQuestion = function() {
		inquirer.prompt([
		{
			name: "question",
			message: this.text1 + "..." + this.text2,
		}
		]).then(function(answer) {
			if(answer.question === clozeCards[count].cloze) {
				console.log("Correct!");
				score++;
			} else {
				console.log("Incorrect!");
			}
			clozeCards[count].showAnswer();
			console.log("******************");
			count++;
			if (count < clozeCards.length) {
				clozeCards[count].askQuestion();
			} else {
				finishGame();
			}
		})
	}
	this.showAnswer = function() {
		console.log(this.text1 + this.cloze + this.text2);
	}
}

function startGame() {
	count = 0;
	score = 0;
	inquirer.prompt([
		{
			type: "list",
			message: "Pick a type of flashcard to use:",
			choices: ["Basic Card", "Cloze Card"],
			name: "cardtype"
		}
	]).then(function(input) {
		if (input.cardtype === "Basic Card") {
			basicCards[count].askQuestion();
		}
		if (input.cardtype === "Cloze Card") {
			clozeCards[count].askQuestion();
		}
	})
}

function finishGame() {
	inquirer.prompt([
		{
			type: "confirm",
			message: "Your answered " + score + " question(s) correctly! Would you like to play again?",
			name: "confirm",
			default: true
		}
	]).then(function(input) {
		if (input.confirm == true) {
			startGame();
		} else {
			return;
		}
	})
}

var basicCards = [
	basic1 = new BasicCard("Who was the first president of the United States of America?", "George Washington"),
	basic2 = new BasicCard("Who invented the incadescent lightbulb?", "Thomas Edison"),
	basic3 = new BasicCard("In 1807, what act prohibited all foreign trade.", "Embargo Act"),
	basic4 = new BasicCard("What religious sect hoped to 'purify' the Anglican church of Roman Catholic traces in practice and organization?", "Puritans"),
	basic5 = new BasicCard("What proper adjective was used to describe World War I at the time of the war?", "Great")
]	

var clozeCards = [
	cloze1 = new ClozeCard("George ", " was the first president of the United States of America.", "Washington"),
	cloze2 = new ClozeCard("Thomas ", " is credited with the invention of the incadescent lightbulb.", "Edison"),
	cloze3 = new ClozeCard("In 1807, the ", " Act prohibited all foreign trade.", "Embargo"),
	cloze4 = new ClozeCard("The ", " were a religious sect who hope to 'purify' the Anglican church of Roman Catholic traces in practice and organization.", "Puritans"),
	cloze5 = new ClozeCard("The ", " War was the term used to describe World War I at the time of the war.", "Great"),
]

startGame();