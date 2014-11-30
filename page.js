function get_popup() {
    return sel('iframe#share_block_popup'); }

function handle_message(msg) {
    if (msg.command == "toggle_popup") {
        var popup = get_popup();
        popup.style.display = (popup.style.display == "block"
                               ? "none"
                               : "block"); }}

function handle_iframe_message(event){
    var message = event.data;
    var command = message.command;

    if (command == 'init') {
        var url = window.top.location.href;
        var title = (document.body.querySelector('title'));
        title = (title && title.innerHTML) || '';

        get_popup().contentWindow
            .postMessage({command:   'init',
                          root_url:   url,
                          root_title: title}, '*'); }}

function create_popup() {
    if (get_popup()) return;

    var popup = document.createElement('iframe');
    set_attributes(popup, {
        id:            'share_block_popup',
        src:           chrome.extension.getURL('popup.html'),
        scrolling:     'no',
        frameborder:   '0'});
    set_styles(popup, {
        border:      'none',
        display:     'none',
        position:    'fixed',
        top:         '15px',
        right:       '30px',
        width:       '450px',
        height:      '250px',
        opacity:     '1',
        zIndex:       99999999});
    document.body.appendChild(popup);  }

function init() {
    if (window === top) {
        //    window.addEventListener("message", receiveMessage, false);
        create_popup();
        window.addEventListener("message", handle_iframe_message, false);
        chrome.runtime.onMessage.addListener(handle_message); }}

if (member(["interactive", "complete"], document.readyState))
    init(); 
else 
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            init(); }};
