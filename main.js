var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var database = require("./database.js");
var inquirer = require("inquirer");

//Asks for the subject and card type
inquirer.prompt([{

    type: "list",
    message: "What would you like to study?",
    choices: ["history"], //to replace with subjects
    name: "subject"

}, {

    type: "list",
    message: "What type of card would you like to use?",
    choices: ["Basic", "Cloze"],
    name: "cardType"

}]).then(function(response) {
    console.log("Hi mom!");
    //Loads database Info
    infoArray = database[response.subject];

    var cardsArray;
    if (response.cardType === "Basic") {
        cardsArray = createBasicCards(infoArray);
    } else {
        cardsArray = createClozeCards(infoArray);
    }

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

function randomize(length) {
    //creates an array ordered [0, 1, 2, 3, ... , length-1];
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
        //If they answered yes, asks the next question
        if (response.continue) askQuestion(cardArray, index + 1);
    })
}