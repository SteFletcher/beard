$(document).ready(function(){
	// $('video,audio').on('timeupdate', function(event, data){
	// 	console.log( this.currentTime / this.duration );
	// });
	var _console = window.console;	
	if ( _console === undefined ) {
	    window.prototype.console = {
	        	this.log = function(msg) {
	        };
	    }
	}
});