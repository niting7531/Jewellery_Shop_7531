// ===========================
// Lucky Draw Wheel System
// ===========================

let isSpinning = false;
let soundEnabled = true;
let currentRotation = 0;

// Prize configuration
const prizes = {
    grand: { name: 'Diamond Ring', value: '$5,000', color: '#FFD700', maxWinners: 1 },
    second: { name: 'Gold Necklace', value: '$3,000', color: '#C0C0C0', maxWinners: 1 },
    third: { name: 'Silver Bracelet', value: '$1,500', color: '#CD7F32', maxWinners: 1 },
    consolation: { name: 'Shopping Voucher & Pearl Earrings', value: '$500', color: '#4CAF50', maxWinners: 10 }
};

// Initialize Draw Page
document.addEventListener('DOMContentLoaded', () => {
    const startDrawBtn = document.getElementById('startDrawBtn');
    const spinButton = document.getElementById('spinButton');
    const soundToggle = document.getElementById('soundToggle');
    const prizeCategory = document.getElementById('prizeCategory');
    
    // Draw wheel
    drawWheel();
    
    // Start Draw Button
    startDrawBtn.addEventListener('click', () => {
        const category = prizeCategory.value;
        if (!canDrawPrize(category)) {
            alert('All prizes for this category have been drawn already!');
            return;
        }
        
        const participants = JSON.parse(localStorage.getItem('participants') || '[]');
        if (participants.length === 0) {
            alert('No participants registered yet!');
            return;
        }
        
        // Enable spin button
        spinButton.disabled = false;
        startDrawBtn.disabled = true;
        
        // Hide previous result
        document.getElementById('drawResult').classList.add('hidden');
    });
    
    // Spin Button
    spinButton.addEventListener('click', () => {
        if (isSpinning) return;
        
        const category = prizeCategory.value;
        spinWheel(category);
    });
    
    // Sound Toggle
    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        const icon = soundToggle.querySelector('i');
        if (soundEnabled) {
            icon.className = 'fas fa-volume-up';
        } else {
            icon.className = 'fas fa-volume-mute';
        }
    });
    
    // Reset when category changes
    prizeCategory.addEventListener('change', () => {
        spinButton.disabled = true;
        startDrawBtn.disabled = false;
        document.getElementById('drawResult').classList.add('hidden');
    });
});

// Draw the wheel on canvas
function drawWheel() {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 250;
    
    // Get eligible participants
    const participants = getEligibleParticipants();
    
    if (participants.length === 0) {
        // Draw empty wheel
        ctx.fillStyle = '#f0f0f0';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#666';
        ctx.font = 'bold 24px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('No Participants', centerX, centerY);
        return;
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw wheel segments
    const numSegments = Math.min(participants.length, 12);
    const anglePerSegment = (2 * Math.PI) / numSegments;
    const colors = ['#D4AF37', '#F4E5C3', '#B8960C', '#E6D89C', '#C9A961', '#DCC994'];
    
    for (let i = 0; i < numSegments; i++) {
        const startAngle = i * anglePerSegment + currentRotation;
        const endAngle = startAngle + anglePerSegment;
        
        // Draw segment
        ctx.fillStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
        
        // Draw border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw participant info
        if (i < participants.length) {
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + anglePerSegment / 2);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#1A1A1A';
            ctx.font = 'bold 14px Poppins';
            ctx.fillText(participants[i].ticketNumber, radius - 80, 5);
            ctx.font = '12px Poppins';
            ctx.fillText(participants[i].fullName.split(' ')[0], radius - 80, 20);
            ctx.restore();
        }
    }
    
    // Draw center circle
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 60, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw outer border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw pointer at top
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.moveTo(centerX, 20);
    ctx.lineTo(centerX - 20, 60);
    ctx.lineTo(centerX + 20, 60);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Spin the wheel animation
function spinWheel(category) {
    if (isSpinning) return;
    
    isSpinning = true;
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;
    
    // Play sound effect
    if (soundEnabled) {
        playSpinSound();
    }
    
    // Get eligible participants
    const participants = getEligibleParticipants();
    
    if (participants.length === 0) {
        alert('No eligible participants for this draw!');
        isSpinning = false;
        spinButton.disabled = false;
        return;
    }
    
    // Random winner selection
    const winner = participants[Math.floor(Math.random() * participants.length)];
    
    // Calculate spin parameters
    const numSpins = 5 + Math.random() * 3; // 5-8 full rotations
    const extraRotation = Math.random() * 2 * Math.PI;
    const totalRotation = numSpins * 2 * Math.PI + extraRotation;
    const duration = 5000; // 5 seconds
    const startTime = Date.now();
    
    // Animation function
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        currentRotation = totalRotation * easeProgress;
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Spin complete
            isSpinning = false;
            spinButton.disabled = true;
            document.getElementById('startDrawBtn').disabled = false;
            
            // Show winner
            setTimeout(() => {
                showWinner(winner, category);
            }, 500);
        }
    }
    
    animate();
}

// Show winner result
function showWinner(winner, category) {
    const prize = prizes[category];
    
    // Save winner to localStorage
    const winners = JSON.parse(localStorage.getItem('winners') || '[]');
    const winnerData = {
        id: Date.now(),
        ticketNumber: winner.ticketNumber,
        name: winner.fullName,
        phone: winner.phone,
        email: winner.email,
        prize: `${prize.name} (${prize.value})`,
        category: category,
        drawnAt: new Date().toISOString()
    };
    winners.push(winnerData);
    localStorage.setItem('winners', JSON.stringify(winners));
    
    // Update participant status
    const participants = JSON.parse(localStorage.getItem('participants'));
    const participantIndex = participants.findIndex(p => p.ticketNumber === winner.ticketNumber);
    if (participantIndex !== -1) {
        participants[participantIndex].status = 'winner';
        localStorage.setItem('participants', JSON.stringify(participants));
    }
    
    // Display result
    document.getElementById('winnerName').textContent = winner.fullName;
    document.getElementById('winnerTicket').textContent = winner.ticketNumber;
    document.getElementById('winnerPrize').textContent = `${prize.name} - ${prize.value}`;
    document.getElementById('drawResult').classList.remove('hidden');
    
    // Play confetti
    if (window.createConfetti) {
        window.createConfetti();
    }
    
    // Play win sound
    if (soundEnabled) {
        playWinSound();
    }
    
    // Update statistics
    if (window.updateStatistics) {
        window.updateStatistics();
    }
    
    // Reload winners display
    if (window.loadWinners) {
        window.loadWinners();
    }
}

// Get eligible participants (not already winners)
function getEligibleParticipants() {
    const participants = JSON.parse(localStorage.getItem('participants') || '[]');
    const winners = JSON.parse(localStorage.getItem('winners') || '[]');
    
    // Filter out participants who have already won
    return participants.filter(participant => {
        return !winners.find(winner => winner.ticketNumber === participant.ticketNumber);
    });
}

// Check if can draw prize
function canDrawPrize(category) {
    const winners = JSON.parse(localStorage.getItem('winners') || '[]');
    const categoryWinners = winners.filter(w => w.category === category);
    return categoryWinners.length < prizes[category].maxWinners;
}

// Sound effects (simple beep using Web Audio API)
function playSpinSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not supported');
    }
}

function playWinSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Play a triumphant chord
        const frequencies = [523.25, 659.25, 783.99]; // C, E, G
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            const startTime = audioContext.currentTime + (index * 0.1);
            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 1);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + 1);
        });
    } catch (e) {
        console.log('Audio not supported');
    }
}