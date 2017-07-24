// With JQuery
$(document).ready(function() {
	$('#insanity').slider();

	// Get parsed cookies.
	let parsedCookies = getParsedCookies();
	if (parsedCookies.length === 4) {
		populateFormFields(parsedCookies).then(startInsanity);
	}
});

var insanityIntervalID = 0;

var q = {
	faction: str => {
		$(`#faction-${str}`).prop('checked', true);
	},
	food: val => $('#food').val(val),
	color: val => $('#color').val(val),
	insanity: val => $('#insanity').slider('setValue', val)
};

function populateFormFields(cookies) {
	return new Promise(resolve => {
		cookies.forEach(el => {
			if (el[0].length > 0 && $.isFunction(q[el[0]])) {
				q[el[0]](el[1]);
			}
		});
		resolve(true);
	});
}

function getParsedCookies() {
	return document.cookie
		.split(';')
		.map(el => decodeURIComponent(el.trim()).split('='));
}

function startInsanity() {
	// Get parsed cookies.
	let parsedCookies = getParsedCookies();

	$('body').addClass(parsedCookies[0][1]); // Faction.

	titleInsane(parsedCookies[3][1], parsedCookies[2][1]);
}

function titleInsane(sanityLevel, color) {
	if (insanityIntervalID !== 0) {
		clearInterval(insanityIntervalID);
		insanityIntervalID = 0;
	}

	// Set the sanity level.
	sanityLevel = 1000 / sanityLevel;
	let $title = $('h1');

	var diffColor = false,
		oldColor = $title.css('color');

	insanityIntervalID = setInterval(() => {
		$title.css({ color: diffColor ? color : oldColor });
		diffColor = !diffColor;
	}, sanityLevel);
}
