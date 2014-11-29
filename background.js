chrome.browserAction.onClicked.addListener(
    function() {
        send_message_to_tabs({command: 'toggle_popup'}); });
                              

