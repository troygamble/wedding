/******************************************************************************
  1. COUNTDOWN TIMER LOGIC
******************************************************************************/
const weddingDate = new Date("September 10, 2025 16:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    // If the date is already reached or passed
    document.getElementById("countdown").innerHTML = "<p>We're married!</p>";
    return;
  }

  // Calculate time parts
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  // Update the DOM
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Update every second
setInterval(updateCountdown, 1000);
// Run once at load
updateCountdown();

/*****************************************************
  ADD & REMOVE GUEST FIELDS
*****************************************************/
const addGuestBtn = document.getElementById("addGuestBtn");
const guestsContainer = document.getElementById("guests");
let guestCount = 1;

// Helper function to attach remove event to an "×" icon
function attachRemoveEvent(removeIcon, guestDiv) {
  removeIcon.addEventListener("click", () => {
    // If you want to prevent removing the last guest, 
    // check how many .removable blocks remain:
    // if (guestsContainer.querySelectorAll('.removable').length > 1) {
    guestsContainer.removeChild(guestDiv);
    // }
  });
}

// 1) Attach remove event to the FIRST guest block
const firstGuestDiv = guestsContainer.querySelector(".form-group.removable");
if (firstGuestDiv) {
  const firstRemoveIcon = firstGuestDiv.querySelector(".remove-guest-icon");
  attachRemoveEvent(firstRemoveIcon, firstGuestDiv);
  if (guestsContainer.querySelectorAll('.removable').length > 1) {
    guestsContainer.removeChild(guestDiv);
  }  
}

// 2) On clicking "Add Another Guest"
addGuestBtn.addEventListener("click", () => {
  guestCount++;

  const guestDiv = document.createElement("div");
  guestDiv.classList.add("form-group", "removable");

  guestDiv.innerHTML = `
    <label for="guest${guestCount}">Guest Name</label>
    <input
      type="text"
      id="guest${guestCount}"
      name="guest[]"
      placeholder="Guest Name"
      required
    />
    <label class="child-label">
      <input type="checkbox" name="guest${guestCount}_is_child" value="under10"/>
      Under 10 years old?
    </label>
    <span class="remove-guest-icon">&times;</span>
  `;

  // Add new guest block to container
  guestsContainer.appendChild(guestDiv);

  // Attach remove event to the new "×" icon
  const removeIcon = guestDiv.querySelector(".remove-guest-icon");
  attachRemoveEvent(removeIcon, guestDiv);
});

function attachRemoveEvent(removeBtn, guestDiv) {
  removeBtn.addEventListener("click", () => {
    // Only remove if there's more than one form-group left
    if (guestsContainer.querySelectorAll(".form-group").length > 1) {
      guestsContainer.removeChild(guestDiv);
    }
  });
}



/******************************************************************************
  3. PERSONALIZED GUEST NAME LOGIC
     Read '?guest=NAME' from the URL & update the hero title
******************************************************************************/
(function personalizeGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get("guest");

  if (guestName) {
    const heroTitle = document.getElementById("heroTitle");
    // Example: "Sheilah & Rodney, you're invited to Troy & Bec's Wedding!"
    heroTitle.textContent = `${guestName}, you're invited to Troy & Rebecca's Wedding!`;
  }
})();

/******************************************************************************
  4. FAQ COLLAPSIBLE LOGIC
     Toggle open/close for each FAQ item
******************************************************************************/
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle("active");
  });
});
