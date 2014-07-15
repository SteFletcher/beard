var widgetDataDefault = {
    width: 500
};

function loadWidgetOn($CONTAINER, options) {

    var getCentroid = function(radius, width) {
        var _width = width / 2;
        var centroid = {
            x: _width - (radius / 3),
            y: _width - ((radius + (radius / 2)) / 3)
        };
        return centroid;
    }

    var defaults = {
            width: 100,
            strokeWidth: 10
        },
        _this = $CONTAINER,
        _options = $.extend(defaults, options);
    _options.radius = _options.width / 2 - _options.strokeWidth / 2;
    _options.radius -= 5;
    _options.centroid = getCentroid(_options.radius, _options.width);

    $.get('/playwidget.htm',
        function(data, status) {
            console.log("loading template..");
            var renderer = Handlebars.compile(data);
            console.log(_options);
            var result = renderer(_options);
            _this.html(result);
        });
}
$(document).ready(function() {
    loadWidgetOn($('#track1_container'), widgetDataDefault);
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