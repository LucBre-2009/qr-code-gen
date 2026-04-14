const input = document.getElementById("text");
const qrContainer = document.getElementById("qrcode");

function generate(value) {
  qrContainer.innerHTML = "";

  if (!value) return;

  new QRCode(qrContainer, {
    text: value,
    width: 200,
    height: 200
  });
}

input.addEventListener("input", (e) => {
  generate(e.target.value);
});
