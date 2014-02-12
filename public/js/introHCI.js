'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);

	$('#photoBtn').click(addPhotoBackground);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	var url = "/project/"+idNumber;

	console.log(url);

	$.get(url, addProject)

	console.log("User clicked on project " + idNumber);
}

function addProject(result){
	console.log(result);
	var projectHTML = '<a href="#" class="thumbnail">' + '<img src="'+
	result['image'] + '"class="detailsImage">'+
	'<p>' + result['title'] + '</p>' + 
	'<p><small>' + result['date'] + '</small></p></a>' + 
	'<div>'+result['summary'] + '</div>';
	$("#project"+result["id"] + " .details").html(projectHTML);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	var url = '/palette';
	$.get(url, getColors)
}

function getColors(result){
	console.log(result);
	var colors = result.colors.hex;
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}

function addPhotoBackground (e) {
	var url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&minx=-180&miny=-90&maxx=180&maxy=90&size=original&mapfilter=true";
	$.get(url,addPhoto, 'jsonp');
}

function addPhoto(result){
	var photoArr = result.photos;
	var randomInt = Math.floor((Math.random()*20)+1);
	var photoURL  = photoArr[randomInt].photo_file_url;
	$("body").css('background', "url("+photoURL+") center");
	$(".jumbotron").css('background-color', "#FFFFFF");
	$(".jumbotron").css('opacity', 0.8);
}
