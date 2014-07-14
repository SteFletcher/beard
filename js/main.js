$(document).ready(function() {
    registerHandlebarsHelpers();
    var _console = window.console;
    if (_console === undefined) {
        window.prototype.console = function() {
            this.log = function(msg) {};
        }
    }
});