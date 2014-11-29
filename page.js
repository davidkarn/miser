function get_popup() {
    return sel('div#share_block_popup'); }

function handle_message(msg) {
    if (msg.command == "toggle_popup") {
        var popup = get_popup();
        popup.style.display = (popup.style.display == "block"
                               ? "none"
                               : "block"); }}
        
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

    var html = function (){
    /*start
    <div class="widget">
     <iframe src="//www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;layout=box_count&amp;appId=301023846773439" scrolling="no" frameborder="0" style="border:none; overflow:hidden;" allowTransparency="true"></iframe>
    </div>
    end*/
    }.toString().replace("/*start",'').replace("end*/",'').slice(14,-1).trim();
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
