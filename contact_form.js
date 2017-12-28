define(["./sandbox"], function (sb) {

    var id, name, phone, el, add;

    id = "add-contact";

    function init() {
        el = document.getElementById("add-contact");
        name = el.getElementsByClassName("contact-name")[0];
        phone = el.getElementsByClassName("phone-number")[0];
        add = el.getElementsByClassName("submit")[0];

        $on(add, "click", addContact);

        sb.listen({ "show-up": showForm }, id);
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

    return {
        id: id,
        init: init,
        addContact: addContact,
        showForm: showForm
    }

})