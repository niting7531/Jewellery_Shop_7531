// ===========================
// Main Application Logic
// ===========================

// Navigation
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupNavigation();
    setupCountdown();
    setupFAQ();
    setupModals();
    setupRegistration();
    setupAdminPanel();
    setupContactForm();
    updateStatistics();
    loadWinners();
});

// Initialize App
function initializeApp() {
    // Initialize localStorage if not exists
    if (!localStorage.getItem('participants')) {
        localStorage.setItem('participants', JSON.stringify([]));
    }
    if (!localStorage.getItem('winners')) {
        localStorage.setItem('winners', JSON.stringify([]));
    }
    if (!localStorage.getItem('adminLoggedIn')) {
        localStorage.setItem('adminLoggedIn', 'false');
    }
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage + 'Page') {
                    page.classList.add('active');
                }
            });
            
            // Close mobile menu
            navMenu.classList.remove('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Countdown Timer
function setupCountdown() {
    const drawDate = new Date('2026-12-31T18:00:00').getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = drawDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    };
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ Accordion
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Modal System
function setupModals() {
    const checkEntryBtn = document.getElementById('checkEntryBtn');
    const entryStatusModal = document.getElementById('entryStatusModal');
    const checkEntryForm = document.getElementById('checkEntryForm');
    
    // Check Entry Status
    checkEntryBtn.addEventListener('click', () => {
        openModal('entryStatusModal');
    });
    
    checkEntryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('checkEntryInput').value.trim();
        checkEntryStatus(input);
    });
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').classList.remove('active');
        });
    });
    
    // Close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Registration System
function setupRegistration() {
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const receiptNumber = document.getElementById('receiptNumber').value.trim();
        
        // Check for duplicate entries
        const participants = JSON.parse(localStorage.getItem('participants'));
        const duplicate = participants.find(p => p.email === email || p.phone === phone);
        
        if (duplicate) {
            alert('You have already registered with this email or phone number!');
            return;
        }
        
        // Generate unique ticket number
        const ticketNumber = generateTicketNumber();
        
        // Create participant object
        const participant = {
            id: Date.now(),
            ticketNumber,
            fullName,
            phone,
            email,
            receiptNumber,
            registeredAt: new Date().toISOString(),
            status: 'active'
        };
        
        // Save to localStorage
        participants.push(participant);
        localStorage.setItem('participants', JSON.stringify(participants));
        
        // Show confirmation
        showConfirmation(ticketNumber);
        
        // Reset form
        registerForm.reset();
        
        // Update statistics
        updateStatistics();
    });
}

function generateTicketNumber() {
    const prefix = 'LJ';
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}${year}${random}`;
}

function showConfirmation(ticketNumber) {
    document.getElementById('confirmedTicketNumber').textContent = ticketNumber;
    openModal('confirmationModal');
    
    // Play confetti animation
    if (window.createConfetti) {
        window.createConfetti();
    }
}

function checkEntryStatus(input) {
    const participants = JSON.parse(localStorage.getItem('participants'));
    const participant = participants.find(p => 
        p.email.toLowerCase() === input.toLowerCase() || 
        p.phone === input
    );
    
    const resultDiv = document.getElementById('entryStatusResult');
    
    if (participant) {
        const winners = JSON.parse(localStorage.getItem('winners'));
        const isWinner = winners.find(w => w.ticketNumber === participant.ticketNumber);
        
        let html = `
            <div style="padding: 30px; background: var(--bg-light); border-radius: 15px; margin-top: 20px;">
                <h3 style="color: var(--primary-gold); margin-bottom: 15px;">
                    <i class="fas fa-check-circle"></i> Entry Found!
                </h3>
                <p><strong>Name:</strong> ${participant.fullName}</p>
                <p><strong>Ticket Number:</strong> ${participant.ticketNumber}</p>
                <p><strong>Status:</strong> ${participant.status === 'active' ? 'Active' : 'Inactive'}</p>
        `;
        
        if (isWinner) {
            html += `
                <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 10px; border: 3px solid var(--primary-gold);">
                    <h4 style="color: var(--primary-gold); margin-bottom: 10px;">🎉 CONGRATULATIONS! 🎉</h4>
                    <p style="margin: 0;"><strong>You are a WINNER!</strong></p>
                    <p style="margin: 5px 0 0 0;">Prize: ${isWinner.prize}</p>
                </div>
            `;
        }
        
        html += '</div>';
        resultDiv.innerHTML = html;
    } else {
        resultDiv.innerHTML = `
            <div style="padding: 30px; background: #f8d7da; border-radius: 15px; margin-top: 20px; text-align: center;">
                <i class="fas fa-times-circle" style="font-size: 50px; color: #721c24; margin-bottom: 15px;"></i>
                <p style="color: #721c24; margin: 0;"><strong>No entry found with this information.</strong></p>
            </div>
        `;
    }
    
    resultDiv.classList.remove('hidden');
}

// Admin Panel
function setupAdminPanel() {
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLogout = document.getElementById('adminLogout');
    const exportDataBtn = document.getElementById('exportDataBtn');
    const conductDrawBtn = document.getElementById('conductDrawBtn');
    const resetSystemBtn = document.getElementById('resetSystemBtn');
    const searchParticipant = document.getElementById('searchParticipant');
    
    // Check if already logged in
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showAdminDashboard();
    }
    
    // Admin Login
    adminLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        
        if (password === 'admin123') {
            localStorage.setItem('adminLoggedIn', 'true');
            showAdminDashboard();
        } else {
            alert('Incorrect password! Please try again.');
        }
    });
    
    // Admin Logout
    adminLogout.addEventListener('click', () => {
        localStorage.setItem('adminLoggedIn', 'false');
        document.getElementById('adminLogin').classList.remove('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('adminPassword').value = '';
    });
    
    // Export Data
    exportDataBtn.addEventListener('click', exportToCSV);
    
    // Conduct Draw
    conductDrawBtn.addEventListener('click', () => {
        // Navigate to draw page
        document.querySelector('[data-page="draw"]').click();
    });
    
    // Reset System
    resetSystemBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset the entire system? This will delete all participants and winners!')) {
            if (confirm('This action cannot be undone. Are you absolutely sure?')) {
                localStorage.setItem('participants', JSON.stringify([]));
                localStorage.setItem('winners', JSON.stringify([]));
                alert('System reset successfully!');
                location.reload();
            }
        }
    });
    
    // Search Participants
    searchParticipant.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        loadParticipantsTable(searchTerm);
    });
}

function showAdminDashboard() {
    document.getElementById('adminLogin').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    updateStatistics();
    loadParticipantsTable();
}

function updateStatistics() {
    const participants = JSON.parse(localStorage.getItem('participants') || '[]');
    const winners = JSON.parse(localStorage.getItem('winners') || '[]');
    
    const totalPrizes = 13; // 1 Grand + 1 Second + 1 Third + 10 Consolation
    const remaining = totalPrizes - winners.length;
    
    if (document.getElementById('totalParticipants')) {
        document.getElementById('totalParticipants').textContent = participants.length;
    }
    if (document.getElementById('totalWinners')) {
        document.getElementById('totalWinners').textContent = winners.length;
    }
    if (document.getElementById('remainingPrizes')) {
        document.getElementById('remainingPrizes').textContent = remaining;
    }
}

function loadParticipantsTable(searchTerm = '') {
    const participants = JSON.parse(localStorage.getItem('participants'));
    const winners = JSON.parse(localStorage.getItem('winners'));
    const tbody = document.getElementById('participantsTableBody');
    
    if (participants.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">No participants yet</td></tr>';
        return;
    }
    
    const filtered = participants.filter(p => {
        if (!searchTerm) return true;
        return p.fullName.toLowerCase().includes(searchTerm) ||
               p.email.toLowerCase().includes(searchTerm) ||
               p.phone.includes(searchTerm) ||
               p.ticketNumber.toLowerCase().includes(searchTerm);
    });
    
    tbody.innerHTML = filtered.map(participant => {
        const isWinner = winners.find(w => w.ticketNumber === participant.ticketNumber);
        const statusClass = isWinner ? 'status-winner' : 'status-active';
        const statusText = isWinner ? 'Winner' : 'Active';
        
        return `
            <tr>
                <td><strong>${participant.ticketNumber}</strong></td>
                <td>${participant.fullName}</td>
                <td>${participant.phone}</td>
                <td>${participant.email}</td>
                <td>${participant.receiptNumber || 'N/A'}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn btn-danger btn-small" onclick="deleteParticipant(${participant.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

function deleteParticipant(id) {
    if (confirm('Are you sure you want to delete this participant?')) {
        let participants = JSON.parse(localStorage.getItem('participants'));
        participants = participants.filter(p => p.id !== id);
        localStorage.setItem('participants', JSON.stringify(participants));
        loadParticipantsTable();
        updateStatistics();
        alert('Participant deleted successfully!');
    }
}

function exportToCSV() {
    const participants = JSON.parse(localStorage.getItem('participants'));
    const winners = JSON.parse(localStorage.getItem('winners'));
    
    if (participants.length === 0) {
        alert('No data to export!');
        return;
    }
    
    // CSV Headers
    let csv = 'Ticket Number,Full Name,Phone,Email,Receipt Number,Status,Prize Won,Registered At\n';
    
    // CSV Data
    participants.forEach(participant => {
        const winner = winners.find(w => w.ticketNumber === participant.ticketNumber);
        const status = winner ? 'Winner' : 'Active';
        const prize = winner ? winner.prize : 'N/A';
        
        csv += `${participant.ticketNumber},${participant.fullName},${participant.phone},${participant.email},${participant.receiptNumber || 'N/A'},${status},"${prize}",${participant.registeredAt}\n`;
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lucky-draw-participants-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Load Winners Display
function loadWinners() {
    const winners = JSON.parse(localStorage.getItem('winners') || '[]');
    const winnersContainer = document.getElementById('winnersContainer');
    
    if (winners.length === 0) {
        return; // Show default "no winners" message
    }
    
    const winnersHTML = `
        <div class="winners-grid">
            ${winners.map(winner => `
                <div class="winner-card">
                    <i class="fas fa-trophy"></i>
                    <h3>${winner.name}</h3>
                    <p class="ticket-num">Ticket #${winner.ticketNumber}</p>
                    <p class="prize-name">${winner.prize}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    winnersContainer.innerHTML = winnersHTML;
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Utility Functions
function showNotification(message, type = 'success') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}