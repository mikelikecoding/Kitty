// Simulated Cat Data
// Updated main.js with all 24 cat data
// Initialize cat data
// Simulated Cat Data

const catData = [
  { number: 0, name: "Carolyn", images: "./images/cat0.jpg" },
  { number: 1, name: "Aaron", images: "./images/cat1.jpg" },
  { number: 2, name: "Arman", images: "./images/cat2.jpg" },
  { number: 3, name: "Brad", images: "./images/cat3.jpg" },
  { number: 4, name: "Candi", images: "./images/cat4.jpg" },
  { number: 5, name: "Chris", images: "./images/cat5.jpg" },
  { number: 6, name: "Erica", images: "./images/er.jpg" },
  { number: 7, name: "Jen", images: "./images/cat7.jpg" },
  { number: 8, name: "Leslie", images: "./images/cat8.jpg" },
  { number: 9, name: "Tessa", images: "./images/cat9.jpg" },
  { number: 10, name: "Carol", images: "./images/cat10.jpg" },
  { number: 11, name: "Jim", images: "./images/cat11.jpg" },
  { number: 12, name: "Ramon", images: "./images/cata.jpg" },
  { number: 13, name: "Bradly", images: "./images/cat13.jpg" },
  { number: 14, name: "Sindi", images: "./images/cat14.jpg" },
  { number: 15, name: "Clark", images: "./images/cat15.jpg" },
  { number: 16, name: "Eric", images: "./images/cat16.jpg" },
  { number: 17, name: "Jan", images: "./images/cat17.jpg" },
  { number: 18, name: "Lee", images: "./images/cat18.jpg" },
  { number: 19, name: "Tammy", images: "./images/cat19.jpg" },
  { number: 20, name: "Rick", images: "./images/cat20.jpg" },
  { number: 21, name: "Erin", images: "./images/cat21.jpg" },
  { number: 22, name: "Larry", images: "./images/cat22.jpg" },
  { number: 23, name: "Stacy", images: "./images/cat23.jpg" },
];

if (!localStorage.getItem("catData")) {
  localStorage.setItem("catData", JSON.stringify(catData));
}

// LOG PAGE
function logPageLogic() {
  const form = document.getElementById("form");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(formValues);
    localStorage.setItem("users", JSON.stringify(users));

    formMessage.innerHTML = `<p>Form submitted successfully! Thank you, ${formValues.first} ${formValues.last}.</p>`;

    // Redirect to rescue.html after 2 seconds
    setTimeout(() => {
      window.location.href = "rescue.html";
    }, 2000);

    form.reset();
  });
}

// RESCUE PAGE
function rescuePageLogic() {
  const gallery = document.getElementById("cat-gallery");
  const catData = JSON.parse(localStorage.getItem("catData"));

  if (catData && catData.length > 0) {
    catData.forEach((cat) => {
      const card = document.createElement("div");
      card.classList.add("cat-card");

      const img = document.createElement("img");
      img.src = cat.images;
      img.alt = cat.name;

      img.addEventListener("click", function () {
        localStorage.setItem("selectedCat", JSON.stringify(cat));
        window.location.href = "adopt.html";
      });

      card.appendChild(img);
      gallery.appendChild(card);
    });
  } else {
    gallery.innerHTML = "<p>No cats available at the moment.</p>";
  }
}


// ADOPT PAGE
function adoptPageLogic() {
  const catInfoDiv = document.getElementById("cat-info");
  const selectedCat = JSON.parse(localStorage.getItem("selectedCat"));

  if (selectedCat) {
    // Display cat image
    const img = document.createElement("img");
    img.src = selectedCat.images;
    img.alt = selectedCat.name;
    img.classList.add("cat-image");

    // Display cat name
    const name = document.createElement("p");
    name.textContent = `Name: ${selectedCat.name}`;
    name.classList.add("cat-name");

    catInfoDiv.appendChild(img);
    catInfoDiv.appendChild(name);

    // Button event listeners
    document.getElementById("no-btn").addEventListener("click", function () {
      window.location.href = "rescue.html";
    });

    document.getElementById("yes-btn").addEventListener("click", function () {
      window.location.href = "certificate.html";
    });
  } else {
    // Handle case where no cat is selected
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "No cat selected. Please go back to the rescue page.";
    catInfoDiv.appendChild(errorMessage);
  }
}

// CERTIFICATE PAGE
function certificatePageLogic() {
  const certificateContent = document.getElementById("certificateContent");
  const selectedCat = JSON.parse(localStorage.getItem("selectedCat"));
  const newOwnerDiv = document.querySelector(".newOwner");

  // Retrieve user data from localStorage (get the last user who submitted the form)
  const users = JSON.parse(localStorage.getItem("users"));
  const lastUser = users[users.length - 1];

  if (selectedCat) {
    const img = document.createElement("img");
    img.src = selectedCat.images;
    img.alt = selectedCat.name;
    img.classList.add("cat-image");

    const message = document.createElement("div");
    message.classList.add("congrats-message");
    message.textContent = `You adopted ${selectedCat.name}!`;

    certificateContent.appendChild(img);
    certificateContent.appendChild(message);
  } else {
    certificateContent.textContent =
      "No cat selected. Please return to the rescue page.";
  }

  // Display the user's full name in the certificate
  if (lastUser && newOwnerDiv) {
    newOwnerDiv.textContent = `${lastUser.first} ${lastUser.last}`;
  }
}

// Run the appropriate logic based on the page
document.addEventListener("DOMContentLoaded", function () {
  const pageId = document.body.id; // Ensure the body has an ID corresponding to the page

  if (pageId === "log") {
    logPageLogic();
  } else if (pageId === "rescue") {
    rescuePageLogic();
  } else if (pageId === "adopt") {
    adoptPageLogic();
  } else if (pageId === "certificate") {
    certificatePageLogic();
  }
});

// At the end of main.js
document.addEventListener("DOMContentLoaded", () => {
  // For current year in footer
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;

  // Optionally, for displaying full current date
  const currentDate = new Date().toLocaleDateString();
  document.getElementById("currentDate").textContent = currentDate;
});


//CONTACT PAGE

// Select the form and the message display section
const form = document.getElementById('form2');
const messageSection = document.querySelector('.message');

// Add an event listener to handle the form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Grab the user's input
  const firstName = form.querySelector('input[name="first"]').value;
  const lastName = form.querySelector('input[name="last"]').value;

  // Display the confirmation message
  messageSection.innerHTML = `
    <p>Thank you, <strong>${firstName} ${lastName}</strong>! We will contact you soon.</p>
  `;

  // Clear the form fields
  form.reset();

   // Set a timeout to clear the message after 4 seconds
   setTimeout(() => {
    messageSection.innerHTML = '';
  }, 4000); // Wait for 4 seconds before clearing

});
