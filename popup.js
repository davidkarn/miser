function handle_message(command, handler) {
    message_handlers[command] = handler; }

function post_message(message) {
    return window.parent.postMessage(message,
                                     '*'); }

var message_handlers = {};
var message_history = [];
function receiveMessage(event){
    var msg = event.data || event;
    var command = msg.command;

    if (command == 'init') {
        var root_url       = msg.root_url,
            root_title     = msg.root_title,
            visibility     = msg.widgets;
    
        var popup = sel('#share_block_popup');
        var boxes = sel('#share-block-box-widgets');
        var bars  = sel('#share-block-bar-widgets');
        create_widgets(boxes, widgets.filter(param_tester('type', 'box')), 
                       root_url, root_title, visibility);
        create_widgets(bars,  widgets.filter(param_tester('type', 'bar')),
                       root_url, root_title, visibility); }}


window.addEventListener("message", receiveMessage, false);

function init() {
    post_message({command: 'init'});
    sel('#settings').onclick = function() {
	post_message({command: 'go-to-miser-settings'}); }; 
    sel('#disable').onclick = function() {
	sel('#disable').style.display = 'none';
	sel('#enable').style.display = 'block';
	post_message({command: 'miser-disable'}); };
    sel('#enable').onclick = function() {
	sel('#disable').style.display = 'block';
	sel('#enable').style.display = 'none';
	post_message({command: 'miser-enable'}); }; }

if (member(["interactive", "complete"], document.readyState))
    init(); 
else
    document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
            init(); }};    

