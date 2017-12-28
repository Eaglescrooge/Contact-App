var CORE = require("./core.js");

    function listen(evt, module_id) {
        CORE.registerEvents(evt, module_id);
    }

    function notify(evt) {
        CORE.triggerEvents(evt);
    }


    module.exports.listen = listen;
    module.exports.notify = notify;
