function get_popup() {
    return sel('div#share_block_popup'); }

function handle_message(msg) {
    if (msg.command == "toggle_popup") {
        var popup = get_popup();
        popup.style.display = (popup.style.display == "block"
                               ? "none"
                               : "block"); }}
        
var widgets = {};
function define_widget(name, initializer) {
    widgets[name] = initializer; }

define_widget('facebook', function(url) {
    var html = '';
    if (sel('div#fb-root'))
        html = '<div id="fb-root"></div>'
        + '<script>(function(d, s, id) {'
        + '    var js, fjs = d.getElementsByTagName(s)[0];'
        + '    if (d.getElementById(id)) return;'
        + '    js = d.createElement(s); js.id = id;'
        + '    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&appId=301023846773439&version=v2.0";'
        + '    fjs.parentNode.insertBefore(js, fjs);'
        + '}(document, "script", "facebook-jssdk"));</script>';

    return html + '<div class="fb-like" data-href="' 
        + url + '" data-layout="box_count" data-action="like" '
        + 'data-show-faces="true" data-share="false"></div>'; });

function create_widgets() {
    var html = '';
    for (var i in widgets)
        html += ('<div class="widget">'
                 + widgets[i](window.location.href)
                 + '</div>');
    return html; }

function create_popup() {
    if (get_popup()) return;

    var popup = document.createElement('div');
    set_attributes(popup, {
        id:            'share_block_popup',
        scrolling:     'no',
        frameborder:   '0'});
    set_styles(popup, {
        border:      'none',
        display:     'none',
        width:       '300px',
        height:      '100px',
        opacity:     '1',
        zIndex:       99999999});
    document.body.appendChild(popup); 

    var html = create_widgets();
    popup.innerHTML = html; }

/*    var popup = document.createElement('iframe');
    set_attributes(popup, {
        src:           chrome.extension.getURL('popup.html'),
        id:            'share_block_popup',
        scrolling:     'no',
        frameborder:   '0'});
    set_styles(popup, {
        position:    'fixed',
        top:         '15px',
        right:       '30px',
        border:      'none',
        display:     'none',
        width:       '300px',
        height:      '100px',
        opacity:     '1',
        zIndex:       99999999,
        background:  'none'});
    document.body.appendChild(popup); */

function init() {
    if (window === top) {
        //    window.addEventListener("message", receiveMessage, false);
        create_popup();
        chrome.runtime.onMessage.addListener(handle_message); }}

if (member(["interactive", "complete"], document.readyState))
    init(); 
else 
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            init(); }};
