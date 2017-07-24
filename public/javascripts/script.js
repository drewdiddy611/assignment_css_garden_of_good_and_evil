// With JQuery
var insaneKittens = false;
$(document).ready(function() {
	// Get parsed cookies.
	let parsedCookies = getParsedCookies();
	if (parsedCookies.length === 4) {
		$($('#insanity').slider()).on('change', e => {
			confirmInsanity(e, parsedCookies[2][1]);
		});

		populateFormFields(parsedCookies).then(startInsanity);
	}
});

function confirmInsanity(e, color) {
	let $slider = $(e.target);
	let value = $slider.slider('getValue');
	if (value === 20 && !insaneKittens) {
		if (
			window.confirm('Are you sure you want to experience insanity level 20?')
		) {
			$('#insanity').off('change', confirmInsanity);
			insaneKitties();
			insaneKittens = true;
			$slider.slider('setValue', 1);
		} else {
			$slider.slider('setValue', 19);
		}
	}
	titleInsane(value, color);
}

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

	console.log(`.faction-${parsedCookies[0][1]}`);
	// Show resume.
	$(`.faction-${parsedCookies[0][1]}`).removeClass('hidden');

	titleInsane(parsedCookies[3][1], parsedCookies[2][1]);

	//insaneKitties();
}

function titleInsane(sanityLevel, color) {
	if (insanityIntervalID !== 0) {
		clearInterval(insanityIntervalID);
		insanityIntervalID = 0;
	}

	// Set the sanity level.
	sanityLevel = 1000 / sanityLevel;
	let $title = $('h1');
	$title.css({ color: '#333' });

	var diffColor = false,
		oldColor = $title.css('color');

	insanityIntervalID = setInterval(() => {
		$title.css({ color: diffColor ? color : oldColor });
		diffColor = !diffColor;
	}, sanityLevel);
}

jQuery.fn.rotate = function(degrees) {
	$(this).css({ transform: 'rotate(' + degrees + 'deg)' });
	return $(this);
};

function insaneKitties() {
	let $container = $('<div/>', {
		class: 'kitty-container'
	});

	// Container.
	$('body').append($container);

	var wheight = $(window).height(); // returns height of browser viewport
	var wwidth = $(window).width(); // returns width of browser viewport

	let $kitty = $('<img/>', {
		class: 'kitty-image',
		src: ''
	});
	var kittyInterval = setInterval(function() {
		// Determine which kitty.
		let i = Math.floor(Math.random() * 5);

		// Determine position.
		let x = Math.floor(Math.random() * wwidth);
		let y = Math.floor(Math.random() * wheight);

		// Determine rotation.
		let r = Math.floor(Math.random() * 359);

		$kitty
			.clone()
			.attr('src', 'images/kitten' + i + '.png')
			.rotate(r)
			.css({
				left: x,
				top: y
			})
			.appendTo($container)
			.addClass('kitty-rotate');
	}, 10);
	setTimeout(() => {
		clearInterval(kittyInterval);
	}, 100000);
}
