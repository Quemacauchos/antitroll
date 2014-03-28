/* ANTITROLL */

var trolls;    // received on init from main.js
var trollTopic = "Troll detectado y anulado.";

function getForumTable(){
	var table = null;
	var tables = document.getElementsByClassName("forumline");
	if(tables){
		table = tables[1];
	}
	return table;
}

function getUserName(row){
	var cell = row.cells[0];
	var name = "";
	if(cell.childNodes.length>0 && cell.childNodes[0].childNodes.length>0){
		name = cell.childNodes[0].childNodes[1].innerHTML;
	}
	return name;
}

function isTroll(name){
	if(trolls.indexOf(name.toLowerCase().trim()) > -1){ return true; }
	return false;
}

function hideTroll(row){
	row.className += " troll"; // color:#caa
	row.cells[0].innerHTML = "Troll";
	row.cells[1].innerHTML = trollTopic;
}

function antiTrolls(){
	var table = getForumTable();
	if(!table){ return; }

	var row;
	var name;
	var n = table.rows.length-1;
	for(var i=2; i<n; i=i+2){
		row  = table.rows[i];
		name = getUserName(row);
		if(isTroll(name)){ hideTroll(row); }
	}
}

self.port.on("init", function init(names) {
	console.log("------------------------------------------------------------");
	console.log("TOPICS");
	console.log("------------------------------------------------------------");
	trolls = names.split(",");
	antiTrolls();
});

// END