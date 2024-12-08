// Preload js to remove the loader div
window.addEventListener("load", () => {
    const loader = document.querySelector('.loader');

    loader.addEventListener('animationend', () => {
        loader.remove();
    });
});

// Typed.js animation for home section
let typed = new Typed('#animation', {
    strings: ['Multimedia Designer.'],
    typeSpeed: 100,
    backspeed: 5,
    backDelay: 3000,
    loop: true
    });

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

    });
};

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

    for (let i = 0; i < filterItems.length; i++) {

        if (selectedValue === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

    });

};

// Email validation functions 
function validateEmail(email) {
    // regex validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Phone number validation functions 
function validatePhoneNumber(phone) {
    // regex validation
    return /^\d{10,12}$/.test(phone); // check for 10-12 digit numbers
}

// Toast notification after submit the form
function popUp() {

     // Trigger the <a> link to navigate to #contact
    const link = document.getElementById('contact-link');
    if (link) {
        link.click();
    }
    
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        customClass: {
            container: 'swal2-toast', 
            popup: 'swal2-toast-border'
        }
    });
    
    // bool to check if data fields are null
    let isValid = true; 

    // Get individual input fields
    const fullName = document.getElementById('input-name');
    const email = document.getElementById('input-email');
    const phone = document.getElementById('input-phoneNo');
    const subject = document.getElementById('input-subject');
    const message = document.getElementById('input-msg');

    // Validate each field and display the first error encountered
    if (!fullName.value.trim()) {
        Toast.fire({
            icon: "error",
            title: "Invalid name!",
            iconColor: "#FFA31A",
        });
        isValid = false;
        return; 
    }

    if (!validateEmail(email.value.trim())) {
        Toast.fire({
            icon: "error",
            title: "Invalid email!",
            iconColor: "#FFA31A",
        });
        isValid = false;
        return;
    }

    if (!validatePhoneNumber(phone.value.trim())) {
        Toast.fire({
            icon: "error",
            title: "Invalid phone number!",
            iconColor: "#FFA31A",
        });
        isValid = false;
        return;
    }

    if (!subject.value.trim()) {
        Toast.fire({
            icon: "error",
            title: "Invalid subject!",
            iconColor: "#FFA31A",
        });
        isValid = false;
        return;
    }

    if (!message.value.trim()) {
        Toast.fire({
            icon: "error",
            title: "Invalid message!",
            iconColor: "#FFA31A",
        });
        isValid = false;
        return;
    }

    // If all data fields are not null, prompt success message
    if (isValid) {
        Toast.fire({
            icon: "success",
            title: "Send Message Successfully",
            iconColor: "#FFA31A",
        });

        // Send the form data using fetch
        fetch("https://formsubmit.co/ajax/jingfeilaw@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: fullName.value,
                email: email.value,
                phone: phone.value,
                subject: subject.value,
                message: message.value
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));

        // Clear all input fields
        [fullName, email, phone, subject, message].forEach(field => field.value = '');
    }
}

// Responsive navigation bar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Navigation link will be highlighted 
function handleScroll() {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id'); 

        // Check if the section is in view
        if (top >= offset && top < offset + height) {
            // Deactivate all active link
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Activate the correct link
            let targetLink = document.querySelector(`header nav a[href*="${id}"]`); 
            if (targetLink) { 
                targetLink.classList.add('active');
            }
        }
    });
}

let scrolling = false; 

// Optimize scroll handling
function requestScrollUpdate() {
    if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(() => {
            handleScroll();
            // Allow the next scroll update
            scrolling = false;
        });
    }
}

// Event listener for scroll to be responsive
window.addEventListener('scroll', requestScrollUpdate);

// For phone view
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Redirect to home section after reload
window.onload = function() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' }); // For smooth scrolling
    }
};

const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
});
