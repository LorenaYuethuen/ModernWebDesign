// Custom Cursor
const cursorFollower = document.querySelector('.cursor-follower');
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    cursorGlow.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
});

// Generate Particles - MORE and BIGGER!
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 3) + 's';
        const size = Math.random() * 12 + 6;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        container.appendChild(particle);
    }
}

createParticles();

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax layers
    const layer1 = document.querySelector('.layer-1');
    const layer2 = document.querySelector('.layer-2');
    const layer3 = document.querySelector('.layer-3');
    
    if (layer1) layer1.style.transform = `translateY(${scrolled * 0.5}px)`;
    if (layer2) layer2.style.transform = `translateY(${scrolled * 0.3}px)`;
    if (layer3) layer3.style.transform = `translateY(${scrolled * 0.1}px)`;
    
    // Scroll-triggered animations
    const scrollBoxes = document.querySelectorAll('.scroll-box');
    scrollBoxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (boxTop < windowHeight * 0.8) {
            box.classList.add('visible');
        }
    });
    
    // Reveal animations for all feature sections
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        const featureTop = feature.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (featureTop < windowHeight * 0.75) {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }
    });
});

// Initialize feature sections with hidden state
document.querySelectorAll('.feature').forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(50px)';
    feature.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

// Mouse Reactive Grid
function createMouseGrid() {
    const grid = document.getElementById('mouseGrid');
    if (!grid) return;
    
    for (let i = 0; i < 400; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        grid.appendChild(cell);
        
        cell.addEventListener('mouseenter', () => {
            cell.classList.add('active');
            setTimeout(() => {
                cell.classList.remove('active');
            }, 500);
        });
    }
}

createMouseGrid();

// 3D Cube Mouse Tracking
const cubeContainer = document.querySelector('.cube-container');
if (cubeContainer) {
    document.addEventListener('mousemove', (e) => {
        const rect = cubeContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        const rotateY = x * 30;
        const rotateX = -y * 30;
        
        cubeContainer.style.animation = 'none';
        cubeContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
}

// Particle Canvas System - EXTREME CONNECTIONS!
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let hue = 0;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 6 + 3;
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 4 - 2;
            this.hue = Math.random() * 360;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) {
                this.speedX *= -1;
            }
            
            if (this.y > canvas.height || this.y < 0) {
                this.speedY *= -1;
            }
            
            this.hue = (this.hue + 1) % 360;
        }
        
        draw() {
            ctx.shadowBlur = 20;
            ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
            ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    
    function init() {
        particlesArray = [];
        const numberOfParticles = 150;
        
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Connect particles with gradient lines
            for (let j = i + 1; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 200) {
                    const opacity = 1 - distance / 200;
                    const avgHue = (particlesArray[i].hue + particlesArray[j].hue) / 2;
                    
                    const gradient = ctx.createLinearGradient(
                        particlesArray[i].x, particlesArray[i].y,
                        particlesArray[j].x, particlesArray[j].y
                    );
                    gradient.addColorStop(0, `hsla(${particlesArray[i].hue}, 100%, 60%, ${opacity})`);
                    gradient.addColorStop(1, `hsla(${particlesArray[j].hue}, 100%, 60%, ${opacity})`);
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 3 * opacity;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = `hsla(${avgHue}, 100%, 60%, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }
            }
        }
        
        hue = (hue + 1) % 360;
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

// Mouse Position Effect on Sections
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Move background elements
    const morphingBg = document.querySelector('.morphing-bg');
    if (morphingBg) {
        const moveX = (mouseX - 0.5) * 50;
        const moveY = (mouseY - 0.5) * 50;
        morphingBg.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
    
    // Tilt glass card
    const glassCard = document.querySelector('.glass-card');
    if (glassCard) {
        const rect = glassCard.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            const cardX = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const cardY = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            glassCard.style.transform = `rotateY(${cardX * 10}deg) rotateX(${-cardY * 10}deg)`;
        } else {
            glassCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
        }
    }
    
    // Liquid blob movement
    const liquidBlob = document.querySelector('.liquid-blob');
    if (liquidBlob) {
        const rect = liquidBlob.getBoundingClientRect();
        const liquidX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const liquidY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        liquidBlob.style.transform = `translate(${liquidX * 100}px, ${liquidY * 100}px)`;
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add intersection observer for better performance on scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature').forEach(feature => {
    observer.observe(feature);
});

// Dynamic color change based on scroll position
window.addEventListener('scroll', () => {
    const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const hue = scrollPercent * 360;
    document.documentElement.style.setProperty('--primary', `hsl(${120 + hue * 0.5}, 100%, 50%)`);
});

// Glitch effect on hero text on mouse enter
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        glitchText.style.animation = 'none';
        setTimeout(() => {
            glitchText.style.animation = 'glitch 0.3s';
        }, 10);
    });
}

// Neon flicker effect
const neonText = document.querySelector('.neon-text');
if (neonText) {
    setInterval(() => {
        if (Math.random() > 0.9) {
            neonText.style.opacity = '0.8';
            setTimeout(() => {
                neonText.style.opacity = '1';
            }, 50);
        }
    }, 3000);
}

// Add hover effects to feature cards
document.querySelectorAll('.feature-content').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Morphing SVG interactivity
const morphingSvg = document.querySelector('.morphing-svg');
if (morphingSvg) {
    morphingSvg.addEventListener('mouseenter', () => {
        morphingSvg.style.filter = 'drop-shadow(0 0 80px var(--primary))';
    });
    
    morphingSvg.addEventListener('mouseleave', () => {
        morphingSvg.style.filter = 'drop-shadow(0 0 50px var(--primary))';
    });
}

// Matrix Digital Rain Effect - EXTREME MODE!
const matrixCanvas = document.getElementById('matrixCanvas');
if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%█▓▒░";
    const fontSize = 20;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    let hue = 0;
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            
            // Varying colors for more drama
            if (drops[i] * fontSize > matrixCanvas.height * 0.8) {
                ctx.fillStyle = `hsl(${(hue + i * 10) % 360}, 100%, 70%)`;
            } else if (drops[i] * fontSize > matrixCanvas.height * 0.5) {
                ctx.fillStyle = `hsl(${(hue + i * 5) % 360}, 100%, 60%)`;
            } else {
                ctx.fillStyle = '#0F0';
            }
            
            ctx.font = (fontSize + Math.random() * 8) + 'px monospace';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Add glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = ctx.fillStyle;
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
            drops[i] += 0.8 + Math.random() * 0.8;
        }
        
        hue = (hue + 0.5) % 360;
        ctx.shadowBlur = 0;
    }
    
    setInterval(drawMatrix, 20);
}

// Time Warp Distortion Canvas - EXTREME RIPPLES!
const warpCanvas = document.getElementById('warpCanvas');
if (warpCanvas) {
    const ctx = warpCanvas.getContext('2d');
    warpCanvas.width = window.innerWidth;
    warpCanvas.height = window.innerHeight;
    
    let time = 0;
    const ripples = [];
    let hue = 0;
    
    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 600;
            this.speed = 8;
            this.alpha = 1;
            this.hue = hue;
        }
        
        update() {
            this.radius += this.speed;
            this.alpha = 1 - (this.radius / this.maxRadius);
            this.speed *= 1.02;
        }
        
        draw() {
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius + (i * 40), 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(${(this.hue + i * 30) % 360}, 100%, 60%, ${this.alpha * (1 - i * 0.15)})`;
                ctx.lineWidth = 6 - i;
                ctx.shadowBlur = 30;
                ctx.shadowColor = ctx.strokeStyle;
                ctx.stroke();
            }
            ctx.shadowBlur = 0;
        }
    }
    
    warpCanvas.addEventListener('click', (e) => {
        const rect = warpCanvas.getBoundingClientRect();
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                ripples.push(new Ripple(e.clientX - rect.left, e.clientY - rect.top));
            }, i * 100);
        }
    });
    
    // Auto-generate ripples more frequently
    setInterval(() => {
        ripples.push(new Ripple(
            Math.random() * warpCanvas.width,
            Math.random() * warpCanvas.height
        ));
    }, 800);
    
    function animateWarp() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, warpCanvas.width, warpCanvas.height);
        
        for (let i = ripples.length - 1; i >= 0; i--) {
            ripples[i].update();
            ripples[i].draw();
            
            if (ripples[i].radius > ripples[i].maxRadius) {
                ripples.splice(i, 1);
            }
        }
        
        time++;
        hue = (hue + 1) % 360;
        requestAnimationFrame(animateWarp);
    }
    
    animateWarp();
}

// Fractal Generator
function createFractals() {
    const container = document.getElementById('fractalContainer');
    if (!container) return;
    
    function createSquare(size, depth, maxDepth) {
        if (depth >= maxDepth) return;
        
        const square = document.createElement('div');
        square.className = 'fractal-square';
        square.style.width = size + 'px';
        square.style.height = size + 'px';
        square.style.top = '50%';
        square.style.left = '50%';
        square.style.transform = `translate(-50%, -50%) rotate(${depth * 15}deg)`;
        square.style.animationDelay = `${depth * 0.2}s`;
        
        container.appendChild(square);
        
        createSquare(size * 0.7, depth + 1, maxDepth);
    }
    
    createSquare(400, 0, 8);
}

createFractals();

// Magnetic Field Effect - EXTREME MAGNETISM!
function createMagneticField() {
    const field = document.getElementById('magneticField');
    if (!field) return;
    
    const particles = [];
    const numParticles = 60;
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'magnetic-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        field.appendChild(particle);
        
        particles.push({
            element: particle,
            baseX: Math.random() * window.innerWidth,
            baseY: Math.random() * window.innerHeight,
            vx: 0,
            vy: 0,
            angle: Math.random() * Math.PI * 2
        });
    }
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateMagnetic() {
        particles.forEach((p, index) => {
            const rect = field.getBoundingClientRect();
            const dx = mouseX - (p.baseX + rect.left);
            const dy = mouseY - (p.baseY + rect.top);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 500) {
                const force = (500 - distance) / 500;
                const angle = Math.atan2(dy, dx);
                
                // Add some orbital motion
                const orbitalAngle = angle + Math.PI / 2;
                const orbitalForce = force * 50;
                
                p.vx = Math.cos(angle) * force * 200 + Math.cos(orbitalAngle) * orbitalForce;
                p.vy = Math.sin(angle) * force * 200 + Math.sin(orbitalAngle) * orbitalForce;
            } else {
                p.vx *= 0.9;
                p.vy *= 0.9;
            }
            
            // Add some autonomous floating
            p.angle += 0.02;
            p.vx += Math.cos(p.angle) * 2;
            p.vy += Math.sin(p.angle) * 2;
            
            const newX = p.baseX + p.vx;
            const newY = p.baseY + p.vy;
            
            p.element.style.left = newX + 'px';
            p.element.style.top = newY + 'px';
            
            const intensity = Math.min(Math.abs(p.vx) + Math.abs(p.vy), 200) / 200;
            const scale = 1 + intensity * 2;
            p.element.style.transform = `scale(${scale}) rotate(${p.angle * 100}deg)`;
            
            const glowSize = 20 + intensity * 80;
            p.element.style.boxShadow = `
                0 0 ${glowSize}px var(--primary),
                0 0 ${glowSize * 2}px var(--secondary),
                inset 0 0 ${glowSize / 2}px rgba(255, 255, 255, 0.5)
            `;
        });
        
        requestAnimationFrame(updateMagnetic);
    }
    
    updateMagnetic();
}

createMagneticField();

// Scroll Velocity Visualizer - Novel Idea 2
function createVelocityBars() {
    const container = document.getElementById('velocityBars');
    if (!container) return;
    
    const bars = [];
    const numBars = 20;
    
    for (let i = 0; i < numBars; i++) {
        const bar = document.createElement('div');
        bar.className = 'velocity-bar';
        bar.style.height = '50px';
        container.appendChild(bar);
        bars.push(bar);
    }
    
    let lastScrollY = window.pageYOffset;
    let velocity = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        velocity = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
    });
    
    function updateBars() {
        bars.forEach((bar, index) => {
            const randomVariation = Math.random() * 0.5 + 0.5;
            const height = Math.min(velocity * 10 * randomVariation, 400);
            bar.style.height = height + 'px';
            bar.style.animationDelay = `${index * 0.05}s`;
        });
        
        velocity *= 0.9; // Decay
        requestAnimationFrame(updateBars);
    }
    
    updateBars();
}

createVelocityBars();

// Pixelation Effect - EXTREME PIXELS!
const pixelCanvas = document.getElementById('pixelCanvas');
if (pixelCanvas) {
    const ctx = pixelCanvas.getContext('2d');
    pixelCanvas.width = window.innerWidth;
    pixelCanvas.height = window.innerHeight;
    
    let pixelSize = 1;
    let growing = true;
    let angle = 0;
    let hue = 0;
    
    function drawPixelArt() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, pixelCanvas.width, pixelCanvas.height);
        
        const centerX = pixelCanvas.width / 2;
        const centerY = pixelCanvas.height / 2;
        
        for (let x = 0; x < pixelCanvas.width; x += pixelSize) {
            for (let y = 0; y < pixelCanvas.height; y += pixelSize) {
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const angleToCenter = Math.atan2(dy, dx);
                
                if (distance < 400) {
                    const waveFactor = Math.sin(distance * 0.02 + angle) * 0.5 + 0.5;
                    const rotationFactor = Math.sin(angleToCenter * 5 + angle) * 0.5 + 0.5;
                    const combinedFactor = (waveFactor + rotationFactor) / 2;
                    
                    const pixelHue = (hue + distance * 0.5 + angleToCenter * 50) % 360;
                    const saturation = 50 + combinedFactor * 50;
                    const lightness = 40 + combinedFactor * 40;
                    
                    ctx.fillStyle = `hsl(${pixelHue}, ${saturation}%, ${lightness}%)`;
                    ctx.fillRect(x, y, pixelSize, pixelSize);
                    
                    // Add glow to some pixels
                    if (combinedFactor > 0.7) {
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = ctx.fillStyle;
                        ctx.fillRect(x, y, pixelSize, pixelSize);
                        ctx.shadowBlur = 0;
                    }
                }
            }
        }
        
        if (growing) {
            pixelSize += 0.5;
            if (pixelSize > 30) growing = false;
        } else {
            pixelSize -= 0.5;
            if (pixelSize < 1) growing = true;
        }
        
        angle += 0.1;
        hue = (hue + 2) % 360;
        requestAnimationFrame(drawPixelArt);
    }
    
    drawPixelArt();
}

// DNA Helix Animation - EXTREME HELIX!
const dnaCanvas = document.getElementById('dnaCanvas');
if (dnaCanvas) {
    const ctx = dnaCanvas.getContext('2d');
    dnaCanvas.width = window.innerWidth;
    dnaCanvas.height = window.innerHeight;
    
    let angle = 0;
    const helixPoints = 150;
    const radius = 150;
    const spacing = 6;
    let hue = 0;
    
    class DNAParticle {
        constructor(index) {
            this.index = index;
            this.angle = (index / helixPoints) * Math.PI * 6;
        }
        
        update() {
            this.angle += 0.05;
        }
        
        draw(yOffset) {
            const y = yOffset + this.index * spacing;
            const x1 = dnaCanvas.width / 2 + Math.cos(this.angle) * radius;
            const x2 = dnaCanvas.width / 2 + Math.cos(this.angle + Math.PI) * radius;
            
            const particleHue1 = (hue + this.index * 2) % 360;
            const particleHue2 = (hue + this.index * 2 + 180) % 360;
            
            // First strand with glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = `hsl(${particleHue1}, 100%, 60%)`;
            ctx.beginPath();
            ctx.arc(x1, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${particleHue1}, 100%, 60%)`;
            ctx.fill();
            
            // Second strand with glow
            ctx.shadowColor = `hsl(${particleHue2}, 100%, 60%)`;
            ctx.beginPath();
            ctx.arc(x2, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${particleHue2}, 100%, 60%)`;
            ctx.fill();
            
            ctx.shadowBlur = 0;
            
            // Connecting line
            if (this.index % 2 === 0) {
                const gradient = ctx.createLinearGradient(x1, y, x2, y);
                gradient.addColorStop(0, `hsla(${particleHue1}, 100%, 60%, 0.6)`);
                gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
                gradient.addColorStop(1, `hsla(${particleHue2}, 100%, 60%, 0.6)`);
                
                ctx.beginPath();
                ctx.moveTo(x1, y);
                ctx.lineTo(x2, y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 4;
                ctx.stroke();
            }
        }
    }
    
    const particles = [];
    for (let i = 0; i < helixPoints; i++) {
        particles.push(new DNAParticle(i));
    }
    
    function animateDNA() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, dnaCanvas.width, dnaCanvas.height);
        
        const yOffset = (dnaCanvas.height / 2) - (helixPoints * spacing / 2);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw(yOffset);
        });
        
        hue = (hue + 1) % 360;
        requestAnimationFrame(animateDNA);
    }
    
    animateDNA();
}

// Holographic card mouse tracking
const holoCard = document.querySelector('.holographic-card');
if (holoCard) {
    holoCard.addEventListener('mousemove', (e) => {
        const rect = holoCard.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        holoCard.style.backgroundPosition = `${x}% ${y}%`;
    });
}

// VHS glitch intensify on hover
const vhsScreen = document.querySelector('.vhs-screen');
if (vhsScreen) {
    vhsScreen.addEventListener('mouseenter', () => {
        const vhsText = vhsScreen.querySelector('.vhs-text');
        vhsText.style.animation = 'vhsGlitch 0.1s infinite';
    });
    
    vhsScreen.addEventListener('mouseleave', () => {
        const vhsText = vhsScreen.querySelector('.vhs-text');
        vhsText.style.animation = 'vhsGlitch 0.3s infinite';
    });
}

// Chromatic aberration intensify on scroll
window.addEventListener('scroll', () => {
    const chromaticSection = document.querySelector('.chromatic-section');
    if (chromaticSection) {
        const rect = chromaticSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const intensity = 1 - Math.abs(rect.top - window.innerHeight / 2) / window.innerHeight;
            const chromaticText = document.querySelector('.chromatic-text');
            if (chromaticText) {
                chromaticText.style.setProperty('--intensity', intensity * 10);
            }
        }
    }
});

// Page flip on click
const bookContainer = document.querySelector('.book-container');
if (bookContainer) {
    bookContainer.addEventListener('click', () => {
        const pageFront = bookContainer.querySelector('.page-front');
        pageFront.style.animation = 'none';
        setTimeout(() => {
            pageFront.style.animation = 'pageFlip 2s ease-in-out forwards';
        }, 10);
    });
}

// Displacement glitch trigger
const glitchArt = document.querySelector('.glitch-art');
if (glitchArt) {
    setInterval(() => {
        if (Math.random() > 0.7) {
            glitchArt.style.filter = 'contrast(200%) brightness(150%)';
            setTimeout(() => {
                glitchArt.style.filter = 'none';
            }, 100);
        }
    }, 2000);
}

// Portal interaction
const portalContainer = document.querySelector('.portal-container');
if (portalContainer) {
    portalContainer.addEventListener('mouseenter', () => {
        const rings = portalContainer.querySelectorAll('.portal-ring');
        rings.forEach(ring => {
            ring.style.animationDuration = '1s';
        });
    });
    
    portalContainer.addEventListener('mouseleave', () => {
        const rings = portalContainer.querySelectorAll('.portal-ring');
        rings.forEach(ring => {
            ring.style.animationDuration = '3s';
        });
    });
}

// Kaleidoscope speed control with mouse
const kaleidoscope = document.querySelector('.kaleidoscope-container');
if (kaleidoscope) {
    let kaleidSpeed = 20;
    
    kaleidoscope.addEventListener('mouseenter', () => {
        kaleidSpeed = 5;
        kaleidoscope.style.animationDuration = kaleidSpeed + 's';
    });
    
    kaleidoscope.addEventListener('mouseleave', () => {
        kaleidSpeed = 20;
        kaleidoscope.style.animationDuration = kaleidSpeed + 's';
    });
}

console.log('🎨 Modern Web Showcase - Interactive Experience Loaded!');
console.log('💫 Featuring 30 cutting-edge web animation techniques');
console.log('✨ 15 Classic Effects + 15 Wild & Novel Animations');

