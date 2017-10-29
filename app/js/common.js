$(function() {
	/*---Open---dropdown---navigation---menu---small-screen---*/
	var dropdownMenu = $(".dropdown-navigation__list");
	var dropdownbutton = $('.header__lang-menu');
	dropdownbutton.click(function(){
		if(dropdownMenu.css("display") == "block"){
			dropdownMenu.hide(300);
		} else {
			dropdownMenu.show(300);
		}
	});
	/*---close---menu---with---click---outside---menu---*/
	$(document).mouseup(function (e){
		if (!dropdownMenu.is(e.target) 
			&& dropdownMenu.has(e.target).length === 0) { 
			dropdownMenu.hide(300); 
		}
	});
	/*---Open---dropdown---navigation---menu---small-screen---*/
	/*---Connected---owl-carousel---slider---*/
	var sync1 = $("#sync1");
	var sync2 = $("#sync2");
	var slidesPerPage = 4;
	var syncedSecondary = true;

	sync1.owlCarousel({
		items : 1,
		slideSpeed : 2000,
		nav: true,
		autoplay: false,
		dots: false,
		loop: true,
		responsiveRefreshRate : 200,
		navText: ['<img src="../img/left_arrow.png" alt="" style="transform: translateY(50%);" />','<img src="../img/right_arrow.png" alt="" style="transform: translateY(50%);" />'],
  	}).on('changed.owl.carousel', syncPosition);

  	sync2
  		.on('initialized.owl.carousel', function () {
  			sync2.find(".owl-item").eq(0).addClass("current");
  		})
  	.owlCarousel({
  		items : slidesPerPage,
  		dots: false,
  		nav: true,
  		smartSpeed: 1000,
  		slideSpeed : 2000,
    	slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    	responsiveRefreshRate : 100
	}).on('changed.owl.carousel', syncPosition2);

  	function syncPosition(el) {
    	//if you set loop to false, you have to restore this next line
    	//var current = el.item.index;
    	//if you disable loop you have to comment this block
    	var count = el.item.count-1;
    	var current = Math.round(el.item.index - (el.item.count/2) - .5);
    	if(current < 0) {
    		current = count;
    	}
    	if(current > count) {
    		current = 0;
    	}
    	//end block
    sync2
    	.find(".owl-item")
    	.removeClass("current")
    	.eq(current)
    	.addClass("current");
    	var onscreen = sync2.find('.owl-item.active').length - 1;
    	var start = sync2.find('.owl-item.active').first().index();
    	var end = sync2.find('.owl-item.active').last().index();
    
    	if (current > end) {
    		sync2.data('owl.carousel').to(current, 500, true);
    	}
    	if (current < start) {
    		sync2.data('owl.carousel').to(current - onscreen, 500, true);
    	}
	}

	function syncPosition2(el) {
		if(syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl.carousel').to(number, 500, true);
		}
	}

	sync2.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl.carousel').to(number, 500, true);
	});
	/*---Connected---owl-carousel---slider---end---*/
	/*---Connected---slick---slider---*/
	$('.slider').slick({
		infinite: true,
		dots: false,
		slidesToShow: 6,
		slidesToScroll: 1,
		speed: 2000,
		autoplay: true,
		responsive: [{
            breakpoint: 800,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,   
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: 'padding-left: 40px',
            }
        }]
    });
    /*---Connected---slick---slider---end---*/
});
