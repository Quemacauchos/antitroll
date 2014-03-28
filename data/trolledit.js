
// Troll box
var textArea     = document.getElementById("trollbox");
var buttonSave   = document.getElementById("buttonsave");
var buttonCancel = document.getElementById("buttoncancel");


buttonSave.addEventListener('click', function onClick(event) {
    var text   = textArea.value.trim();
    var trolls = text.replace(/(\r\n|\n|\r)/gm,",").toLowerCase();
    trolls     = trolls.split(',').sort().join(',');
    self.port.emit("save", trolls);
}, false);

buttonCancel.addEventListener('click', function onClick(event) {
    self.port.emit("cancel");
}, false);


// On ready set focus on edit box
self.port.on("show", function onShow(names) {
	console.log("------------------------------------------------------------");
	console.log("EDIT");
	console.log("------------------------------------------------------------");
	console.log(names);
	var trolls = names.split(",").join("\n");
	textArea.value = trolls;
	textArea.focus();
});

// END