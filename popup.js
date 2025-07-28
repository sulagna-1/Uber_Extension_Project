const pickupInput = document.getElementById("pickup");
const dropoffInput = document.getElementById("dropoff");
const requestRideBtn = document.getElementById("requestRideNow");
const scheduleRideBtn = document.getElementById("scheduleRide");
const mapLink = document.getElementById("mapLink");
const mapView = document.getElementById("mapView");
const qrContainer = document.getElementById("qrContainer");
const priceEstimate = document.getElementById("priceEstimate");
const timeEstimate = document.getElementById("timeEstimate");
const darkModeToggle = document.getElementById("darkModeToggle");

// Helper: Mock distance and fare
function calculateEstimate(pickup, dropoff) {
  const fakeDistance = (Math.random() * 10 + 1).toFixed(2); // in km
  const fakeFare = (fakeDistance * 15 + 50).toFixed(2); // ₹ estimate
  return { distance: fakeDistance, fare: fakeFare };
}

// Helper: Generate Google Maps link
function generateMapLink(pickup, dropoff) {
  const base = "https://www.google.com/maps/dir/";
  return `${base}${encodeURIComponent(pickup)}/${encodeURIComponent(dropoff)}`;
}

// Helper: Generate Uber QR
function generateQR(pickup, dropoff, date = "", time = "") {


  const qr = document.getElementById("qrCode");
  qr.innerHTML = "";
  
  let qrData = `uber://?action=setPickup&pickup[formatted_address]=${encodeURIComponent(pickup)}&dropoff[formatted_address]=${encodeURIComponent(dropoff)}`;

  if (date && time) {
    qrData += `&scheduled_date=${encodeURIComponent(date)}&scheduled_time=${encodeURIComponent(time)}`;
  }

  new QRCode(qr, {
    text: qrData,
    width: 200,
    height: 200,
  });

  qrContainer.classList.remove("hidden");
}



// Request Ride Now
requestRideBtn.addEventListener("click", () => {
  const pickup = pickupInput.value.trim();
  const dropoff = dropoffInput.value.trim();

  if (!pickup || !dropoff) {
    alert("Please enter both pickup and dropoff locations.");
    return;
  }

  const estimate = calculateEstimate(pickup, dropoff);
  priceEstimate.innerText = `💰 Fare Estimate: ₹${estimate.fare}`;
  timeEstimate.innerText = `🛣️ Estimated Distance: ${estimate.distance} km`;
  priceEstimate.classList.remove("hidden");
  timeEstimate.classList.remove("hidden");

  const link = generateMapLink(pickup, dropoff);
  mapLink.href = link;
  mapView.classList.remove("hidden");

  generateQR(pickup, dropoff);
});

// Schedule Ride
scheduleRideBtn.addEventListener("click", () => {
  const pickup = pickupInput.value.trim();
  const dropoff = dropoffInput.value.trim();
  const date = document.getElementById("scheduleDate").value;
  const time = document.getElementById("scheduleTime").value;

  if (!pickup || !dropoff || !date || !time) {
    alert("Please fill in pickup, dropoff, date, and time.");
    return;
  }

  const estimate = calculateEstimate(pickup, dropoff);
  priceEstimate.innerText = `📅 Scheduled Fare: ₹${estimate.fare}`;
  timeEstimate.innerText = `🕒 Estimated Distance: ${estimate.distance} km`;
  priceEstimate.classList.remove("hidden");
  timeEstimate.classList.remove("hidden");

  const link = generateMapLink(pickup, dropoff);
  mapLink.href = link;
  mapView.classList.remove("hidden");

  generateQR(pickup, dropoff, date, time);
});

// Dark mode toggle
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", darkModeToggle.checked);
});
