const userName = localStorage.getItem("name");
if (!userName) {
  window.location.href = "index.html";
}
document.getElementById("welcome").innerText = `Welcome, ${userName}`;
document.getElementById("avatar").src = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(userName)}`;


document.getElementById("welcome").innerText = `Welcome, ${userName}`;
document.getElementById("avatar").src = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${encodeURIComponent(name)}`;

document.getElementById("signOut").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
  