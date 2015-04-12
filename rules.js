var fs = require('fs');
eval(fs.readFileSync(__dirname + '/global.js')+'');

// href match data-href also
var social_tagnames = ['facebook', 'twitter', 'google+', 'google-plus', 'email',
                       'googleplus', 'linkedin', 'stumbleupon', 'delicious', 'google',
                       'friendfeed', 'digg', 'reddit', 'pinterest', 'tumblr', 
                       'youtube', 'rss', 'pinterest', 'instagram', 'digg', 'print'];

function inject_tagnames(str, eq) {
    return social_tagnames.map(function(tagname) {
        return str.replace('<>', tagname); }); }

function get_keys(obj) {
    var kys = [];
    for (var i in obj) 
        kys.push(i);

    return kys; }

function process_rules(rules) {
    return rules.map(function(rule) {
        var keys = get_keys(rule)
            .filter(not_tester('tag'));
        var key = keys[0];
        var values = rule[key];

        var tags = rule['tag'];
        if (!(tags instanceof Array))
            tags = [tags];
        return tags.map(function(tag) {
            return values.map(curry(build_selector, tag, key)); })
            .reduce(concat); })
        .reduce(concat); }

function build_selector(tag, attribute, value) {
    return tag + build_attr(attribute, value); }

function build_attr(attribute, value) {
    if (value == true)
        return '[' + attribute + ']';
    else {
        var val_part = '';
        var eq_part = '~=';

        if (value instanceof Array) {
            if (value[0] instanceof Array) 
                return value.map(curry(build_attr, attribute))
                    .join(""); 
            
            eq_part = value[0] + '=';
            val_part = value[1]; }
        else 
            val_part = value;

        return '[' + attribute + eq_part + '"' + val_part + '"]'; }}

var hrefs = [['*', 'twitter.com/intent/tweet'],
             ['*', 'plus.google.com/share'],
             ['*', 'pinterest.com/share'],
             ['*', 'api.addthis.com'],
             ['*', 'linkedin.com/share'],
             ['*', 'news.ycombinator.com/submitlink'],
             ['*', 'twitter.com/intent/tweet'],
             ['*', 'twitter.com/home?status='],
             ['*', 'twitter.com/share'],
             ['*', 'reddit.com/submit'],
             ['*', 'facebook.com/dialog/feed'],
             ['*', 'pinterest.com/pin/'],
             ['*', 'facebook.com/share'],
             ['*', 'stumbleupon.com/submit'],
             ['*', 'share.flipboard.com/bookmarklet'],
             ['*', 'AddToFavorites()'],
             ['*', 'digg.com/submit'],
             ['*', 'blogger.com/share']];

var rules = 
    [{tag: ['img', 'i', 'a', 'div'],
      "class": (['share-button',
                 'share-btn',
                 'at-share-btn',
                 'at4-share-btn',
                 'social-share',
                 'share-face',
                 ['^', 'aol-share-'],
                 'sharing-item',
                 ['*', 'addthis_button_'],
                 ['*', 'addthis_button'],
                 ['*', 'addthis_counter']]
                .concat(inject_tagnames('<>-icon'))
                .concat(inject_tagnames('pw-button-<>'))
                .concat(inject_tagnames('social-<>'))
                .concat(inject_tagnames('share-<>'))
                .concat(inject_tagnames('share_<>'))
                .concat(inject_tagnames('<>-aside'))
                .concat(inject_tagnames('<>Share'))
                .concat(inject_tagnames('icon-<>'))
                .concat(inject_tagnames('metro-<>')))},
     {tag: 'a',
      "data-share": [true]},
     {tag: 'a',
      "data-pin-href": [['*', 'pinterest.com']]},
     {tag: 'a',
      "data-pin-href": [['^', 'http://pinterest.com']]},
     {tag: ['li', 'span'],
      "class": (inject_tagnames('share-<>', '*')
                .concat(inject_tagnames('<>-share', '*')))},
     {tag: 'a',
      href: hrefs},
     {tag: 'a',
      id: [['^', 'article-sharebox']]},
     {tag: ['a', 'span', 'div'],
      onclick: hrefs},
     {tag: 'div',
      "class": ['sharedaddy', 'fb-share-button', 'fb_iframe_widget',
                'post-share-buttons', 'addthis_toolbox', 'addthis_default_style']},
     {tag: ['img', 'a', 'div'],
      alt: ([[['^', 'Follow'], ['~', 'on']],
            [['^', 'Like'], ['~', 'on']],
            [['^', 'Subscribe'], ['~', 'on']],
            [['^', 'Share'], ['~', 'on']]]
            .concat(social_tagnames.map(function(tag) {
                  return [['^', 'Follow'], ['~', tag]]; }))
            .concat(social_tagnames.map(function(tag) {
                return [['^', 'Like'], ['~', tag]]; }))
            .concat(social_tagnames.map(function(tag) {
                return [['^', 'Subscribe'], ['~', tag]]; }))
            .concat(social_tagnames.map(function(tag) {
                return [['^', 'Share'], ['~', tag]]; }))
            .concat(social_tagnames.map(function(tag) {
                return [['^', 'Tweet'], ['~', tag]]; })))},
     {tag: ['img', 'a', 'div'],
      title: ([[['^', 'Follow'], ['~', 'on']],
               [['^', 'Like'], ['~', 'on']],
               [['^', 'Subscribe'], ['~', 'on']],
               [['^', 'Share'], ['~', 'on']]]
              .concat(social_tagnames.map(function(tag) {
                  return [['^', 'Follow'], ['~', tag]]; }))
              .concat(social_tagnames.map(function(tag) {
                  return [['^', 'Like'], ['~', tag]]; }))
              .concat(social_tagnames.map(function(tag) {
                  return [['^', 'Subscribe'], ['~', tag]]; }))
              .concat(social_tagnames.map(function(tag) {
                  return [['^', 'Share'], ['~', tag]]; }))
              .concat(social_tagnames.map(function(tag) {
                  return [['^', 'Tweet'], ['~', tag]]; })))},
     {tag: ['span', 'div'],
      "data-role": [['*', 'socialshare_']]},
     {tag: 'li',
      "class": ['share-btn', 'share-button', 'Shares', ['^', 'shr-']]},
     {tag: ['ul', 'nav'],
      "class": ['social', 'share-links', 'sharebar', 'share', 'SM_Icons',
                'share-tools', 'social-icons', 'sharing-tools', 'newsharebar',
                'share-links', 'entry_sharing']},
     {tag: 'div',
      "class": [['*', 'share-button'], 'metro-social', 'share24', 'social', 
                ['*', 'sharrre'], ['*', 'socialShare'], 'sharingIcons', ['*', 'SocialMedia'],
                'pinterest-pinit', 'socialite-instance', 'socialite', 'social-stick',
                'social-icons-container', 'social-icons', 'js-sharecount',
                ['^', 'sharecount__'], 'aol-share', 'aside-left-social',
                'social-button-small', ['*', 'social-button'], 'social-bar',
                'social-share', 'sharing_toolbox', ['*', 'social_sharebar'], 
                'sharetools', 'social_buttons', ['*', 'social-likes'], 'social-box',
                'sharelinks', 'shareLinks', 'share', 'post-share', ['*', 'social-share'],
                'social-share-block', 'dd_outer', 'dd_inner', 'social-buttons',
                'article-social', 'share-controls', 'post-share-buttons', 'social_fix',
                'social_txt', 'i-share', ['*', 'shareaholic'], ['*', 'quickshare'],
                'sharedaddy', 'sd-content', 'shareStrip', 'socialLinksBot', 'post_share',
                'yeniShare', 'ShareIt', 'ShareItTop', 'share-area', 'share-item',
                ['^', 'sharing-palette'], ['^', 'store-share'], 'share-icon',
                'share-text', ['^', 'addtoany'], ['^', 'a2a_'], 'ShareCount',
                'ShareEntry', 'social-links', 'sm4_share', 'sm4ShareWidget',
                'shareFloat', 'shareNarrow', 'viralBadge', 'sharing-buttons',
                ['*', 'at4-share'], 'addthis_native_toolbox', 'teaser__social',
                'addthis_sharing_toolbox', 'share-btns', ['*', 'social-tools'], 
                'social-icon-box', 'sharebar', 'socialwrap', ['*', 'share_bar'],
                ['*', 'layout--share'], ['*', 'share__'], 'share-header', 'sharebar-outer', 'sharebar-inner', 'sharebar-share', 'sharebar-like', 'social-action', 
                ['*', 'social-toolbar'], ['*', 'SocialButton'], ['*', 'social-sidebar'],
                'content-sharing', 'vms-social', ['*', 'share-widget']]},
     {tag: ['menu', 'section', 'ul', 'div', 'aside', 'nav', 'a', 'span', 'li'],
      "class": [['*', 'social_badge'], ['*', 'social-bookmarking'], 'social', 'social_menu', 'socialwrap', 'share-bar', 'social-tools', 'ShareRail', ['*', '_pin_it_'],
                'social-bar',  ['*', 'sharrre'], 'shareActions',
                'share', ['*', 'social-buttons']]},
     {tag: ['menu', 'section', 'ul', 'div'],
      "id": ['social_badges', 'sharebar', 'social-count']},
     {tag: ['div','aside'],
      id: [['*', 'share-toolbar'], ['*', 'socialbar'], 'sharing', 'sharer',
           'socialToolbar', 'shareBar', 'article-sharebox',
           'stwrapper', 'stOverlay', 'Social-Box', 'Social-Sidebar', 'social-sidebar',
          'shareBarWrapper']},
//     {tag: 'fb:like'},
     {tag: 'span',
      "class": ['IN-widget', 'chicklets', 'sharethis', ['^', 'st_']]},
     {tag: 'iframe',
      src: [['*', '.twitter.com/widgets'],
            [['*', '://apis.google.com/'], ['*', 'sharebutton']],
            [['*', '://apis.google.com/'], ['*', 'fastbutton']],
            [['*', '://apis.google.com/'], ['*', 'badge/']],
            ['*', 'tmblr.com/share'],
            ['*', 'plusone.google.com/_/+1'],
            ['*', 'twitter.com/share'],
            ['*', 'facebook.com/plugins/facepile.php'],
            ['*', 'facebook.com/share'],
            ['*', 'plus.google.com/share'],
            ['*', 'twitter.com/intent/tweet'],
            ['*', 'addthis.com/static'],
            ['*', 'redditstatic.com/button'],
            ['*', 'reddit.com/static'],
            ['*', 'badge.stumbleupon.com/badge'],
            ['*', 'facebook.com/plugins/share_button'],
            ['*', 'facebook.com/plugins/like']]}];

var processed   = process_rules(rules);
var selector    = processed.join(", ");
var css         = selector + '{display:none !important;}';
var revert_css  = selector + '{display:block !important;}';

fs.writeFile("block.css", css, function(err) {
    if (err)
        console.log(err);
    else
        console.log('build block.css successfully'); });

fs.writeFile("revert-block.css", revert_css, function(err) {
    if (err)
        console.log(err);
    else
        console.log('build revert-block.css successfully'); });
