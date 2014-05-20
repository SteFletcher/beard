$(document).ready(function(){
	$('video,audio').on('timeupdate', function(event, data){
		console.log(this.currentTime / this.duration);
	});
});