
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

// Firebase configuration for your Smart-Mess project
const firebaseConfig = {
  apiKey: "AIzaSyDeb-ew1yrD6oHNgtbQIAM5b5uhXhNI3aw",
  authDomain: "smart-mess-1cd4f.firebaseapp.com",
  projectId: "smart-mess-1cd4f",
  storageBucket: "smart-mess-1cd4f.firebasestorage.app",
  messagingSenderId: "766645995131",
  appId: "1:766645995131:web:2ee19c7fa78deabbf2c4de",
  measurementId: "G-NL09TX74XY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Lunch and dinner menus
const menus = {
  Monday: {
    Veg: ["Paneer Curry", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    "Non-Veg": ["Egg Curry", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    dessert: []
  },
  Tuesday: {
    Veg: ["Rajma", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    "Non-Veg": ["Chicken Curry", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    dessert: ["Gulab Jamun"]
  },
  Wednesday: {
    Veg: ["Mix Veg", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    "Non-Veg": ["Egg Bhurji", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    dessert: ["Gulab Jamun"]
  },
  Thursday: {
    Veg: ["Chole", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    "Non-Veg": ["Chicken Pulao", "Dal", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    dessert: ["Ice Cream"]
  },
  Friday: {
    Veg: ["Paneer Bhurji", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    "Non-Veg": ["Egg Masala", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    dessert: []
  },
  Saturday: {
    Veg: ["Veg Biryani", "Dal", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    "Non-Veg": ["Chicken Biryani", "Dal", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    dessert: ["Other Sweet"]
  },
  Sunday: {
    Veg: ["Aloo Gobi", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    "Non-Veg": ["Egg Curry", "Dal", "Rice", "Roti", "Seasonal Sabzi", "Fresh Salad"],
    dessert: ["Other Sweet", "Ice Cream"]
  }
};

const breakfastMenus = {
  Monday: ["Poha", "Banana", "Milk"],
  Tuesday: ["Idli", "Sambar", "Chutney"],
  Wednesday: ["Aloo Paratha", "Curd"],
  Thursday: ["Upma", "Sprouts"],
  Friday: ["Masala Dosa", "Chutney"],
  Saturday: ["Veg Sandwich", "Milk"],
  Sunday: ["Chole Bhature", "Fresh Salad"]
};

const dateInput = document.getElementById("mealDate");
const mealInput = document.getElementById("meal");
const foodInput = document.getElementById("foodType");
const menuDiv = document.getElementById("menu");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("mealForm");

const weekdays = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];

// Use local date rather than browser locale formatting.
function getLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

dateInput.value = getLocalDateString();

function getSelectedDay() {
  const date = new Date(`${dateInput.value}T12:00:00`);
  return weekdays[date.getDay()];
}

function renderMenu() {
  menuDiv.replaceChildren();

  if (!dateInput.value) {
    return;
  }

  const day = getSelectedDay();
  let items;

  if (mealInput.value === "Breakfast") {
    items = breakfastMenus[day] || [];
  } else {
    items = [
      ...(menus[day][foodInput.value] || []),
      ...menus[day].dessert
    ];
  }

  const heading = document.createElement("h3");
  heading.textContent = `Menu for ${day} — ${mealInput.value}`;
  menuDiv.appendChild(heading);

  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "menu-item";

    const name = document.createElement("span");
    name.textContent = `${item}:`;
    row.appendChild(name);

    ["Yes", "No"].forEach(choice => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `item_${index}`;
      radio.value = choice;
      radio.required = true;
      radio.dataset.item = item;

      const label = document.createElement("label");
      label.append(
        radio,
        document.createTextNode(` ${choice}`)
      );
      row.appendChild(label);
    });

    menuDiv.appendChild(row);
  });
}

dateInput.addEventListener("change", renderMenu);
mealInput.addEventListener("change", renderMenu);
foodInput.addEventListener("change", renderMenu);

function showResult(response, message, isSaved) {
  result.replaceChildren();

  const card = document.createElement("div");
  card.className = "result-card";

  const heading = document.createElement("h3");
  heading.textContent = "Your Meal Response";
  card.appendChild(heading);

  const status = document.createElement("p");
  status.className = `status ${isSaved ? "success" : "warning"}`;
  status.textContent = message;
  card.appendChild(status);

  const details = document.createElement("pre");
  details.textContent = JSON.stringify(response, null, 2);
  card.appendChild(details);

  result.appendChild(card);
}

form.addEventListener("submit", async event => {
  event.preventDefault();

  const studentId = document
    .getElementById("studentId")
    .value.trim();

  if (!studentId || !dateInput.value) {
    alert("Please enter Student ID and meal date.");
    return;
  }

  const preferences = {};

  for (const row of menuDiv.querySelectorAll(".menu-item")) {
    const chosen = row.querySelector('input[type="radio"]:checked');

    if (!chosen) {
      alert("Please select Yes or No for every menu item.");
      return;
    }

    preferences[chosen.dataset.item] = chosen.value;
  }

  const response = {
    studentId,
    mealDate: dateInput.value,
    meal: mealInput.value,
    foodType: mealInput.value === "Breakfast"
      ? "As per breakfast menu"
      : foodInput.value,
    attendance: document.getElementById("attendance").value,
    itemPreferences: preferences
  };

  // Save locally first, so the response remains available if
  // the Firebase connection fails.
  let savedResponses = [];

  try {
    savedResponses = JSON.parse(
      localStorage.getItem("smartMessResponses") || "[]"
    );
  } catch {
    savedResponses = [];
  }

  savedResponses.push({
    ...response,
    savedAt: new Date().toISOString()
  });

  try {
    localStorage.setItem(
      "smartMessResponses",
      JSON.stringify(savedResponses)
    );
  } catch (error) {
    console.error("Local storage error:", error);
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving Response...";
  result.textContent = "Saving your response...";

  try {
    await signInAnonymously(auth);

    await addDoc(collection(db, "mealResponses"), {
      ...response,
      createdAt: serverTimestamp()
    });

    showResult(
      response,
      "Saved to Firebase successfully!",
      true
    );
    alert("Meal response saved successfully!");
  } catch (error) {
    console.error("Firebase save error:", error);

    showResult(
      response,
      `Saved in this browser only. Firebase error: ${
        error.code || error.message
      }`,
      false
    );
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Review My Response";
  }
});

renderMenu();
