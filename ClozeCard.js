
function ClozeCard (text, cloze) {

	if(!(this instanceof ClozeCard)) return new ClozeCard(text, cloze);

	//the entire text
	this.fullText = text; 
	//the cloze text e.g. GW
	this.cloze = cloze;

	//The partial phrase without the cloze.
	//Throws and error if the cloze doesn't appear in the text
	if(text.indexOf(cloze) === -1) {
		return console.log("Error; Cloze does not appear in phrase");
	}
	else {
		this.partialText = text.replace(this.cloze, "...");	
	}

}

module.exports = ClozeCard;
