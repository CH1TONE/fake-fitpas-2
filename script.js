const qrBtn = document.getElementById("qr-trigger");
const overlay = document.getElementById("success-overlay");
const closeBtn = document.getElementById("close-x");
const particleContainer = document.getElementById("particle-container");

let particles = [];
const particleCount = 25; // ბურთულების რაოდენობა
let animationInterval;

// ფერების მასივი მრავალფეროვნებისთვის
const colors = [
  "#4CAF50",
  "#4CAF50",
  "#4CAF50",
  "#4CAF50",
  "#4CAF50",
  "#4CAF50",
];

// 1. ფუნქცია რეალური დროის და თარიღის მისაღებად
function updateDateTime() {
  const timeElement = document.querySelector(".time-stamp");
  const now = new Date();

  // დღე, თვე, წელი (მაგ: 30.03.2026)
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  // საათი და წუთი (მაგ: 23:34)
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}.${month}.${year}`;
  const formattedTime = `${hours}:${minutes}`;

  // ტექსტის განახლება ეკრანზე
  timeElement.innerHTML = `Fitness Plaza | ${formattedDate} | ${formattedTime}`;
}

// 2. ბურთულების საწყისი შექმნა და განთავსება
function initializeParticles() {
  particleContainer.innerHTML = "";
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";

    const size = Math.random() * 10 + 4 + "px";
    dot.style.width = size;
    dot.style.height = size;

    // შემთხვევითი ფერი მასივიდან
    dot.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    dot.style.left = posX + "px";
    dot.style.top = posY + "px";

    // შემთხვევითი სიჩქარე და მიმართულება
    const speed = Math.random() * 2 + 0.5;
    const angle = Math.random() * Math.PI * 2;

    particles.push({
      element: dot,
      x: posX,
      y: posY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
    });

    particleContainer.appendChild(dot);
  }
}

// 3. მოძრაობის ანიმაციის ციკლი
function startParticleMovement() {
  if (animationInterval) clearInterval(animationInterval);
  animationInterval = setInterval(() => {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // კედლებზე ასხლეტვა (Bounce)
      if (p.x < 0 || p.x > window.innerWidth - 10) p.vx *= -1;
      if (p.y < 0 || p.y > window.innerHeight - 10) p.vy *= -1;

      p.element.style.left = p.x + "px";
      p.element.style.top = p.y + "px";
    });
  }, 16);
}

// 4. მოვლენების მოსმენა (Events)

// QR ღილაკზე დაჭერა
qrBtn.addEventListener("click", () => {
  overlay.classList.add("active");

  // რეალური დროის დასმა
  updateDateTime();

  // ბურთულების გაშვება
  if (particles.length === 0) {
    initializeParticles();
  }
  startParticleMovement();
});

// "X" ღილაკზე დაჭერა (დახურვა)
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");

  // რესურსების დასაზოგად ვაჩერებთ ანიმაციას
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
});
