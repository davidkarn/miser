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

define_widget('twitter', function(url, title) {
    return '<iframe scrolling="no" frameborder="0" allowtransparency="true" '
    + 'src="https://platform.twitter.com/widgets/tweet_button.html?_version=2&amp;'
    + 'count=vertical&amp;enableNewSizing=false&amp;id=twitter-widget-6&amp;lang=en&amp;'
    + 'original_referer=' + url + '&amp;size=m&amp;text=' + title + '&amp;'
    + 'url=' + url + '" class="twitter-share-button twitter-count-vertical" '
    + 'style="width: 55px; height: 62px;" title="Twitter Tweet Button"></iframe>'; });

define_widget('google_plus', function(url, title) {
    return '<iframe width="100%" scrolling="no" frameborder="0" title="+1" vspace="0" '
        + 'tabindex="-1" style="position: static; left: 0pt; top: 0pt; width: 60px; '
        + 'margin: 0px; border-style: none; visibility: visible; height: 60px;" '
        + 'src="https://plusone.google.com/_/+1/fastbutton?url=' + url + '&amp;size=tall'
        + '&amp;count=true&amp;hl=en-US&amp;jsh=m%3B%2F_%2Fapps-static%2F_%2Fjs%2Fgapi'
        + '%2F__features__%2Frt%3Dj%2Fver%3Dt1NEBxIt2Qs.es_419.%2Fsv%3D1%2Fam'
        + '%3D!Xq7AzNfn9_-I0e5PyA%2Fd%3D1%2F#id=I1_1328906079806&amp;parent='
        + url + '&amp;rpctoken=615138222&amp;_methods=onPlusOne%2C_ready%2C_close%2C'
        + '_open%2C_resizeMe%2C_renderstart" name="I1_1328906079806" marginwidth="0"'
        + 'marginheight="0" id="I1_1328906079806" hspace="0" allowtransparency="true">'
        + '</iframe>'; });

function create_widgets() {
    var html = '';
    var title = (document.body.querySelector('title'));
    title = (title && title.innerHTML) || '';
    for (var i in widgets)
        html += ('<div class="widget">'
                 + widgets[i](window.location.href, title)
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
