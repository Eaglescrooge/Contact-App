window.$on = function (target, type, cb) {
    target.addEventListener(type, cb, false);
}

define(["./core", "./contact_form", "./contact_directory"], function (CORE, contactForm, contactDirectory) {


CORE.addModule(contactForm.id, contactForm);
CORE.addModule(contactDirectory.id, contactDirectory);

contactForm.init();
contactDirectory.init();
})