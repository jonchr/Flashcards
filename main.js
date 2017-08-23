//Imports BasicCard object, ClozeCard object, Object stored in database, and inquirer
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var database = require("./database.js");
var inquirer = require("inquirer");

//Asks for the subject and card type
inquirer.prompt([{

    type: "list",
    message: "What would you like to study?",
    choices: Object.keys(database), //pulls the various subjects stored in database
    name: "subject"

}, {

    type: "list",
    message: "What type of cards would you like to use to study?",
    choices: ["Basic", "Cloze"],
    name: "cardType"

}]).then(function(response) {

    //Loads database Info
    infoArray = database[response.subject];

    //Creates the array of cards
    var cardsArray;
    if (response.cardType === "Basic") {
        cardsArray = createBasicCards(infoArray);
    }
    else {
        cardsArray = createClozeCards(infoArray);
    }

    //Asks the questions
    askQuestion(cardsArray, 0);

});

//creates and returns an array of basic cards based off info in the passed array
function createBasicCards(array) {

    //Comes up with a random order to create cards
    var randomArray = randomize(array.length);
    //Card array to hold card
    var cards = [];

    //Using randomArray's order, creates and pushes basic cards to the cards array
    for (var i = 0; i < array.length; i++) {
        var randNum = randomArray[i];
        cards.push(new BasicCard(array[randNum].basicText, array[randNum].answer));
    }

    return cards;
}

//creates and returns an array of cloze cards based off info in the passed array
function createClozeCards(array) {

    //Comes up with a random order to create cards
    var randomArray = randomize(array.length);
    //Card array to hold card
    var cards = [];

    //Using randomArray's order, creates and pushes basic cards to the cards array
    for (var i = 0; i < array.length; i++) {
        var randNum = randomArray[i];
        cards.push(new ClozeCard(array[randNum].clozeText, array[randNum].answer));
    }

    return cards;
}

//Creates an array ordered [0, 1, 2, 3, ... , length-1];
function randomize(length) {
    
    var orderedArray = [];
    for (var i = 0; i < length; i++) {
        orderedArray.push(i);
    }

    var chaosArray = [];
    //runs through ordered array, splicing a random position and pushing it to chaosArray
    for (var i = 0; i < length; i++) {
        var randomNum = Math.floor(Math.random() * orderedArray.length);
        chaosArray.push(orderedArray.splice(randomNum, 1)[0]);
    }
    return chaosArray;
}

//Asks the index number question in cardArray
function askQuestion(cardArray, index) {
    //Extracts the question and answer based on whether it's a Basic or Cloze card
    var question = cardArray[index] instanceof BasicCard ? cardArray[index].front : cardArray[index].partialText
    var answer = cardArray[index] instanceof BasicCard ? cardArray[index].back : cardArray[index].cloze

    inquirer.prompt({ //Asks the question

        type: "confirm",
        message: question + " (enter 'N' to stop)",
        name: "continue",
        default: true

    }).then(function(response) {
        //Logs the answer
        console.log(answer + "\n");
        //If they answered yes and there's another question, asks the next question
        if (response.continue && index < cardArray.length - 1) askQuestion(cardArray, index + 1);
        else console.log("You're done for now! Come back to study something else!\n");
    })
}