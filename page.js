var revert_block_style_link;
var widget_visibility;
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

    if (command == 'go-to-miser-settings')
        post_message(message);

    if (command == 'miser-disable') {
        revert_styles();
        message.url = window.location.href;
        post_message(message); }

    if (command == 'miser-enable') {
        enable_styles();
        message.url = window.location.href;
        post_message(message); }

    if (command == 'init') {
        var url   = window.top.location.href;
        var title = (document.body.querySelector('title'));
        title     = (title && title.innerHTML) || '';

        get_popup().contentWindow
            .postMessage({command:   'init',
                          widgets:    widget_visibility,
                          root_url:   url,
                          root_title: title}, '*'); }}

function create_popup() {
    if (get_popup()) return;

    var popup = document.createElement('iframe');
    set_attributes(popup, {
        id:            'share_block_popup',
//        src:           "https://davidkarn.github.io/miser/popup.html",
        src:           "http://miser.webdever.net/popup.html",
        scrolling:     'no',
        frameborder:   '0'});
    set_styles(popup, {
        border:      'none',
        display:     'none',
        position:    'fixed',
        top:         '15px',
        right:       '30px',
        width:       '350px',
        height:      '300px',
        opacity:     '1',
        zIndex:       99999999});
    document.body.appendChild(popup);  }

function revert_styles() {
    revert_block_style_link = document.createElement('link');
    revert_block_style_link.setAttribute('rel', 'stylesheet');
    revert_block_style_link.setAttribute('href', get_url('revert-block.css'));

    document.body.appendChild(revert_block_style_link); }

function enable_styles() {
    revert_block_style_link
        .parentElement
        .removeChild(revert_block_style_link); }

function post_message(msg, next) {
    chrome.runtime.sendMessage(msg, next); }

function init() {
    if (window === top) {
        //    window.addEventListener("message", receiveMessage, false);
        post_message({command: 'init'}, 
                     function(arg) {
                         console.log(arg);
                         widget_visibility = arg.widget_visibility; 
                         create_popup(); });
        window.addEventListener("message", handle_iframe_message, false);
        chrome.runtime.onMessage.addListener(handle_message); }}

if (member(["interactive", "complete"], document.readyState))
    init(); 
else 
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            init(); }};

