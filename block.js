var waiting_for_mouseup = false;
 
function on_selection_change() {
    if (waiting_for_mouseup)
        return;

    wait_for_mouseup(function() {
        var sel = get_selection();
        var node = get_selection_node(sel);
    
        console.log(sel); }); }

function wait_for_mouseup(next) {
    function handler() {
        waiting_for_mouseup = false;
        window.removeEventListener('mouseup', handler);
        next() }

    waiting_for_mouseup = true;
    window.addEventListener('mouseup', handler); }

function get_selection() {
    if (typeof window.getSelection != "undefined") 
        return window.getSelection();
    else if (document.selection.type == "Text") 
        return document.selection; 

    return false; }

function get_selection_html(sel) {
    var html = "";
    if (sel.rangeCount) {
        var container = document.createElement("div");
        for (var i = 0, len = sel.rangeCount; i < len; ++i) 
            container.appendChild(sel.getRangeAt(i).cloneContents()); 
            
        html = container.innerHTML; }
    else {
        if (sel.type == "Text") 
            html = sel.createRange().htmlText; }

    return html; }

function css_path(el){
    var names = [];

    do {
        var info = {id: el.id,
                    name: el.tagName,
                    classes: (el.classList && to_array(el.classList))};

        for (var i = 1, e = el; 
             e.previousElementSibling;
             e = e.previousElementSibling, i++);
        info.nth_child = i; 

        names.push(info); }
    while (el=el.parentNode);

  return names; }

function get_block(el) {
    if (member(['block', 'inline-block'],
               getComputedStyle(el).display))
        return el;
    return get_block(el.parentNode); }

function popup_beside(el) {
    var block = get_block(el);
    var bounds = get_bounds(block);
    var el_bounds = (el == block ? bounds : get_bounds(block));
    var body_bounds = document.body.getBoundingClientRect();
    var popup = document.createElement("div");
    var popup_left = bounds.left + bounds.width + 15;

    popup.innerHTML = 'popup is a popup oh yes it is tra-la-la-la!';
    popup.className = 'frame-popup'; 
    set_styles(popup, {position: 'absolute',
                       top: (el_bounds.top + 10) + 'px',
                       left: popup_left + 'px',
                       minWidth: '100px',
                       maxWidth: Math.max(body_bounds.width - popup_left, 400) + 'px'});

    document.body.appendChild(popup); 
    return popup; }

function get_selection_node(selection) {
    var anchor = selection.anchorNode;
    if (anchor.nodeName == "#text")
        anchor = anchor.parentNode;

    return anchor; }

function highlight_selection(sel) {}
    
function init() {
    var css = function (){
        /*start
          .frame-popup {
          padding : 15px;
          border: 1px solid #555;
          background-color: white;
          boxShadow: '1px 1px 4px 0px rgba(0,0,0,0.3); }
          
          end*/
    }.toString().replace("/*start",'').replace("end*/",'').slice(14,-1).trim();
    add_style(css);

    if(window === top)
        document.addEventListener('selectionchange', on_selection_change);  }

if (member(["interactive", "complete"], document.readyState))
    init(); 
else 
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") 
            init(); };
