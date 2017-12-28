window.$on = function(target, type, cb) {
    target.addEventListener(type, cb, false);
}

var CORE = (function() {
    var modules = {};

    function addModule(module_id, mod) {
        modules[module_id] = mod;
    }

    function registerEvents(evt, module_id) {
        var theMod = modules[module_id];
        theMod.events = evt;
    }

    function triggerEvents(evt) {
        var mod;

        for(mod in modules) {
            if (modules.hasOwnProperty(mod)) {
                mod = modules[mod];
                if (mod.events && mod.events[evt.type]) {
                    mod.events[evt.type](evt.data);
                }
            }
        }
    }

    return {
        addModule: addModule,
        registerEvents: registerEvents,
        triggerEvents: triggerEvents
    }
})();

var sb = (function(){
    function listen(evt, module_id) {
        CORE.registerEvents(evt, module_id);
    }

    function notify(evt) {
        CORE.triggerEvents(evt);
    }

    return {
        listen: listen,
        notify: notify
    }
})();

var contactForm = (function() {
    var id, name, phone, el, add;

    id = "add-contact";

    function init() {
        el = document.getElementById("add-contact");
        name = el.getElementsByClassName("contact-name")[0];
        phone = el.getElementsByClassName("phone-number")[0];
        add = el.getElementsByClassName("submit")[0];

        $on(add, "click", addContact);

        sb.listen({"show-up": showForm}, id);
    }

    function addContact(e) {
        var contactDetails = {};

        contactDetails.name = name.value;
        contactDetails.phone = phone.value;

        sb.notify({
            type: "contacts",
            data: contactDetails
        })
        
        el.classList.toggle("module-active");

        e.preventDefault();
    }

    function showForm() {
        el.classList.toggle("module-active");
    }

    return{
        id: id,
        init: init,
        addContact: addContact,
        showForm: showForm
    }
})();

var contactDirectory = (function() {
    var id, el, list, add;

    id = "show-contacts";

    function init() {
        el = document.getElementById("contacts");
        list = document.getElementById("contact-list");
        add = el.getElementsByClassName("add-contact")[0];

        sb.listen({"contacts": addListing}, id);

        $on(add, "click", closeDirectory)        
    }

    function addListing(contact) {
        var li = document.createElement("li");

        var name = document.createElement("p");
        var nameNodeVal = document.createTextNode(contact.name);
        name.appendChild(nameNodeVal);

        var phone = document.createElement("p");
        var phoneNodeVal = document.createTextNode(contact.phone);
        phone.appendChild(phoneNodeVal);

        li.appendChild(name);
        li.appendChild(phone);

        list.appendChild(li);

        el.classList.toggle("module-active");
    }

    function closeDirectory(e) {
        sb.notify({
            type: "show-up",
            data: null
        });

        el.classList.toggle("module-active");

        e.preventDefault();
    }

    return {
        id: id,
        init: init,
        addListing: addListing,
        closeDirectory: closeDirectory
    }
})();

CORE.addModule(contactForm.id, contactForm);
CORE.addModule(contactDirectory.id, contactDirectory);

contactForm.init();
contactDirectory.init();