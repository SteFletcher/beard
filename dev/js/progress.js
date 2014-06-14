function setOffset(r, $progress_bar, val){
    var c = Math.PI*(r*2);
    var unitSize = c/100;
    var pct = (unitSize)*(100-val);    
    $progress_bar.css({ 'stroke-dashoffset': pct});
    //$progress_bar.css({ strokeDashoffset: 564.45});
  //$('#progress_bar').css({ strokeDashoffset: 564.45});
    console.log("pct: "+pct);
}
var arcRadiusPattern = /a (\d+)/i;
function getRadiusFromSVG($element){
  var arcRadius = $element.attr('d');
  console.log(arcRadius);
  console.log("circumference: "+2*Math.PI * 90);
  var radius = arcRadiusPattern.exec(arcRadius)[1];
  return radius;
}
console.log(": -> "+$('.play_button').length);
$(document).ready(function(){
  $('.play_button').each(function(i, item){
    console.log("index "+i);
    //$item = $(item);
    var played = false;
    // add click handler to each svg play button
    var radius = getRadiusFromSVG($(this).find('#progress_bar'));
     
    item.addEventListener('click', function(){
      var $this = $(this);
      var progress_bar = $this.children('#progress_bar');
      var $progress_bar = $(progress_bar);
      if (played) {
        played = false;    
         var computedStyle = window.getComputedStyle(progress_bar[0]),
            offset = computedStyle.getPropertyValue('stroke-dashoffset');
        console.log("OFF");
        console.log("computedStyle: "+offset);
        $progress_bar.css({'stroke-dashoffset' : offset});
        $progress_bar.css({transition: "none"});
        setOffset(radius, $progress_bar, 0);
        
        $this.find('#playing').css({display:'block'});
        $this.find('#stopped').css({display:'none'});
      }
      else{
        var $track1Widget = $("#track1");
        var trackTime = $track1Widget[0].duration;
        $track1Widget.play();
        console.log("ON "+trackTime);
        $progress_bar.css({transition: "stroke-dashoffset "+trackTime+"s linear"});
        setOffset(radius, $progress_bar, 100);
        $this.find('#playing').css({display:'none'});
        $this.find('#stopped').css({display:'block'});
        played = true;
      }
    });

  });
});