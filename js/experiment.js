'use strict';

// Location of data files
var trialsFile = ""
const menuL1File = "./data/menu_depth_1_breadth_2.csv"
const menuL2File = "./data/menu_depth_1_breadth_4.csv"
const menuL3File = "./data/menu_depth_2_breadth_2.csv"
const menuL4File = "./data/menu_depth_2_breadth_4.csv"
const menuL5File = "./data/menu_depth_3_breadth_2.csv"
const menuL6File = "./data/menu_depth_3_breadth_4.csv"

// Global variables
var menu;
var trialsData = [];
var numTrials = 0;
var currentTrial = 1;
var markingMenuL1 = [];
var markingMenuL2 = [];
var markingMenuL3 = [];
var markingMenuL4 = [];
var markingMenuL5 = [];
var markingMenuL6 = [];
var radialMenuTree = null;
var radialMenuL1 = [];
var radialMenuL2 = [];
var radialMenuL3 = [];
var radialMenuL4 = [];
var radialMenuL5 = [];
var radialMenuL6 = [];
var tracker = new ExperimentTracker();
var markingMenuSubscription = null;
var radialMenuSvg = null;
var participantId = "";
var isTrail ="True";





// Load CSV files from data and return text
function getData(relativePath) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", relativePath, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}


// Loads the CSV data files on page load and store it to global variables
function initExperiment() {
	var url = window.location.href;
	participantId = window.location.href.split('&')[0].split('participantId=')[1];
	isTrail = window.location.href.split('isTrail=')[1];

	if (isTrail == "True") {
		trialsFile = "./data/trail.csv";
		document.getElementById('trail').className='active';	
	} else {
		trialsFile = "./data/experiments_"+participantId+".csv";
		document.getElementById('real').className='active';	
	}
	// Get Trails
	var data = getData(trialsFile);

	var records = data.split("\n");
	numTrials = records.length - 1;
	for (var i = 1; i <= numTrials; i++) {
		var cells = records[i].split(",");
		var menuType = cells[0].trim();
		var menuDepth = cells[1].trim();
		var menuBreadth = cells[2].trim();
		var device = cells[3].trim();
		var targetItem = cells[4].trim();
		trialsData[i] = {
			'Menu Type': menuType,
			'Menu Depth': menuDepth,
			'Menu Breadth': menuBreadth,
			'Device': device,
			'Target Item': targetItem
		};
	}

	// Get Menus
	var menuL1Data = getData(menuL1File);
	var menuL2Data = getData(menuL2File);
	var menuL3Data = getData(menuL3File);
	var menuL4Data = getData(menuL4File);
	var menuL5Data = getData(menuL5File);
	var menuL6Data = getData(menuL6File);
	
	// Format CSV Menu to respective Menu structures
	markingMenuL1 = formatMarkingMenuData(menuL1Data);
	markingMenuL2 = formatMarkingMenuData(menuL2Data);
	markingMenuL3 = formatMarkingMenuData(menuL3Data);
	markingMenuL4 = formatMarkingMenuData(menuL4Data);
	markingMenuL5 = formatMarkingMenuData(menuL5Data);
	markingMenuL6 = formatMarkingMenuData(menuL6Data);
	radialMenuL1 = formatRadialMenuData(menuL1Data);
	radialMenuL2 = formatRadialMenuData(menuL2Data);
	radialMenuL3 = formatRadialMenuData(menuL3Data);
	radialMenuL4 = formatRadialMenuData(menuL4Data);
	radialMenuL5 = formatRadialMenuData(menuL5Data);
	radialMenuL6 = formatRadialMenuData(menuL6Data);
	
	//Start the first trial
	nextTrial();
}

// Wrapper around nextTrial() to prevent click events while loading menus
function loadNextTrial(e){
	e.preventDefault();
	nextTrial();
	
}

// Move to next trai and record events
function nextTrial() {

	
	if (currentTrial <= numTrials) {

		var menuType = trialsData[currentTrial]['Menu Type'];
		var menuDepth = trialsData[currentTrial]['Menu Depth'];
		var menuBreadth = trialsData[currentTrial]['Menu Breadth'];
		var device = trialsData[currentTrial]['Device'];
		var targetItem = trialsData[currentTrial]['Target Item'];

		document.getElementById("trialNumber").innerHTML = String(currentTrial) + "/" + String(numTrials);
		document.getElementById("menuType").innerHTML = menuType;
		document.getElementById("menuDepth").innerHTML = menuDepth;
		document.getElementById("menuBreadth").innerHTML = menuBreadth;
		document.getElementById("Device").innerHTML = device;
		document.getElementById("targetItem").innerHTML = targetItem;
		document.getElementById("selectedItem").innerHTML = "&nbsp;";
		// Set IV3 state over here

		tracker.newTrial();
		tracker.trial = currentTrial;
		tracker.menuType = menuType;
		tracker.menuDepth = menuDepth;
		tracker.menuBreadth = menuBreadth;
		tracker.device = device;
		tracker.targetItem = targetItem;

		if (menuType === "Marking") {
				
			initializeMarkingMenu();
			
			if(menuDepth == 1 && menuBreadth == 2){
				menu = MarkingMenu(markingMenuL1, document.getElementById('marking-menu-container'));
			}else if(menuDepth == 1 && menuBreadth == 4){
				menu = MarkingMenu(markingMenuL2, document.getElementById('marking-menu-container'));
			}else if(menuDepth == 2 && menuBreadth == 2){
				menu = MarkingMenu(markingMenuL3, document.getElementById('marking-menu-container'));
			}else if(menuDepth == 2 && menuBreadth == 4){
				menu = MarkingMenu(markingMenuL4, document.getElementById('marking-menu-container'));
			}else if(menuDepth == 3 && menuBreadth == 2){
				menu = MarkingMenu(markingMenuL5, document.getElementById('marking-menu-container'));
			}else if(menuDepth == 3 && menuBreadth == 4){
				menu = MarkingMenu(markingMenuL6, document.getElementById('marking-menu-container'));
			}

			markingMenuSubscription = menu.subscribe((selection) => markingMenuOnSelect(selection));

		} else if (menuType === "Radial") {

			initializeRadialMenu();			
			if (menuDepth == 1 && menuBreadth == 2){
				menu = createRadialMenu(radialMenuL1);
			}else if(menuDepth == 1 && menuBreadth == 4){
				menu = createRadialMenu(radialMenuL2);
			}else if(menuDepth == 2 && menuBreadth == 2){
				menu = createRadialMenu(radialMenuL3);
			}else if(menuDepth == 2 && menuBreadth == 4){
				menu = createRadialMenu(radialMenuL4);
			}else if(menuDepth == 3 && menuBreadth == 2){
				menu = createRadialMenu(radialMenuL5);
			}else if(menuDepth == 3 && menuBreadth == 4){
				menu = createRadialMenu(radialMenuL6);
			}


		}

		currentTrial++;
	} else {
		
	    var nextButton = document.getElementById("nextButton");
	    nextButton.innerHTML = "Done";
	    if (isTrail == "True") {
	    	alert('You have finished the trail experiment! Please take a break before starting the real experient :)');
	    	window.location='experiment.html?participantId='+participantId+"&isTrail=False";
	    } else {
			tracker.toCsv(participantId);
			window.location='post-experiment-questionnaire.html?participantId='+participantId;
	    }
	}
}





/*Functions related to MarkingMenu*/

// Reconstructs marking menu container
function initializeMarkingMenu(){
	
	//Unload Radial Menu
	var radialMenuContainer = document.getElementById('radial-menu-container');
	if(radialMenuContainer != null){
		radialMenuContainer.parentNode.removeChild(radialMenuContainer);
	}
	
	// Load Marking Menu
	var interactionContainer = document.getElementById('interaction-container');
	if (markingMenuSubscription != null) {
		markingMenuSubscription.unsubscribe();
	}
	var markingMenuContainer = document.getElementById('marking-menu-container');
	if(markingMenuContainer == null){
		interactionContainer.innerHTML += "<div id=\"marking-menu-container\" style=\"height:100%;width:100%\" onmousedown=\"markingMenuOnMouseDown()\" oncontextmenu=\"preventRightClick(event)\"></div>";
	}
}

//Formats csv menu data in the structure accepted by radial menu
// Assumes menu csv is sorted by Id and Parent both Ascending
function formatMarkingMenuData(data) {
	var records = data.split("\n");
	var numRecords = records.length;
	var menuItems = {}

	// Parse through the records and create individual menu items
	for (var i = 1; i < numRecords; i++) {
		var items = records[i].split(',');
		var id = items[0].trim();
		var label = items[2].trim();
		menuItems[id] = {
			'name': label,
			'children': []
		};
	}

	for (var i = numRecords - 1; i >= 1; i--) {
		var items = records[i].split(',');
		var id = items[0].trim();
		var parent = items[1].trim();
		if (parent === '0') {
			continue;
		} else {
			var children = menuItems[parent]['children'];
			children.push(menuItems[id]);
			delete menuItems[id]
			menuItems[parent]['children'] = children;
		}
	}

	var menuItemsList = [];
	for (var key in menuItems) {
		menuItemsList.push(menuItems[key]);
	}

	return menuItemsList;
}

// Function to start tracking timer on mouse down
function markingMenuOnMouseDown(){

	tracker.startTimer();
}

//Function to start tracking timer on mouse down
function markingMenuOnSelect(selectedItem){

	tracker.recordSelectedItem(selectedItem.name);
	document.getElementById("selectedItem").innerHTML = selectedItem.name;
}

function preventRightClick(e){
	e.preventDefault();
}


/*Functions related to RadialMenu*/

// Reconstructs radial menu container
function initializeRadialMenu(){
	
	// Unload Marking Menu
	if (markingMenuSubscription != null) {
		markingMenuSubscription.unsubscribe();
	}
	var markingMenuContainer = document.getElementById('marking-menu-container');
	if(markingMenuContainer!=null){
		markingMenuContainer.parentNode.removeChild(markingMenuContainer);
	}
	
	

	// Reload Radial Menu
	var interactionContainer = document.getElementById('interaction-container');
	var radialMenuContainer = document.getElementById('radial-menu-container');
	if(radialMenuContainer == null){
		interactionContainer.innerHTML += "<div id=\"radial-menu-container\" style=\"height:100%;width:100%\" oncontextmenu=\"toggleRadialMenu(event)\"></div>";
	}

}

// Create radial menu svg element
function createRadialMenu(radialMenuL){
	
    var radialmenuElement = document.getElementById('radialmenu');
    if(radialmenuElement != null){
    	radialmenuElement.parentNode.removeChild(radialmenuElement);
    }
	
	
	var w = window.innerWidth;
	var h = window.innerHeight;
	var radialMenuSvgElement = document.getElementById('radial-menu-svg');
	if (radialMenuSvgElement != null){
		radialMenuSvgElement.parentNode.removeChild(radialMenuSvgElement);
	}
	radialMenuSvg = d3.select("#radial-menu-container").append("svg").attr("width", w).attr("height", h).attr("id","radial-menu-svg");
	radialMenuTree = radialMenuL;
	return radialMenuSvg;
}

// Toggle radial menu on right click
function toggleRadialMenu(e) {
	
	if(tracker.startTime == null){
	
		if(radialMenuTree != null){
			console.log(e);
				menu = module.exports(radialMenuTree, {
					x: e.clientX,
					y: e.clientY
				}, radialMenuSvg);
		
			// Start timing once menu appears
			tracker.startTimer();
		}
	}else{
		
		// Record previous item
		tracker.recordSelectedItem(null);
		
		if(radialMenuTree != null){
			menu = module.exports(radialMenuTree, {
				x: e.clientX,
				y: e.clientY
			}, radialMenuSvg);
	
		// Start timing once menu appears
		tracker.startTimer();
		}
	}
	e.preventDefault();
}

//Callback for radialmenu when a leaf node is selected
function radialMenuOnSelect() {

	tracker.recordSelectedItem(this.id);
	var radialmenu = document.getElementById('radialmenu');
	radialmenu.parentNode.removeChild(radialmenu);
	
	document.getElementById("selectedItem").innerHTML = this.id;
}

//Formats csv menu data in the structure accepted by radial menu
// Assumes menu csv is sorted by Id and Parent both Ascending
function formatRadialMenuData(data) {

	var records = data.split("\n");
	var numRecords = records.length;
	var menuItems = {}



	// Parse through the records and create individual menu items
	for (var i = 1; i < numRecords; i++) {
		var items = records[i].split(',');
		var id = items[0].trim();
		var label = items[2].trim();
		menuItems[id] = {
			'id': label,
			'fill': "#39d",
			'name': label,
			'_children': []
		};
	}

	for (var i = numRecords - 1; i >= 1; i--) {
		var items = records[i].split(',');
		var id = items[0].trim();
		var parent = items[1].trim();
		if (parent === '0') {
			continue;
		} else {
			var _children = menuItems[parent]['_children'];
			if(menuItems[id]['_children'].length == 0){
				menuItems[id]['callback'] = radialMenuOnSelect;	
			}
			_children.push(menuItems[id]);
			delete menuItems[id];
			menuItems[parent]['_children'] = _children;
		}
	}


	var menuItemsList = [];
	for (var key in menuItems) {
		if (menuItems[key]['_children'].length == 0){
			delete menuItems[key]['_children'];
			menuItems[key]['callback'] = radialMenuOnSelect;
		} else{
			delete menuItems[key]['callback'];
		}
		menuItemsList.push(menuItems[key]);
	}

	return {
		'_children': menuItemsList
	};

}
