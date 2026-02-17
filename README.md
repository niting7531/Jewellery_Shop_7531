# 🎁 Jewellery Lucky Draw Website

A complete, professional lucky draw web application designed for jewellery shops. This fully functional client-side application features an elegant luxury design, interactive spinning wheel, admin dashboard, and comprehensive winner management system.

## ✨ Features Overview

### 🏠 **Landing Page**
- Elegant jewellery-themed design with gold accents and sparkle animations
- Event title and description
- Countdown timer to draw date (December 31, 2026)
- Featured prizes showcase
- How to participate section
- Call-to-action buttons for registration and viewing winners

### 📝 **Participant Registration**
- User-friendly registration form with validation
- Required fields: Full Name, Phone Number, Email
- Optional: Purchase Receipt Number
- Automatic unique ticket number generation (Format: LJ26XXXXXX)
- Duplicate entry prevention (email/phone check)
- Success confirmation modal with ticket number display
- Confetti celebration animation on successful registration

### 🎰 **Lucky Draw System**
- Interactive spinning wheel with smooth animations
- Canvas-based wheel visualization showing participant tickets
- Prize categories:
  - **Grand Prize**: Diamond Ring ($5,000) - 1 Winner
  - **2nd Prize**: Gold Necklace ($3,000) - 1 Winner  
  - **3rd Prize**: Silver Bracelet ($1,500) - 1 Winner
  - **Consolation**: Shopping Voucher & Pearl Earrings ($500 each) - 10 Winners
- Fair random selection algorithm
- Sound effects with mute toggle
- Winner announcement with confetti animation
- Prevents duplicate winners

### 🏆 **Winners Display**
- Real-time winner announcements
- Winner cards showing name, ticket number, and prize
- Elegant grid layout
- "No winners yet" placeholder before draw event

### 🔐 **Admin Dashboard** (Password: admin123)
- Secure password authentication
- Statistics dashboard:
  - Total participants count
  - Total winners count
  - Remaining prizes count
- **Participant Management:**
  - View all registered participants in table format
  - Search functionality (by name, email, phone, ticket number)
  - Shows winner status for each participant
  - Delete participant option
- **Draw Controls:**
  - Conduct live draws from admin panel
  - Export all data to CSV file
  - Reset entire system option
- **Data Export:**
  - CSV export includes: Ticket#, Name, Phone, Email, Receipt, Status, Prize, Registration Date
  - Filename format: `lucky-draw-participants-YYYY-MM-DD.csv`

### 📋 **Additional Pages**
- **Prizes Gallery**: Detailed prize information with values and descriptions
- **FAQ**: Comprehensive frequently asked questions with accordion interface
- **Terms & Conditions**: Complete rules and regulations
- **Contact Us**: Contact information and message form with social media links

### 🎨 **Design Features**
- Luxury color scheme: Gold (#D4AF37), Diamond White, Elegant Black
- Animated sparkles and gold accents throughout
- Smooth page transitions and hover effects
- Fully responsive design (mobile, tablet, desktop)
- Professional typography (Playfair Display + Poppins)
- Font Awesome icons integration
- Confetti animations for celebrations

## 🚀 Technical Details

### **Technology Stack**
- **HTML5**: Semantic structure
- **CSS3**: Custom styling with CSS variables, animations, flexbox, grid
- **Vanilla JavaScript**: No framework dependencies
- **Canvas API**: For spinning wheel visualization
- **Web Audio API**: For sound effects
- **LocalStorage**: Client-side data persistence

### **File Structure**
```
├── index.html           # Main HTML file with all pages
├── css/
│   └── style.css       # Complete styling with animations
├── js/
│   ├── app.js          # Main application logic and navigation
│   ├── draw.js         # Lucky draw wheel system
│   └── confetti.js     # Confetti animation system
└── README.md           # This file
```

### **Data Storage**
All data is stored in browser localStorage:
- **participants**: Array of participant objects
  ```javascript
  {
    id: timestamp,
    ticketNumber: "LJ26XXXXXX",
    fullName: "string",
    phone: "string",
    email: "string",
    receiptNumber: "string",
    registeredAt: "ISO date",
    status: "active" | "winner"
  }
  ```
- **winners**: Array of winner objects
  ```javascript
  {
    id: timestamp,
    ticketNumber: "LJ26XXXXXX",
    name: "string",
    phone: "string",
    email: "string",
    prize: "string",
    category: "grand" | "second" | "third" | "consolation",
    drawnAt: "ISO date"
  }
  ```
- **adminLoggedIn**: Boolean flag for admin authentication

## 📖 How to Use

### **For Customers:**
1. **Register**: Click "Enter Lucky Draw" button
2. Fill in your details (name, phone, email, receipt number)
3. Agree to terms and submit
4. Save your unique ticket number
5. **Check Status**: Use "Check My Entry Status" to verify registration
6. **Wait for Draw**: Draw date is December 31, 2026 at 6:00 PM

### **For Administrators:**
1. **Login**: Navigate to Admin page, password: `admin123`
2. **View Participants**: See all registered entries in the table
3. **Search**: Use search box to find specific participants
4. **Conduct Draw**:
   - Go to "Lucky Draw" page
   - Select prize category
   - Click "Start Draw"
   - Click the center spin button
   - Winner will be displayed automatically
5. **Export Data**: Click "Export to CSV" to download all participant data
6. **Reset System**: Use cautiously - deletes all data permanently

### **Drawing Process:**
1. Admin selects prize category (Grand, 2nd, 3rd, or Consolation)
2. Clicks "Start Draw" to enable the wheel
3. Clicks the center button to spin the wheel
4. Wheel spins with animation and sound effects
5. Winner is randomly selected and displayed
6. Winner data is automatically saved
7. Participant status updated to "winner"
8. Winner appears on Winners page immediately

## 🎯 Current Functional Entry URIs

### **Main Pages:**
- `/` or `/#home` - Landing page
- `/#register` - Registration form
- `/#draw` - Lucky draw wheel
- `/#winners` - Winners display
- `/#prizes` - Prize gallery
- `/#faq` - FAQ page
- `/#terms` - Terms & Conditions
- `/#contact` - Contact page
- `/#admin` - Admin dashboard (password protected)

### **Modal Functions:**
- Check Entry Status modal (from home page)
- Registration confirmation modal
- Admin login modal

## ✅ Currently Completed Features

- ✅ Complete responsive website structure
- ✅ Elegant luxury jewellery theme design
- ✅ Participant registration system with validation
- ✅ Unique ticket number generation
- ✅ Duplicate entry prevention
- ✅ Interactive spinning wheel with canvas animation
- ✅ Fair random winner selection
- ✅ Sound effects (with mute option)
- ✅ Confetti celebration animations
- ✅ Winner display and history
- ✅ Admin authentication system
- ✅ Participant management table
- ✅ CSV data export functionality
- ✅ Search participants feature
- ✅ Statistics dashboard
- ✅ Countdown timer to event
- ✅ FAQ accordion interface
- ✅ All informational pages (Prizes, Terms, Contact)
- ✅ Mobile responsive design
- ✅ LocalStorage data persistence

## 🔮 Future Enhancement Possibilities

### **Not Yet Implemented (Optional Enhancements):**
- Email/SMS notifications to winners (requires backend)
- QR code generation for tickets
- Social media sharing buttons functionality
- Print winner certificates
- Multi-language support
- Real-time live draw streaming
- Photo upload for winners gallery
- Integration with external databases
- Payment gateway for entry fees
- Printable ticket PDFs

## 🎨 Color Palette

- **Primary Gold**: `#D4AF37`
- **Dark Gold**: `#B8960C`
- **Light Gold**: `#F4E5C3`
- **Diamond White**: `#FAFAFA`
- **Elegant Black**: `#1A1A1A`
- **Text Dark**: `#2C2C2C`
- **Text Light**: `#666666`

## 🎵 Sound Effects

The application includes simple sound effects using Web Audio API:
- **Spin Sound**: Plays when wheel starts spinning
- **Win Sound**: Plays when winner is announced (triumphant chord)
- **Mute Toggle**: Users can disable sounds anytime

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements:**
- JavaScript enabled
- LocalStorage support
- Canvas API support
- Modern browser (2020+)

## 🔒 Security Notes

- Admin password is stored in plain text in JavaScript (for demo purposes)
- For production use, implement proper backend authentication
- All data stored in browser localStorage (client-side only)
- No sensitive payment or personal data is collected beyond basic contact info

## 📊 Demo Data

The system starts with empty data. To test:
1. Register a few participants with different details
2. Login to admin (password: admin123)
3. Go to Lucky Draw page
4. Select a prize category and conduct a draw
5. Check Winners page to see results

## 🎓 Recommended Next Steps

1. **Add Backend Integration**: 
   - Implement Node.js/Express backend for data persistence
   - Add database (MongoDB, PostgreSQL) for production use
   
2. **Email Notifications**:
   - Set up email service (SendGrid, Mailgun)
   - Send confirmation emails on registration
   - Notify winners automatically

3. **SMS Integration**:
   - Integrate Twilio or similar for SMS notifications
   - Send ticket numbers via SMS

4. **Enhanced Security**:
   - Implement proper authentication (JWT tokens)
   - Hash admin passwords
   - Add CAPTCHA for registration

5. **Analytics**:
   - Add Google Analytics
   - Track registration conversions
   - Monitor user engagement

6. **Live Streaming**:
   - Integrate video streaming for live draw events
   - Real-time updates using WebSockets

## 📞 Support & Contact

For questions about this lucky draw system:
- **Email**: info@luxuryjewels.com
- **Phone**: +1 (555) 123-4567
- **Address**: 123 Diamond Street, Jewellery District, New York, NY 10001

## 📄 License & Usage

This is a demo project. Feel free to customize and use for your jewellery shop or similar events.

---

## 🎉 Quick Start Guide

1. **Open `index.html`** in a modern web browser
2. **Register participants** via "Enter Draw" button
3. **Login to admin** (password: admin123)
4. **Conduct draws** from Lucky Draw page
5. **View winners** on Winners page
6. **Export data** anytime from admin panel

**That's it! Your lucky draw system is ready to use!** 🎊

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Developer**: Luxury Jewels Development Team