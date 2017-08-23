var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var database = require("./cardDatabase.");

//Asks 
inquirer.prompt([{	

    type: "list",
    question: "What would you like to study?",
    choices: ["subjects"], //to replace with subjects
    name: "subject"

}, {

    type: "list",
    question: "What type of card would you like to use?",
    choices: ["Basic", "Cloze"],
    name: "cardType"

}]).then(function(response) {

	//Loads database Info
	infoArray = database[response.subject];

	var cardsArray;
	if (response.cardType === "Basic") {
		cardsArray = createBasicCards(infoArray);
	}
	else {
		cardsArray = createClozeCards(infoArray);
	}
	


});

//creates and returns an array of basic cards based off info in the passed array
function createBasicCards(array) {

}


//creates and returns an array of cloze cards based off info in the passed array
function createClozeCards(array) {

}