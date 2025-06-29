document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.form_fill').forEach((container) => {
    container.addEventListener('click', () => {
      const input = container.querySelector('input');
      if (input) {
        input.focus();
        input.showPicker && input.showPicker();
      }
    });
  });
  const nameInLocalStorage = localStorage.getItem("name")
  const dobInLocalStorage = localStorage.getItem("dob")
  if (nameInLocalStorage && dobInLocalStorage) {
    window.location.href = "app.html"
    return;
  }
  const form = document.getElementById("verificationForm")
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value

    if (!name || !dob) {
      alert("Please fill the form")
      return;
    }

    const age = calculateAge(new Date(dob));
    if (age <= 10) {
      alert("You must be over 10 years old to continue.");
      return;
    }
    localStorage.setItem("name", name);
    localStorage.setItem("dob",dob);
    window.location.href = "app.html";
  });
})
function calculateAge(dob) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

