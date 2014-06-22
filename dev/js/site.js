$(document).ready(function(){
 
	var _console = window.console;	
	if ( _console === undefined ) {
	    window.prototype.console = function(){
	        	this.log = function(msg) {
	        };
	    } 
	}
});
function setOffset(r, $progress_bar, val){ 
    var c = Math.PI*(r*2);
    var unitSize = c/100;
    var pct = (unitSize)*(100-val);    
    $progress_bar.css({ 'stroke-dashoffset': pct});
    //$progress_bar.cs s({ st rokeDashoffset: 564.45});
  //$('#progress _bar').css({ strokeDashoffset: 564.45});
    void 0;
}
var arcRadiusPattern = /a (\d+)/i;
function getRadiusFromSVG($element){
  var arcRadius = $element.attr('d');
  void 0;
  void 0;
  var radius = arcRadiusPattern.exec(arcRadius)[1];
  return radius;
}
void 0;
$(document).ready(function(){
  $('.play_button').each(function(i, item){
    void 0;
    //$item = $(item);
    var played = false;
    // add click handler to each svg play button
    var radius = getRadiusFromSVG($(this).find('#progress_bar'));
    var $track1Widget = $("#track1");
     
    item.addEventListener('click', function(){
      var $this = $(this);
      var progress_bar = $this.children('#progress_bar');
      var $progress_bar = $(progress_bar);
      if (played) {
        $track1Widget[0].load();
        played = false;    
         var computedStyle = window.getComputedStyle(progress_bar[0]),
            offset = computedStyle.getPropertyValue('stroke-dashoffset');
          void 0;
        void 0;
        $progress_bar.css({'stroke-dashoffset' : offset});
        $progress_bar.css({transition: "none"});
         setOffset(radius, $progress_bar, 0);        
        $this.find('#playing').css({display:'block'});
        $this.find('#stopped').css({display:'none'});
      }
      else{
        var trackTime = $track1Widget[0].duration;
        $track1Widget[0].play();
        void 0;
        $progress_bar.css({transition: "stroke-dashoffset "+trackTime+"s linear"});
        void 0;
        setOffset(radius, $progress_bar, 100);
        $this.find('#playing').css({display:'none'});
        $this.find('#stopped').css({display:'block'});
        played = true;
      }
    });

  });
});