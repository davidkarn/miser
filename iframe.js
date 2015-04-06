function post_message(message) {
    return window.parent.postMessage(message,
                                     '*'); }

function receiveMessage(event) {
    var msg = event.data || event;
    var cmd = msg.command;
    
    if (cmd == 'init_popup') {
        msg.command = 'init';
        sel('iframe').contentWindow.postMessage(msg, '*'); }
    else
        post_message(msg); }

window.addEventListener("message", receiveMessage, false);

