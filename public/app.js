document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded");

  const pages = [
    "landing page",
    "main",
    "About Page",
    "loginPage",
    "signupPage",
    "AdminDevicesPage",
    "AdminRentalsPage",
    "CurrentUsersPage",
    "RentalHistoryPage",
  ];

  // Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDPpcgBJG97tuFMe_ts2tRyt_S8j0Roslg",
    authDomain: "info-sys-471-project.firebaseapp.com",
    projectId: "info-sys-471-project",
    storageBucket: "info-sys-471-project.firebasestorage.app",
    messagingSenderId: "1029901678751",
    appId: "1:1029901678751:web:0c1b04a75440e8eee7caaa",
    measurementId: "G-7C7NVRQM0E",
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Show the selected page and hide others
  function showPage(pageId) {
    pages.forEach((id) => {
      const pageElement = document.getElementById(id);
      if (pageElement) {
        pageElement.classList.add("is-hidden");
      }
    });
    document.getElementById(pageId).classList.remove("is-hidden");
  }

  // Handle page navigation
  const buttons = {
    homePage: "main",
    reviewp: "About Page",
    loginPageclick: "loginPage",
    signupPageclick: "signupPage",
    manageDevicesPage: "AdminDevicesPage",
    manageRentalsPage: "AdminRentalsPage",
    manageUsersPage: "CurrentUsersPage",
    rentalHistoryPage: "RentalHistoryPage",
  };

  Object.keys(buttons).forEach((buttonId) => {
    const buttonElement = document.getElementById(buttonId);
    if (buttonElement) {
      buttonElement.addEventListener("click", () =>
        showPage(buttons[buttonId])
      );
    }
  });

  // Firebase login functionality
  const loginButton = document.querySelector("#loginPage .button.is-info");
  if (loginButton) {
    loginButton.addEventListener("click", function () {
      const email = document.querySelector(
        "#loginPage input[type='email']"
      ).value;
      const password = document.querySelector(
        "#loginPage input[type='password']"
      ).value;

      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("User logged in:", userCredential.user);
          showPage("main");
        })
        .catch((error) => {
          console.error("Login error:", error.message);
          alert(error.message);
        });
    });
  }

  // Firebase sign-up functionality
  const signUpButton = document.querySelector("#signupPage .button.is-info");
  if (signUpButton) {
    signUpButton.addEventListener("click", function () {
      const email = document.querySelector(
        "#signupPage input[type='email']"
      ).value;
      const password = document.querySelector(
        "#signupPage input[type='password']"
      ).value;

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log("User signed up:", userCredential.user);
          showPage("main");
        })
        .catch((error) => {
          console.error("Sign-up error:", error.message);
          alert(error.message);
        });
    });
  }

  // Firebase logout functionality
  const logoutButton = document.getElementById("logoutPage");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      auth
        .signOut()
        .then(() => {
          console.log("User signed out");
          showPage("landing page");
        })
        .catch((error) => {
          console.error("Logout error:", error.message);
          alert(error.message);
        });
    });
  }

  // Manage visibility based on login state
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User is logged in:", user);
      showPage("main");
      document.getElementById("logoutPage").classList.remove("is-hidden");
      document.getElementById("loginPageclick").classList.add("is-hidden");
      document.getElementById("signupPageclick").classList.add("is-hidden");
      document
        .getElementById("manageDevicesPage")
        .classList.remove("is-hidden");
      document
        .getElementById("manageRentalsPage")
        .classList.remove("is-hidden");
      document
        .getElementById("rentalHistoryPage")
        .classList.remove("is-hidden");
    } else {
      console.log("No user logged in");
      showPage("landing page");
      document.getElementById("logoutPage").classList.add("is-hidden");
      document.getElementById("loginPageclick").classList.remove("is-hidden");
      document.getElementById("signupPageclick").classList.remove("is-hidden");
      document.getElementById("manageDevicesPage").classList.add("is-hidden");
      document.getElementById("manageRentalsPage").classList.add("is-hidden");
      document.getElementById("rentalHistoryPage").classList.add("is-hidden");
    }
  });
});
