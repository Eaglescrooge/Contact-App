window.$on = function (target, type, cb) {
    target.addEventListener(type, cb, false);
}

var CORE = require("./core.js"),
    contactForm = require("./contact_form.js"),
    contactDirectory = require("./contact_directory.js");

CORE.addModule(contactForm.id, contactForm);
CORE.addModule(contactDirectory.id, contactDirectory);

contactForm.init();
contactDirectory.init();