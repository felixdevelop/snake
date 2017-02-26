function Snake(id){
	var snake = $(".snake#"+id),
		segments = $(".snake-segment", snake);

	var dl = 35;

	var segmentsPosDegs = [90, 90, 90, 90, 90, 90, 90];
	
	var prev = $(segments.get(0));

	for(var i = 1; i < segments.length; i++){
		var s = $(segments.get(i));

		var sin = Math.sin(segmentsPosDegs[i-1]/180*Math.PI),
			cos = Math.cos(segmentsPosDegs[i-1]/180*Math.PI);

		s.css({
			"top": prev.position().top - sin * dl,
			"left": prev.position().left + cos * dl
		});

		prev = s;
	}

	this.move = function(dx, dy){
		var prev = $(segments.get(0));

		prev.css({
			"top": prev.position().top + dy,
			"left": prev.position().left + dx
		});

		for(var i = 1; i < segments.length; i++){
			var s = $(segments.get(i));

			var sin = (prev.position().top - s.position().top)/Math.sqrt(Math.pow(s.position().left - prev.position().left, 2)+Math.pow(s.position().top - prev.position().top,2));
			var cos = (s.position().left - prev.position().left)/Math.sqrt(Math.pow(s.position().left - prev.position().left, 2)+Math.pow(s.position().top - prev.position().top,2));

			segmentsPosDegs[i-1] = Math.acos(cos)/Math.PI*180 * (Math.asin(sin) >= 0 ? 1 : -1);


			s.css({
				"top": prev.position().top - sin * dl,
				"left": prev.position().left + cos * dl
			});


			prev = s;
		}
	}
}

$(document).ready(function(){
	var snake = new Snake("main");

	$(document).keydown(function(e){
		var key = e.keyCode;

		if(key == 37){  // <-
			snake.move(-25, 0);
		}
		if(key == 38){  // /\
			snake.move(0, -25);
		}

		if(key == 39){  // ->
			snake.move(25, 0);
		}

		if(key == 40){  // \/
			snake.move(0, 25);
		}
	});


	var mouseX = 0, mouseY = 0, limitX = 1500-10, limitY = 850-10;
    $(window).on("touchmove", function(e){

    	var t = e.changedTouches[0];

        mouseX = Math.min(t.pageX, limitX);
        mouseY = Math.min(t.pageY, limitY); 
        if (mouseX < 0) mouseX = 0;
        if (mouseY < 0) mouseY = 0;
    });


    var fix = 0;

    $(window).on("touchstart", function(e){

        fix = 1;
    });

    $(window).on("touchend", function(e){

        fix = 0;
    });

 
    
    var xp = 0, yp = 0;
    var sn = $(".snake#main"); 
    var segments = $(".snake-segment", sn);

    var c = $(".container");
    var loop = setInterval(function(){

    	
    	var headposition = segments.offset();

        xp = -headposition.left+mouseX;
        yp = -headposition.top+mouseY;

        var df = 8;
        var d = df;
        if(fix) {
        	snake.move(xp/15, yp/15);  
        	d = df/2;
        }

	    for(var i = 0; i < segments.length; i++){
	        	var s = $(segments[i]);
	        	s.css({
	        		"top": s.position().top - d
	        	});
	    }


		c.css({
			"top": c.position().top - df
		});
    	

        snake.move(0, 1);  

    }, 30);

});
