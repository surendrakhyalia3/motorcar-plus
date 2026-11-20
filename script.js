// =====================================
// MOTORCAR PLUS - JAVASCRIPT
// =====================================


// 1. CREATE FORM DESIGN

const style = document.createElement("style");

style.textContent = `
.insurance-form-section {
    display: none;
    padding: 50px 20px;
    background: #eef7f8;
}

.insurance-form-section.active {
    display: block;
}

.form-container {
    max-width: 650px;
    margin: auto;
    background: white;
    padding: 35px;
    border-radius: 15px;
    box-shadow: 0 5px 25px rgba(0,0,0,0.08);
}

.form-container h2 {
    text-align: center;
    color: #092f43;
    margin-bottom: 10px;
}

.form-container p {
    text-align: center;
    color: #617581;
    margin-bottom: 25px;
}

.form-group {
    margin-bottom: 18px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #12394c;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 13px;
    border: 1px solid #ccdadd;
    border-radius: 7px;
    font-size: 15px;
    outline: none;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #13a99e;
}

.form-submit {
    width: 100%;
    padding: 14px;
    background: #0a7180;
    color: white;
    border: none;
    border-radius: 7px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}

.form-submit:hover {
    background: #092f43;
}

.vehicle-card {
    cursor: pointer;
}

.vehicle-card.selected {
    border: 2px solid #13a99e;
    background: #e4f8f5;
}

.service-card {
    cursor: pointer;
}

.service-card.selected {
    border: 2px solid #13a99e;
    background: #e4f8f5;
}

.success-message {
    display: none;
    padding: 18px;
    margin-top: 20px;
    background: #e1f8ed;
    color: #14643c;
    border-radius: 8px;
    text-align: center;
}

@media(max-width: 600px) {
    .form-container {
        padding: 22px 16px;
    }
}
`;

document.head.appendChild(style);


// 2. CREATE FORM SECTION

const formSection = document.createElement("section");

formSection.className = "insurance-form-section";
formSection.id = "insuranceForm";

formSection.innerHTML = `

    <div class="form-container">

        <h2>Get Insurance Assistance</h2>

        <p>Fill in your details to connect with our advisor.</p>

        <form id="customerForm">

            <div class="form-group">
                <label>Selected Vehicle</label>
                <input type="text" id="vehicleName" readonly>
            </div>

            <div class="form-group">
                <label>Insurance Type</label>
                <input type="text" id="insuranceType" readonly>
            </div>

            <div class="form-group">
                <label>Your Full Name</label>
                <input type="text" id="customerName"
                placeholder="Enter your name" required>
            </div>

            <div class="form-group">
                <label>Mobile Number</label>
                <input type="tel" id="customerPhone"
                placeholder="Enter 10 digit mobile number"
                pattern="[6-9][0-9]{9}" maxlength="10" required>
            </div>

            <div class="form-group">
                <label>Vehicle Model</label>
                <input type="text" id="vehicleModel"
                placeholder="Enter vehicle model" required>
            </div>

            <div class="form-group">
                <label>Registration Year</label>
                <input type="number" id="vehicleYear"
                placeholder="Example: 2024"
                min="1900" required>
            </div>

            <div class="form-group">
                <label>Fuel Type</label>
                <select id="fuelType" required>
                    <option value="">Select Fuel Type</option>
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>CNG</option>
                    <option>Electric</option>
                    <option>Hybrid</option>
                    <option>Other</option>
                </select>
            </div>

            <div class="form-group">
                <label>City</label>
                <input type="text" id="customerCity"
                placeholder="Enter your city" required>
            </div>

            <div class="form-group">
                <label>Additional Message</label>
                <textarea id="customerMessage"
                rows="3"
                placeholder="Any additional information"></textarea>
            </div>

            <button type="submit" class="form-submit">
                Submit Enquiry
            </button>

        </form>

        <div class="success-message" id="successMessage">
            <h3>Enquiry Form Completed!</h3>
            <p>
                This is a demo confirmation.
                Your details have NOT been sent to the agent.
            </p>
        </div>

    </div>
`;


// Insert form before footer

const footer = document.querySelector("footer");

if (footer) {
    document.body.insertBefore(formSection, footer);
}


// 3. VEHICLE SELECTION

const vehicleCards = document.querySelectorAll(".vehicle-card");

let selectedVehicle = "";

vehicleCards.forEach(function(card) {

    card.addEventListener("click", function() {

        vehicleCards.forEach(function(item) {
            item.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedVehicle = card.querySelector("h3").textContent;

        openInsuranceForm("");

    });

});


// 4. INSURANCE SERVICE SELECTION

const serviceCards = document.querySelectorAll(".service-card");

let selectedService = "";

serviceCards.forEach(function(card) {

    card.addEventListener("click", function() {

        serviceCards.forEach(function(item) {
            item.classList.remove("selected");
        });
        card.classList.add("selected");

        selectedService = card.querySelector("h3").textContent;

        if (!selectedVehicle) {

            alert("Please select your vehicle first!");

            document.querySelector("#vehicles").scrollIntoView({
                behavior: "smooth"
            });

            return;
        }

        openInsuranceForm(selectedService);

    });

});


// 5. OPEN INSURANCE FORM
function openInsuranceForm(service) {

    document.getElementById("vehicleName").value =
        selectedVehicle;

    document.getElementById("insuranceType").value =
        service;

    document.getElementById("successMessage").style.display =
        "none";

    document.getElementById("customerForm").style.display =
        "block";

    formSection.classList.add("active");

    showPage(formSection);
}
// 6. FORM SUBMISSION

const customerForm = document.getElementById("customerForm");
customerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const phone = document.getElementById("customerPhone").value;

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        alert("Please enter a valid 10 digit mobile number.");
        return;
    }

    const year = Number(
        document.getElementById("vehicleYear").value
    );

    if (year > new Date().getFullYear() + 1) {
        alert("Please enter a valid registration year.");
        return;
    }

    let message = "MOTORCAR PLUS - NEW ENQUIRY\n\n";

    const fields = customerForm.querySelectorAll(
        "input, select, textarea"
    );

    fields.forEach(function(field) {

        if (
            field.type === "submit" ||
            field.type === "button" ||
            field.type === "hidden" ||
            field.type === "checkbox" && !field.checked ||
            field.type === "radio" && !field.checked ||
            !field.value.trim()
        ) {
            return;
        }

        const label =
            field.closest(".form-group")
            ?.querySelector("label")
            ?.textContent.trim() ||
            field.id ||
            "Details";

        message += label + ": " + field.value + "\n";
    });

    message += "\nPlease contact this customer.";

    const whatsappURL =
        "https://wa.me/919785256690?text=" +
        encodeURIComponent(message);

    const whatsappWindow = window.open(
        whatsappURL,
        "_blank"
    );

    if (whatsappWindow) {

        document.getElementById("customerForm").style.display =
            "none";

        const successMessage =
            document.getElementById("successMessage");

        successMessage.textContent =
            "WhatsApp opened! Please press SEND to submit your enquiry to the agent.";

        successMessage.style.display = "block";

        successMessage.scrollIntoView({
            behavior: "smooth"
        });

    } else {
        alert("Please allow pop-ups to open WhatsApp.");
    }

});


// 7. GET QUOTE BUTTON
const quoteButton = document.querySelector(".header-btn");

quoteButton.addEventListener("click", function(event) {

    event.preventDefault();

    showPage(document.querySelector("#vehicles"));

});

console.log("Motorcar Plus JavaScript Loaded Successfully!");
// =================================
// MOTORCAR PLUS PAGE NAVIGATION
// =================================

const allPages = [
    document.querySelector("#home"),
    document.querySelector("#vehicles"),
    document.querySelector("#services"),
    document.querySelector("#about"),
    document.querySelector("#contact"),
    document.querySelector("#quote"),
    formSection
];

// Show only selected page

function showPage(selectedPage) {

    allPages.forEach(function(page) {
        page.classList.add("page-hidden");
    });

    selectedPage.classList.remove("page-hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Navigation menu clicks

const navigationLinks = document.querySelectorAll(
    ".header nav a, .logo"
);

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const targetId = link.getAttribute("href").substring(1);

        const targetPage = document.getElementById(targetId);

        if (targetPage) {
            showPage(targetPage);
        }

    });

});


// Open Home Page by default

showPage(document.querySelector("#home"));
const exploreButton = document.querySelector(
    '.hero-content a[href="#vehicles"]'
);

exploreButton.addEventListener("click", function(event) {
    event.preventDefault();

    showPage(document.querySelector("#vehicles"));
});