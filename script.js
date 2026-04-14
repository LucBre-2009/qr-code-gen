const input = document.getElementById("text");
const qrContainer = document.getElementById("qrcode");
const emptyState = document.getElementById("emptyState");

const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");
const toast = document.getElementById("toast");

let qr;

function showToast(message) {
  toast.textContent = message;
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
  }, 1200);
}

function generate(value) {
  qrContainer.innerHTML = "";

  if (!value.trim()) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  qr = new QRCode(qrContainer, {
    text: value,
    width: 200,
    height: 200
  });
}

// Input with slight delay (better UX)
let timeout;
input.addEventListener("input", (e) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    generate(e.target.value);
  }, 200);
});

// Clear
clearBtn.addEventListener("click", () => {
  input.value = "";
  qrContainer.innerHTML = "";
  emptyState.style.display = "block";
  showToast("Cleared");
});

// Download
downloadBtn.addEventListener("click", () => {
  const img = qrContainer.querySelector("img");

  if (!img) {
    showToast("Nothing to download");
    return;
  }

  const link = document.createElement("a");
  link.href = img.src;
  link.download = "qr-code.png";
  link.click();

  showToast("Downloaded");
});
