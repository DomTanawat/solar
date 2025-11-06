const canvas = document.getElementById("orbitCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;
const infoBox = document.getElementById('info-box');

const planets = [
  { id: 'mercury', name: 'ดาวพุธ', radius: 100, speed: 0.02, desc: 'ดาวเคราะห์ที่ใกล้ดวงอาทิตย์ที่สุด' },
  { id: 'venus',   name: 'ดาวศุกร์', radius: 140, speed: 0.016, desc: 'ดาวเคราะห์ที่ร้อนที่สุดในระบบสุริยะ' },
  { id: 'earth',   name: 'โลก', radius: 190, speed: 0.014, desc: 'ดาวเคราะห์ที่มีสิ่งมีชีวิต' },
  { id: 'mars',    name: 'ดาวอังคาร', radius: 240, speed: 0.012, desc: 'ดาวสีแดง มีภูเขาไฟสูงที่สุด' },
  { id: 'jupiter', name: 'ดาวพฤหัสบดี', radius: 310, speed: 0.010, desc: 'ดาวเคราะห์ที่ใหญ่ที่สุด' },
  { id: 'saturn',  name: 'ดาวเสาร์', radius: 380, speed: 0.008, desc: 'ดาวที่มีวงแหวนสวยงาม' },
  { id: 'uranus',  name: 'ดาวยูเรนัส', radius: 450, speed: 0.006, desc: 'หมุนเอียงมากที่สุด' },
  { id: 'neptune', name: 'ดาวเนปจูน', radius: 520, speed: 0.004, desc: 'ดาวที่อยู่ไกลที่สุด' }
];

// เพิ่มดวงอาทิตย์ให้คลิกได้
planets.push({
  id: 'sun',
  name: 'ดวงอาทิตย์',
  radius: 0,
  speed: 0,
  desc: 'ดวงอาทิตย์เป็นดาวฤกษ์ศูนย์กลางของระบบสุริยะ ให้พลังงานแก่ดาวเคราะห์ทุกดวง'
});

planets.forEach(p => p.angle = Math.random() * Math.PI * 2);

function drawOrbits() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;

  planets.forEach(p => {
    if (p.radius > 0) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, p.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  });
}

function animate() {
  drawOrbits();
  planets.forEach(p => {
    const el = document.getElementById(p.id);
    if (!el) return;
    p.angle += p.speed;
    const x = centerX + p.radius * Math.cos(p.angle);
    const y = centerY + p.radius * Math.sin(p.angle);
    el.style.left = (x - el.offsetWidth / 2) + "px";
    el.style.top = (y - el.offsetHeight / 2) + "px";
  });
  requestAnimationFrame(animate);
}

animate();

// คลิกแสดงข้อมูล
planets.forEach(p => {
  const el = document.getElementById(p.id);
  if (!el) return;
  el.addEventListener("click", () => {
    infoBox.innerHTML = `
      <h2>${p.name}</h2>
      <p>${p.desc}</p>
      ${p.radius > 0 ? `<p><b>ระยะจากดวงอาทิตย์:</b> ${p.radius * 1.5} ล้านกม.</p>` : ""}
      ${p.speed > 0 ? `<p><b>ความเร็วโคจร:</b> ${(p.speed * 1000).toFixed(2)} หน่วยจำลอง</p>` : ""}
    `;
  });
});
