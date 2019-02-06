$(function () {

	/*Hover*/

	var X_COEF = 5;
	var Y_COEF = 10;

	function calcRotation(x, y) {
		var transformYval = x <= 100 ?
			(20 - x / X_COEF) * -1 :
			(x - 100) / X_COEF;
		var transformXval = y <= 150 ?
			20 - y / Y_COEF :
			((y - 150) / Y_COEF) * -1;
		return 'rotateX(' + transformXval +'deg) rotateY(' + transformYval + 'deg)';;
	}

	function calcTranslate(x, y) {
		var translateXval = x <= 100 ?
			20 - x / X_COEF :
			((x - 100) / X_COEF) * -1;
		var translateYval = y <= 150 ?
			20 - y / Y_COEF :
			((y - 150) / Y_COEF) * -1;
		return 'translateX(' + translateXval +'px) translateY(' + translateYval + 'px)';
	}

	function handleMousmove (event) {
		var cardBlock = this;
		var card = $(cardBlock).find('.card');
		var cardImage = $(card).find('.card-image');
		var cardBorder = $(card).find('.border');
		var cardText = $(cardBorder).find('.text');
		var cardBlacout = $(card).find('.blackout');
		var xOfset = event.offsetX;
		var yOfset = event.offsetY;
		var rotate = calcRotation(xOfset, yOfset);
		var translate = calcTranslate(xOfset, yOfset);
		card.css('transform', rotate);
		cardImage.css('transform', translate);
		cardText.css('top', '185px');
		cardBlacout.css('background-color', 'rgba(0,0,0, 0)')
	}
	function handleMouseout () {
		var cardBlock = this;
		var card = $(cardBlock).find('.card');
		var cardImage = $(card).find('.card-image');
		var cardBorder = $(card).find('.border');
		var cardText = $(cardBorder).find('.text');
		var cardBlacout = $(card).find('.blackout');
		setTimeout(function() {
			$(card).css('transform', '');
			$(cardImage).css('transform', '');
			$(cardText).css('top', '232px');
			$(cardBlacout).css('background-color', 'rgba(0,0,0, 0.3)')
		}, 500)
	}

	/*Sort*/

	var cardsArray = [
		{name:"Moon", size:12, id:"0"},
		{name:"Valley", size:10, id:"1"},
		{name:"Sky", size:1, id:"2"},
		{name:"Sunset", size:10, id:"3"},
		{name:"Palm", size:5, id:"4"},
		{name:"Ocean", size:8, id:"5"},
		{name:"Bog", size:7, id:"6"},
		{name:"Cold sea", size:7, id:"7"},
		{name:"Clouds", size:12, id:"8"},
		{name:"Lake", size:3, id:"9"},
		{name:"Forest", size:4, id:"10"},
		{name:"Flower", size:9, id:"11"}
	];

	function sortByName (array) {
		array.sort(function (a,b) {
			var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
			if (nameA < nameB)
        		return -1 
    		if (nameA > nameB)
        		return 1
    		return 0
		})
	}

	function sortBySize (array) {
		array.sort(function (a,b) {
			return a.size-b.size
		})
	}

	function reset (array) {
		array.sort(function (a,b) {
			return a.id-b.id
		})
	}

	var cardWidth = 240;
	var cardHeigth = 340;

	function drawCards (sortType) {
		switch(sortType) {
			case 'alphabetical':
				sortByName(cardsArray);
				break;
			case 'size':
				sortBySize(cardsArray);
				break;
			case 'reset':
				reset(cardsArray);	
		}
		$.each(cardsArray, function(index, card) {
			var x = index % 4;
			var y = Math.floor(index / 4);
			var id = ".card-block_" + card.id;
			var translateX = "translateX(" + x * cardWidth + "px)";
			var translateY = "translateY(" + y * cardHeigth + "px)";
			$(id).css('transform', translateX + translateY);
		})
	}

	/*Events*/

	$('.picker-item.a-z').on('click', function () {
		$('.picker-border').css('left', '0');
		$('.picker-border').css('opacity', '1');
		drawCards('alphabetical');
	})
	$('.picker-item.reset').on('click', function () {
		$('.picker-border').css('left', '33%');
		$('.picker-border').css('opacity', '1');
		drawCards('reset');
	})
	$('.picker-item.size').on('click', function () {
		$('.picker-border').css('left', '66%');
		$('.picker-border').css('opacity', '1');
		drawCards('size');
	})

	$('.card-block').on('mousemove', handleMousmove);

	$('.card-block').on('mouseout', handleMouseout);
})