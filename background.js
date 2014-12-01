function get_widget_visibility() {
    var visibility = {};
    widgets.map(function(widget) {
        return visibility[widget.name] = (widget_enabled(widget)); }); 
    return visibility; }

function handle_message(message, sender, next) {
    console.log(message);
    console.log(next);
    if (message.command == 'init') {
        next({widget_visibility: get_widget_visibility()}); }}

chrome.runtime.onMessage.addListener(handle_message);
chrome.browserAction.onClicked.addListener(
    function() {
        send_message_to_tabs({command: 'toggle_popup'}); });
                              

