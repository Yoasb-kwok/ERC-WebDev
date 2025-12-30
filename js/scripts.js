// 1. Import Firebase SDKs (App, Analytics, and Firestore)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } 
    from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// 2. Your Web App Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8UQ5702asQU7SGyfGhTgfZBmLv5FjUbc",
    authDomain: "erc-booking.firebaseapp.com",
    projectId: "erc-booking",
    storageBucket: "erc-booking.firebasestorage.app",
    messagingSenderId: "69669577622",
    appId: "1:69669577622:web:ac786d4615a81b4507b3b7",
    measurementId: "G-XRHJRLPBR6"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Database

// --- PAGE NAVIGATION LOGIC ---
// We attach functions to 'window' so they can be called directly from HTML onclick (for mobile toggle)
// and by event listeners.

// --- MOBILE MENU TOGGLE LOGIC ---
window.toggleMobileMenu = function() {
    const navLinks = document.getElementById('mobile-nav-links');
    if (navLinks) {
        navLinks.classList.toggle('open');
        // Optional: Change the icon from bars to times (X) when open
        const menuToggleIcon = document.querySelector('.menu-toggle i');
        if (menuToggleIcon) { // Ensure the icon exists before trying to manipulate it
            if (navLinks.classList.contains('open')) {
                menuToggleIcon.classList.remove('fa-bars');
                menuToggleIcon.classList.add('fa-times');
            } else {
                menuToggleIcon.classList.remove('fa-times');
                menuToggleIcon.classList.add('fa-bars');
            }
        }
    }
};

window.showPage = function(pageId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.classList.remove('active'));

    // Remove active class from all nav buttons (now anchor tags)
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));

    // Show selected section
    const selectedSection = document.getElementById(pageId);
    if (selectedSection) selectedSection.classList.add('active');

    // Highlight nav button based on data-page-id
    const matchingBtn = document.querySelector(`.nav-btn[data-page-id="${pageId}"]`);
    if (matchingBtn) {
        matchingBtn.classList.add('active');
    }

    // Close mobile menu if it's open (existing logic)
    const navLinks = document.getElementById('mobile-nav-links');
    if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        const menuToggleIcon = document.querySelector('.menu-toggle i');
        if (menuToggleIcon) { // Ensure the icon exists before trying to manipulate it
            menuToggleIcon.classList.remove('fa-times');
            menuToggleIcon.classList.add('fa-bars');
        }
    }

    // If navigating to the booking page, ensure slots are generated (existing logic)
    if (pageId === 'booking') {
        window.generateTimeSlots();
    }

    window.scrollTo(0, 0);
};

// --- BOOKING SYSTEM VARIABLES ---
let selectedBookingDate = '';
let selectedBookingTime = '';

// --- GENERATE TIME SLOTS (CHECKING FIREBASE) ---
window.generateTimeSlots = async function() {
    const timeSlotsContainer = document.getElementById('time-slots-grid');
    const dateInput = document.getElementById('booking-date');
    
    if (!timeSlotsContainer || !dateInput.value) return;

    timeSlotsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">正在檢查預約狀況...</p>'; 

    const selectedDate = dateInput.value;
    
    // 1. Check Firebase for existing bookings on this date
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("date", "==", selectedDate));
    const querySnapshot = await getDocs(q);

    const bookedTimes = new Set();
    querySnapshot.forEach((doc) => {
        bookedTimes.add(doc.data().time);
    });

    // 2. Render Slots
    timeSlotsContainer.innerHTML = ''; 
    const startTimeMinutes = 10 * 60; // 10:00 AM
    const endTimeMinutes = 17 * 60;   // 5:00 PM
    const interval = 30;

    for (let minutes = startTimeMinutes; minutes <= endTimeMinutes; minutes += interval) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

        const slotButton = document.createElement('button');
        slotButton.classList.add('time-slot-btn');
        slotButton.textContent = timeString;
        slotButton.setAttribute('data-time', timeString);

        // If time is in bookedTimes, disable it
        if (bookedTimes.has(timeString)) {
            slotButton.disabled = true;
            slotButton.style.backgroundColor = '#ccc';
            slotButton.style.color = '#666';
            slotButton.style.cursor = 'not-allowed';
            slotButton.title = "已預約";
        } else {
            slotButton.onclick = function() { selectTimeSlot(this); };
        }

        timeSlotsContainer.appendChild(slotButton);
    }
};

window.selectTimeSlot = function(button) {
    const allSlots = document.querySelectorAll('.time-slot-btn');
    allSlots.forEach(slot => slot.classList.remove('active'));
    button.classList.add('active');
    selectedBookingTime = button.getAttribute('data-time');
    
    const dateInput = document.getElementById('booking-date');
    if (dateInput) selectedBookingDate = dateInput.value;
};

// --- SUBMIT BOOKING & HANDOFF TO WHATSAPP ---
window.submitBooking = async function() {
    // 1. Get User Input
    const name = document.getElementById('booking-name').value;
    const phone = document.getElementById('booking-phone').value;
    const email = document.getElementById('booking-email').value;

    // Validation
    if (!selectedBookingDate || !selectedBookingTime || !name || !phone || !email) {
        alert('請填寫所有預約資訊並選擇時間！');
        return;
    }

    // Disable button to prevent double-clicks
    const submitBtn = document.querySelector('.booking-form button[type="submit"]');
    if(submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "處理中...";
    }

    try {
        // 2. Save to Firebase (This is your Database Backup)
        await addDoc(collection(db, "bookings"), {
            name: name,
            phone: phone,
            email: email,
            date: selectedBookingDate,
            time: selectedBookingTime,
            created_at: serverTimestamp() // Adds the server time
        });

        // 3. Construct the WhatsApp Message
        // We use \n for line breaks.
        const waMessage = 
            `你好 ERC，我想預約體驗。\n\n` +
            `👤 *姓名:* ${name}\n` +
            `📱 *電話:* ${phone}\n` +
            `📧 *電郵:* ${email}\n` +
            `📅 *日期:* ${selectedBookingDate}\n` +
            `⏰ *時間:* ${selectedBookingTime}`;

        // 4. Create the Link
        // 85296061079 is your number. encodeURIComponent ensures spaces/symbols work.
        // NOTE: The previous message mistakenly used 85255379080, I've reverted to 85296061079 from your original contact card.
        const waUrl = `https://wa.me/85296061079?text=${encodeURIComponent(waMessage)}`;

        // 5. Open WhatsApp
        // Opens in a new tab so they don't lose your website
        window.open(waUrl, '_blank');

        // Success Alert
        alert('資料已儲存！我們將轉至 WhatsApp 以便您發送預約詳情。');
        
        // Reset Form & Refresh Slots
        document.getElementById('booking-form').reset();
        selectedBookingDate = '';
        selectedBookingTime = '';
        generateTimeSlots(); 

    } catch (e) {
        console.error("Error adding document: ", e);
        alert("預約失敗，請檢查網絡連接。");
    } finally {
        // Re-enable button
        if(submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "<span>確認預約</span>";
        }
    }
};

// --- SLIDER LOGIC ---
let currentSlide = 0;
const slides = document.querySelectorAll('#home .slide');
const totalSlides = slides.length;
let autoSlideInterval;

window.changeSlide = function(direction) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    currentSlide = currentSlide + direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    else if (currentSlide < 0) currentSlide = totalSlides - 1;
    slides[currentSlide].classList.add('active');
};

function startAutoSlide() {
    autoSlideInterval = setInterval(() => changeSlide(1), 5000);
}
// Start auto-slide only if there are slides
if (totalSlides > 0) startAutoSlide();


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = (today.getMonth() + 1).toString().padStart(2, '0');
        const dd = today.getDate().toString().padStart(2, '0');
        const todayString = `${yyyy}-${mm}-${dd}`;

        dateInput.value = todayString;
        selectedBookingDate = todayString;
        dateInput.min = todayString;

        dateInput.addEventListener('change', (event) => {
            selectedBookingDate = event.target.value;
            selectedBookingTime = '';
            generateTimeSlots(); 
        });
    }

    // NEW: Generic handler for all navigation anchor clicks
    const handleNavigationClick = (event) => {
        const target = event.currentTarget; // The clicked <a> element
        const pageId = target.dataset.pageId; // Get page ID from data-page-id attribute

        if (pageId) {
            event.preventDefault(); // Stop the browser from changing the URL with the hash
            window.showPage(pageId); // Call your existing showPage function
        }
    };

    // Attach click listeners to all relevant navigation elements
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.addEventListener('click', handleNavigationClick);
    });

    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', handleNavigationClick);
    }

    document.querySelectorAll('.hero .cta-button').forEach(button => {
        button.addEventListener('click', handleNavigationClick);
    });

    // Handle initial page load based on URL hash (if any)
    // This allows bookmarking specific pages.
    const initialHash = window.location.hash;
    if (initialHash && initialHash.startsWith('#/')) {
        const initialPageId = initialHash.substring(2); // Remove '#/'
        window.showPage(initialPageId);
    } else {
        window.showPage('home'); // Default to home if no hash or invalid hash
    }
});
