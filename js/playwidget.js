$.fn.audioWidget = function(options) {
    getCentroid = function(radius, width) {
        var _width = width / 2,
            centroid = {
                x: _width - (radius / 3),
                y: _width - ((radius + (radius / 2)) / 3)
            };
        return centroid;
    },

    setOffset = function(r, $progress_bar, val) {
        console.log("r: " + r + " progress_bar: " + progress_bar + " val: " + val);
        var c = Math.PI * (r * 2);
        var unitSize = c / 100;
        var pct = (unitSize) * (100 - val);
        $progress_bar.css({
            'stroke-dashoffset': pct
        });
        console.log("pct: " + pct);
    },

    arcRadiusPattern = /a (\d+)/i;

    getRadiusFromSVG = function($element) {
        var arcRadius = $element.attr('d');
        console.log(arcRadius);
        console.log("circumference: " + 2 * Math.PI * 90);
        var radius = arcRadiusPattern.exec(arcRadius)[1];
        return radius;
    },
    defaults = {
        width: 30
    },
    _this = this,
    _playing = false,
    _options = $.extend(defaults, options),
    _options.strokeWidth = 0.02 * _options.width,
    _options.innerStrokeWidth = 0.12 * _options.width,
    _options.radius = _options.width / 2 - _options.strokeWidth / 2, _options.radius -= 2
    _options.innerRadius = _options.radius - _options.innerStrokeWidth / 2,
    _options.innerRadius += 2,
    _options.centroid = getCentroid(_options.radius, _options.width);

    $.get('/playwidget.htm',
        function(data, status) {
            var renderer = Handlebars.compile(data);
            console.log(_options);
            var result = renderer(_options);
            _this.html(result);
            _this.click(function() {
                console.log("clicked " + _playing);
                var _audioElement =
                    _this.find('audio'),
                    _progress_bar = $('#progress_bar_inner');
                _audioElement[0].preload = 'metadata';

                setOffset(_options.innerRadius, _progress_bar, 0);
                if (_playing) {

                    _audioElement[0].load();
                    var computedStyle = window.getComputedStyle(_progress_bar[0]),
                        offset = computedStyle.getPropertyValue('stroke-dashoffset');

                    _progress_bar.css({
                        // 'stroke-dashoffset': offset,
                        transition: 'none'
                    });

                    _this.find('#playing').show();
                    _this.find('#stopped').hide();
                    _playing = false;

                } else {
                    _this.find('#playing').hide();
                    _this.find('#stopped').show();
                    _playing = true;
                    console.log("--> " + _audioElement[0].duration);
                    _progress_bar.css({
                        transition: "stroke-dashoffset " + _audioElement[0].duration + "s linear"
                    });
                    setOffset(_options.innerRadius, _progress_bar, 100);

                    _audioElement[0].play();

                }
            });
        });
}
$(document).ready(function() {
    $('#track1_container').audioWidget({
        trackUri: './audio/dollar.mp3',
        title: 'Alo Bloc - Dollar'
    });
    // $('#track_container').audioWidget({
    //     trackUri: './audio/dollar.mp3',
    //     title: 'Alo Bloc - Dollar'
    // });
});