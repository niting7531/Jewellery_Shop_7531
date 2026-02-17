// ===========================
// Confetti Animation System
// ===========================

function createConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Confetti particles
    const confettiPieces = [];
    const confettiCount = 150;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
        '#D4AF37', // Gold
        '#FFD700', // Bright Gold
        '#F4E5C3', // Light Gold
        '#FFA500', // Orange
        '#FF6B6B', // Red
        '#4ECDC4', // Turquoise
        '#45B7D1', // Blue
        '#FFA07A', // Light Salmon
        '#DDA0DD', // Plum
        '#98D8C8'  // Mint
    ];
    
    // Confetti particle class
    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.w = Math.random() * 10 + 5;
            this.h = Math.random() * 5 + 5;
            this.vx = Math.random() * 4 - 2;
            this.vy = Math.random() * 3 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 10 - 5;
            this.opacity = 1;
        }
        
        update() {
            this.vy += gravity;
            this.vx *= (1 - drag);
            this.vy = Math.min(this.vy, terminalVelocity);
            
            this.x += this.vx;
            this.y += this.vy;
            
            this.rotation += this.rotationSpeed;
            
            // Fade out as it falls
            if (this.y > canvas.height * 0.75) {
                this.opacity -= 0.01;
            }
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.restore();
        }
        
        isOffScreen() {
            return this.y > canvas.height + 10 || this.opacity <= 0;
        }
    }
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push(new ConfettiPiece());
    }
    
    // Animation loop
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece, index) => {
            piece.update();
            piece.draw();
            
            // Remove off-screen pieces
            if (piece.isOffScreen()) {
                confettiPieces.splice(index, 1);
            }
        });
        
        if (confettiPieces.length > 0) {
            animationId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(animationId);
        }
    }
    
    animate();
}

// Sparkle effect for special elements
function createSparkles(element) {
    const sparkleCount = 20;
    const duration = 2000;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #D4AF37;
                border-radius: 50%;
                pointer-events: none;
                animation: sparkleFloat 1s ease-out forwards;
                box-shadow: 0 0 10px #D4AF37;
            `;
            
            const rect = element.getBoundingClientRect();
            sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
            sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, Math.random() * duration);
    }
}

// Add sparkle animation CSS if not exists
if (!document.getElementById('sparkleAnimation')) {
    const style = document.createElement('style');
    style.id = 'sparkleAnimation';
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Window resize handler for confetti canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Export functions for global access
window.createConfetti = createConfetti;
window.createSparkles = createSparkles;