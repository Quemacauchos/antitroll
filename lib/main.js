// Imports
var pageMod = require("sdk/page-mod");
var self    = require("sdk/self");
var panel   = require("sdk/panel");
var widget  = require("sdk/widget");
var prefs   = require("sdk/simple-storage");


console.log("------------------------------------------------------------"); 
console.log("MAIN"); 
console.log("------------------------------------------------------------");


// Init trolls
if(!prefs.storage.trolls){
	prefs.storage.trolls = "anel,cindy nero,cirilo gonzalez,dina,drogba,el pemon,ladi llin,redkidneybeans,ruben rivero,sherk";
}
var trolls  = prefs.storage.trolls;


// Pagemod for forums
pageMod.PageMod({
	include: "http://www.noticierodigital.com/forum/viewforum.php?f=*",
	contentStyleFile:  self.data.url("antitroll.css"),
	contentScriptFile: self.data.url("antitroll_forum.js"),
	contentScriptWhen: "ready",
	onAttach: function(worker) {
		worker.port.emit("init", trolls);
	}
});

// Pagemod for topics
pageMod.PageMod({
	include: "http://www.noticierodigital.com/forum/viewtopic.php?t=*",
	contentStyleFile:  self.data.url("antitroll.css"),
	contentScriptFile: self.data.url("antitroll_topic.js"),
	contentScriptWhen: "ready",
	onAttach: function(worker) {
		worker.port.emit("init", trolls);
	}
});

// Popup to edit trolls
var trollEdit = panel.Panel({
	width : 200,
	height: 300,
	contentURL: self.data.url("trolledit.html"),
	contentScriptFile: self.data.url("trolledit.js")
});

trollEdit.on("show", function() {
	trollEdit.port.emit("show", trolls);
});

trollEdit.port.on("save", function(names) {
	prefs.storage.trolls = names;
	trolls = prefs.storage.trolls;
	console.log(names);
	trollEdit.hide();
});

trollEdit.port.on("cancel", function() {
	console.log("Cancelled...");
	trollEdit.hide();
});

widget.Widget({
	label: "Trollbox",
	id: "trollbox",
	contentURL: self.data.url("icon.png"),
	panel: trollEdit
});


// END