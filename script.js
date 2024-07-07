
document.addEventListener('DOMContentLoaded', (event) => {
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");
    var sidemenu = document.getElementById("sidemenu");
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    function opentab(tabname) {
        for (let tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (let tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    }

    function openmenu() {
        sidemenu.style.right = "0";
    }

    function closemenu() {
        sidemenu.style.right = "-200px";
    }

    // Adding event listeners to tab links
    for (let tablink of tablinks) {
        tablink.addEventListener('click', function() {
            opentab(this.dataset.tabname);
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        fetch('https://script.google.com/macros/s/AKfycbzJQKGuiTON3bA-zOZBOLFjp2BlaZhv3pP_ceWNSnyBov3V05nkKGWWV2WmEakJRqGXOw/exec', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => {
            msg.innerHTML = "Message sent successfully";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 5000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message));
    });
});
