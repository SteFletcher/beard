function registerHandlebarsHelpers() {
    //handlebars helper to do simple math
    Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    });


    Handlebars.registerHelper("calcCircum", function(radius, options) {
        radius = parseFloat(radius);
        return 2 * Math.PI * radius;
    });
}