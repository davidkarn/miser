function get_widget_visibility() {
    var visibility = {};
    widgets.map(function(widget) {
        return visibility[widget.name] = (widget_enabled(widget)); }); 
    return visibility; }

function handle_message(message, sender, next) {
    if (message.command == 'miser-enable')
        remove_disabled_url(message.url);

    if (message.command == 'miser-disable')
        add_disabled_url(message.url);
    
    if (message.command == 'go-to-miser-settings')
        chrome.tabs.create({url: get_url('options.html')});
    
    if (message.command == 'init') {
        next({widget_visibility: get_widget_visibility()}); }}

chrome.runtime.onMessage.addListener(handle_message);
chrome.browserAction.onClicked.addListener(
    function() {
        send_message_to_active_tab({command: 'toggle_popup'}); });
                              

