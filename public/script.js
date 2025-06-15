document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const messageArea = document.getElementById("message-area");

  const showError = (msg) => {
    messageArea.innerHTML = `<p style="color:red; margin-bottom:10px;">❌ ${msg}</p>`;
  };

  // If backend passed an error (via URL)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("error")) {
    showError(urlParams.get("error"));
  }

  form.addEventListener("submit", (e) => {
    const email = form.email.value;
    const password = form.password.value;
    const mobile = form.mobile.value;

    // Basic client-side validations
    if (password.length < 8) {
      e.preventDefault();
      showError("Password must be at least 8 characters.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      e.preventDefault();
      showError("Mobile number must be 10 digits.");
      return;
    }

    if (!email.includes("@")) {
      e.preventDefault();
      showError("Invalid email address.");
      return;
    }
  });
});
