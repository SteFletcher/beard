var drawProgress = function(percent){
  if(isNaN(percent)) {
    return;
  }
  percent = parseFloat(percent);
  // Alot of the code below is inspired by a project I came across
  // online. I've saddly lost a reference to it. Do you know where
  // this might have come from?
  var bar = document.getElementsByClassName ('progress-radial-bar')[0]
  , α = percent * 360
  , π = Math.PI
  , t = 90
  , w = 153;
  if(α >= 360) {
    α = 359.999;
  }
  var r = ( α * π / 180 )
  , x = Math.sin( r ) * w
  , y = Math.cos( r ) * - w
  , mid = ( α > 180 ) ? 1 : 0 
  , animBar = 'M 0 0 v -%@ A %@ %@ 1 '.replace(/%@/gi, w)
  + mid + ' 1 '
  + x + ' '
  + y + ' z';
  bar.setAttribute( 'd', animBar );
};

var max = 1.0;
var progress = 0.0;
drawProgress(progress);

var interval = window.setInterval(function () {
  progress = progress + 0.01;
  if(progress >= max) {
    window.clearInterval(interval);
  }
  drawProgress(progress);
  // Set Progress Percentage
  document.getElementById("mytext").textContent = parseInt(progress * 100) + "%";
}, 30);