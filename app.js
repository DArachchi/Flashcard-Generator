var inquirer = require("inquirer");

var count = 0;

function BasicCard(front, back) {
	this.front = front;
	this.back = back;
	this.askQuestion = function() {
		if (count < basicCards.length) {
			inquirer.prompt([
			{
				name: "question",
				message: this.front
			}
			]).then(function(answer) {
				if(answer.question === basicCards[count].back) {
					console.log("Correct!");
				} else {
					console.log("Incorrect. The correct answer is: " + basicCards[count].back + ".");
				}
				console.log("******************");
				count++;
				basicCards[count].askQuestion();
			})
		} else {
			console.log("All questions have been asked.");
		}
	}
	this.showAnswer = function() {
		console.log(this.back);
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
			} else {
				clozeCards[count].showAnswer();
			}
			console.log("******************");
			count++;
			if (count < clozeCards.length) {
				clozeCards[count].askQuestion();
			} else {
				console.log("All questions have been asked.");
			}
		})
	}
	this.showAnswer = function() {
		console.log("Incorrect.\r\n" + this.text1 + this.cloze + this.text2);
	}
}

function startBasic() {
	count = 0;
	if (count === basicCards.length) {
		console.log("All questions have been asked.");
	} else {
		basicCards[count].askQuestion();
	}
}

function startCloze() {
	count = 0;
	clozeCards[count].askQuestion();
}


var basicCards = [
	basic1 = new BasicCard("Who was the first president of the United States of America?", "George Washington"),
	basic2 = new BasicCard("Who invented the incadescent lightbulb?", "Thomas Edison")
]	

var clozeCards = [
	cloze1 = new ClozeCard("George ", " was the first president of the United States of America.", "Washington"),
	cloze2 = new ClozeCard("Thomas ", " is credited with the invention of the incadescent lightbulb.", "Edison")
]

startCloze();