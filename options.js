function widget_enabled(widget) {
    return get_option('widget_' + widget.name); }

function set_widget_enabled(widget, enabled) {
    return set_option('widget_' + widget.name,
                      enabled); }

function init() {
    var div = sel('#social-plugins');
    widgets.map(function(widget) {
        var name  = widget.name;
        var label = widget.label; 

        var checkbox = create_element('input', {
            type: 'checkbox',
            id:    name + '_checkbox'});

        var label_el = create_element('label', {
            for: name + '_checkbox'});
        label_el.appendChild(checkbox);
        label_el.appendChild(create_text(" " + label));

        div.appendChild(label_el); }); }

if (member(["interactive", "complete"], document.readyState))
    init(); 
else 
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            init(); }};            
    
