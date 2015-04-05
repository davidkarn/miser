function init_widgets() {
    var div = sel('#social-plugins');
    widgets.map(function(widget) {
        var name  = widget.name;
        var label = widget.label; 

        var checkbox = create_element('input', {
            type:    'checkbox',
            id:       name + '_checkbox'});
        if (widget_enabled(widget))
            checkbox.checked = true;
        checkbox.onchange = function() {
            set_widget_enabled(widget, checkbox.checked); };

        var label_el = create_element('label', {
            for: name + '_checkbox'});
        label_el.appendChild(checkbox);
        label_el.appendChild(create_text(" " + label));

        div.appendChild(label_el); }); }

function init_disabled_urls() {
    var div = sel('#disabled-urls');
    var urls = disabled_urls();
    div.innerHTML = '';

    urls.map(function(url) {
        var label   = create_element('label', {});
        var a       = create_element('a', {href: url});
        var remove  = create_element('a', {'class': 'remove'});

        remove.onclick = function() {
            remove_disabled_url(url);
            init_disabled_urls(); };

        remove.appendChild(create_text('remove'));
        a.appendChild(create_text(url));
        label.appendChild(a);
        label.appendChild(create_text(' '));
        label.appendChild(remove);
        div.appendChild(label);
        div.appendChild(create_element('br')); }); }

function init_add_url() {
    var input    = sel('#url-to-add');
    var button   = sel('#add-url-button');

    button.onclick = function() {
        add_disabled_url(input.value);
        input.value = '';
        init_disabled_urls(); }; }

function init() {
    init_widgets();
    init_add_url();
    init_disabled_urls(); }

if (member(["interactive", "complete"], document.readyState))
    init(); 
else 
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            init(); }};            
    
