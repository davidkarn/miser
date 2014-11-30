var widgets = [];
function define_widget(name, widget) {
    widget.name = name;
    widgets.push(widget); }

define_widget(
    'facebook', 
    {type: 'box',
     display: true,
     fn: function(div, url) {
         var html = '';
         if (sel('div#fb-root'))
             document.body.appendChild(
                 create_element('div', {id: "fb-root"}));

             (function(d, s, id) {
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) return;
                 js = d.createElement(s); js.id = id;
                 js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&appId=301023846773439&version=v2.0";
                 fjs.parentNode.insertBefore(js, fjs);
             }(document, "script", "facebook-jssdk"));

         return html + '<div class="fb-like" data-href="' 
             + url + '" data-layout="box_count" data-action="like" '
             + 'data-show-faces="true" data-share="false"></div>'; }});

define_widget(
    'twitter', 
    {type: 'box',
     display: true,
     fn: function(div, url, title) {
         return '<iframe scrolling="no" frameborder="0" allowtransparency="true" '
             + 'src="https://platform.twitter.com/widgets/tweet_button.html?_version=2&amp;'
             + 'count=vertical&amp;enableNewSizing=false&amp;id=twitter-widget-6&amp;lang=en&amp;'
             + 'original_referer=' + url + '&amp;size=m&amp;text=' + title + '&amp;'
             + 'url=' + url + '" class="twitter-share-button twitter-count-vertical" '
             + 'style="width: 55px; height: 62px;" title="Twitter Tweet Button"></iframe>'; }});

define_widget(
    'google_plus', 
    {type: 'box',
     display: true,
     fn: function(div, url, title) {
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
             + '</iframe>'; }});

define_widget(
    'linked_in', 
    {type: 'box',
     display: true,
     fn: function(div, url, title) {
         div.appendChild(
             create_element('script', 
                            {src:  'https://platform.linkedin.com/in.js',
                             type: 'text/javascript'},
                            ' lang: en_US'));
         div.appendChild(
             create_element('script',
                            {type: 'IN/Share',
                             'data-counter': 'top'}));
         return div; }});

define_widget(
    'pin_it', 
    {type: 'bar',
     display: true,
     fn: function(div, url, title) {
         div.appendChild(
             create_element(
                 'a', {
                     href:              'https://www.pinterest.com/pin/create/button/',
                     'data-pin-do':     'buttonBookmark',
                     'data-pin-color':  'red'},
                 '<img src="https://assets.pinterest.com/images/pidgets/pinit_fg_en_rect_red_20.png" />'));
         !function(a,b,c){var d,e,f;f="PIN_"+~~((new Date).getTime()/864e5),a[f]||(a[f]=!0,a.setTimeout(function(){d=b.getElementsByTagName("SCRIPT")[0],e=b.createElement("SCRIPT"),e.type="text/javascript",e.async=!0,e.src=c,d.parentNode.insertBefore(e,d)},10))}(window,document,"https://assets.pinterest.com/js/pinit_main.js"); 
         return div; }});

define_widget(
    'reddit', 
    {type: 'box', 
     display: true,
     fn: function(div, url, title) {
         div.appendChild(
             create_element('iframe', {
                 id: 'reddit-widget',
                 frameborder: 0,
                 src: "https://www.redditstatic.com/button/button2.html?url="
                     + encodeURIComponent(url)
                     + '&title=' + encodeURIComponent(title)})); 
         return div; }});

define_widget(
    'hacker_news', 
    {type: 'box',
     display: false,
     fn: function(div, url, title) {
/*         div.appendChild(
             create_element('a', {href:         "https://news.ycombinator.com/submit",
                                  'class':      "hn-button",
                                  'data-title':  title,
                                  'data-url':    url,
                                  width:        '55px',
                                  'data-count': "vertical"},
                            'Vote on Hacker News'));
         div.appendChild(
             create_element(
                 'script', {type: 'text/javascript'},
                 ('var HN=[];HN.factory=function(e){return function(){'
                  + 'HN.push([e].concat(Array.prototype.slice.call(arguments,0)))};},HN.on='
                  + 'HN.factory("on"),HN.once=HN.factory("once"),HN.off=HN.factory("off"),'
                  + 'HN.emit=HN.factory("emit"),HN.load=function(){var e="hn-button.js";'
                  + 'if(document.getElementById(e))return;var t=document.createElement("script");'
                  + 't.id=e,t.src="https://hn-button.herokuapp.com/hn-button.js";var n='
                  + 'document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)},'
                  + 'HN.load();')));*/
         div.appendChild(
             create_element('iframe', {
                 src:           ("http://hn-button.herokuapp.com?title=" 
                                 + title + "t&url=" + url + "&count=vertical"),
                 name:          "hn-button-dyolxfj",
                 id:            "hn-button-dyolxfj",
                 "class":       "hn-button",
                 'data-title':  title,
                 'data-url':    url,
                 'data-count':  "vertical",
                 title:         "Hacker News Button",
                 height:        "62",
                 width:         "49",
                 frameborder:   "0"}));
         return div; }});

define_widget(
    'stumbleupon', 
    {type: 'box',
     display: false,
     fn: function(div, url, title) {
         div.appendChild(
             create_element('su:badge', {layout: 5}));
         div.appendChild(
             create_element('script', {type: 'text/javascript'},
                            '(function() {'
                            + 'var li = document.createElement("script"); '
                            + 'li.type = "text/javascript"; li.async = true; '
                            + 'li.src = ("https:" == document.location.protocol ? '
                            + '"https:" : "http:") + '
                            + '"//platform.stumbleupon.com/1/widgets.js";'
                            + 'var s = document.getElementsByTagName("script")[0]; '
                            + 's.parentNode.insertBefore(li, s);'
                            + '})();'));
         return div; }});

define_widget(
    'tumblr', 
    {type: 'bar',
     display: true,
     fn: function(div, url, title) {
         var tumblr_link_url         = url;
         var tumblr_link_name        = title;
         var tumblr_link_description = title;

         div.appendChild(
             create_element(
                 "a", 
                 {href: ("http://www.tumblr.com/share/link?url=" 
                         + encodeURIComponent(tumblr_link_url) + "&name=" 
                         + encodeURIComponent(tumblr_link_name) + 
                         "&description="
                         + encodeURIComponent(tumblr_link_description)),
                  id:  "share-block-tumblr",
                  title: "Share on Tumblr",
                  style: ("display:inline-block; text-indent:-9999px; "
                          + "overflow:hidden; width:81px; height:20px; "
                          + "background:url"
                          + "('https://platform.tumblr.com/v1/share_1.png')"
                          + "top left no-repeat transparent;")},
                 "Share on Tumblr"));
         return div; }});

define_widget(
    'del.icio.us', 
    {type: 'bar',
     display: false,
     fn: function(div, url, title) {
         var a = create_element('a', 
                                {href: "#",
                                 onclick: "window.open('https://delicious.com/save?v=5"
                                 + "&provider=ShareBlock&noui&jump=close&url='+"
                                 + "encodeURIComponent(location.href)+'&title='+"
                                 + "encodeURIComponent(document.title), "
                                 + "'delicious','toolbar=no,width=550,height=550'); "
                                 + "return false;"});
         a.appendChild(
             create_element('img', 
                            {src: "https://delicious.com/img/logo.png",
                             height: "16",
                             width: "16",
                             alt: "Delicious"}));
         a.appendChild(create_text("Save this on Delicious"));

         div.appendChild(a);
         return div; }});

function create_widgets(body, widgets, url, title) {
    var html = '';

    widgets.map(function(widget) {
        var div = document.createElement('div');
        div.className = 'share-block-widget';

        html = widget.fn(div, url, title);
        if (typeof html == "string")
            div.innerHTML = html;
        else
            div = html; 
        body.appendChild(div); }); }

