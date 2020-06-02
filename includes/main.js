
//jQuery time
$(document).ready(function(){

	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches

		console.log("This runs");
	$(".next").click(function(){
		if(animating) return false;
		animating = true;

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
	        'transform': 'scale('+scale+')',
	        'position': 'absolute'
	      });
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".previous").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//de-activate current step on progressbar
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".submit").click(function(){
		return false;
	})


	// ############# D1: ADD MEMBER ###############

	var names_array_temp = [];
	var counter_D1 = 2;

	$(".add_members_D1").click(function(e) {
	  e.preventDefault();
	  if (counter_D1 < 21) {
	    var name = 'newdiv_' + String(counter_D1);
	    var newdiv = document.createElement('div');
	    newdiv.innerHTML = "<input type='text' name='Team Member' placeholder='Name' id='team_member_" + counter_D1 + "'>";
	    document.getElementById('team_member').appendChild(newdiv);
	    var temp = 'team_member_' + String(counter_D1);
	    var temp2 = 'mem_dept_' + String(counter_D1);
	    names_array_temp.push(temp, temp2);
	    names_array.splice.apply(names_array, [2 * counter_D1 + 1, 0].concat(names_array_temp));
	    names_array_temp = [];
	    counter_D1++;
	  } else {
	    alert('Cannot add more team members!');
	  };
	});
});