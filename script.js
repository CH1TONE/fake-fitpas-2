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
  "#FF4500",
  "#FFD700",
  "#00BFFF",
  "#FF69B4",
  "#FFFFFF",
];

// ღილაკზე დაჭერა
qrBtn.addEventListener("click", () => {
  overlay.classList.add("active");

  // შევქმნათ ბურთულები თუ ჯერ არ არსებობენ
  if (particles.length === 0) {
    initializeParticles();
  }

  // ჩავრთოთ მოძრაობის ციკლი
  startParticleMovement();
});

// დახურვა
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");

  // გავაჩეროთ მოძრაობის ციკლი, რომ რესურსები არ წაიღოს
  stopParticleMovement();
});

// 1. ბურთულების საწყისი შექმნა, განთავსება და ფერები
function initializeParticles() {
  particleContainer.innerHTML = "";
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";

    const size = Math.random() * 10 + 4 + "px"; // შემთხვევითი ზომა (4-14px)
    dot.style.width = size;
    dot.style.height = size;

    // შემთხვევითი ფერი მასივიდან
    dot.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    dot.style.left = posX + "px";
    dot.style.top = posY + "px";

    // შემთხვევითი სიჩქარე (speed) და მიმართულება (angle)
    const speed = Math.random() * 2 + 0.5; // 0.5 - 2.5 პიქსელი ერთ კადრში
    const angle = Math.random() * Math.PI * 2; // 0-დან 360 გრადუსამდე

    particles.push({
      element: dot,
      x: posX,
      y: posY,
      vx: Math.cos(angle) * speed, // სიჩქარე X ღერძზე
      vy: Math.sin(angle) * speed, // სიჩქარე Y ღერძზე
    });

    particleContainer.appendChild(dot);
  }
}

// 2. მოძრაობის ციკლის ჩართვა
function startParticleMovement() {
  if (animationInterval) clearInterval(animationInterval);
  animationInterval = setInterval(() => {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // კედლებზე ასხლეტვა (Bounce effect)
      if (p.x < 0 || p.x > window.innerWidth - 10) p.vx *= -1;
      if (p.y < 0 || p.y > window.innerHeight - 10) p.vy *= -1;

      p.element.style.left = p.x + "px";
      p.element.style.top = p.y + "px";
    });
  }, 16); // დაახლოებით 60 კადრი წამში
}

// 3. მოძრაობის ციკლის გაჩერება
function stopParticleMovement() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
}
