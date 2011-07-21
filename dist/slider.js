/**
 * ThumbSlider
 * @author petteritorssonen
 * @version $Rev$
 * @requires OtherClassName
 */
(function($){
	$.fn.thumbSlider = function() {
		var slider = false,
		sliderContent = false,
		elements = false;
		
		function bindClick (element, i) {
			element.data('elementData', {index: i});
			element.bind('click', function  () {
				var ele = $(this),
				h3 = ele.children('.sliderText').children('h3').text(),
				p = ele.children('.sliderText').children('p').text(),
				img = ele.children('.sliderText').children('img'),
				sliderTextContent = sliderContent.children('#sliderTextContent');
				
				elements.each(function  () {
					$(this).removeClass('selected');
				});
				
				moveArrow(ele.data('elementData').index, ele.height());
				
				ele.addClass('selected');
				sliderTextContent.css({height: '0px', display: 'none'});
				sliderTextContent.html("<h3>"+h3+"</h3><p>"+p+"</p>");
				sliderContent.css({backgroundImage: 'url('+img.attr('src')+')'});
				sliderTextContent.css('display','block');
				sliderTextContent.animate({height: '70px'}, 700);
			});
		}
		
		function moveArrow (i, height) {
			var position = (parseInt(i+1)*parseInt(height)) ,
			arrow = $("#slider #arrow");
			position = position - parseInt(height/2);
			position = position - (parseInt(arrow.height())/2);
			arrow.animate({top: position+'px'}, 700);
		}
	
		
		return $(this).each(function() {
			var sliderThumbs = false;
			slider = $(this);
			sliderContent = $(slider.children('#sliderContent').get(0));
			sliderThumbs = $(slider.children('#sliderThumbs').get(0));
			
			//check
			if(sliderThumbs.length < 1 || sliderContent.length < 1){
				alert('Define Slider Thumbs');
			}

			//Making content height equal
			sliderContent.height(sliderThumbs.height());
			
			elements = sliderThumbs.children('ul').children('li');
			
			//check
			if(elements.length < 1){
				alert('Define Slider Thumbs');
			}
			
			elements.each(function  (i) {
				bindClick($(this), i);	
			});
			
			//selecting first one
			$(elements.get(0)).click();

		});
	};
})(jQuery);