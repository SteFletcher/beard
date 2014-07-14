var widgetDataDefault = {
    width: 100,
    radius: 90
};

function loadWidgetOn($CONTAINER) {
    var $container = $CONTAINER;
    $.get('/playwidget.htm',
        function(data, status) {
            console.log("loading template..");
            var renderer = Handlebars.compile(data);
            console.log(widgetDataDefault);
            var result = renderer(widgetDataDefault);
            $container.html(result);
        });
}
$(document).ready(function() {
    loadWidgetOn($('#track1_container'));
});




function setOffset(r, $progress_bar, val) {
    var c = Math.PI * (r * 2);
    var unitSize = c / 100;
    var pct = (unitSize) * (100 - val);
    $progress_bar.css({
        'stroke-dashoffset': pct
    });
    console.log("pct: " + pct);
}

var arcRadiusPattern = /a (\d+)/i;

function getRadiusFromSVG($element) {
    var arcRadius = $element.attr('d');
    console.log(arcRadius);
    console.log("circumference: " + 2 * Math.PI * 90);
    var radius = arcRadiusPattern.exec(arcRadius)[1];
    return radius;
}