# 🏏 Elite Academy Management System - Project Documentation

Welcome to your new Academy ERP! This documentation is designed to help you understand, maintain, and customize your mobile-first React application.

---

## 🚀 1. Getting Started

### Prerequisites
- **Node.js**: Installed on your computer.
- **Terminal/Command Prompt**: Basic knowledge of running commands.

### Running the App Locally
1. Open the project folder in your terminal.
2. Install dependencies: `npm install`
3. Start the app: `npm run dev`
4. Open the link (usually `http://localhost:5173`) in your browser.

> [!TIP]
> To see the app as it will look on a phone, right-click on the browser page, select **Inspect**, and click the **Toggle Device Toolbar** icon (mobile icon) at the top of the inspect panel.

---

## 🛠 2. Tech Stack (The "Engine")

- **React + Vite**: The foundation of the app. Vite makes it super fast to develop and load.
- **Tailwind CSS**: Used for all styling. Instead of writing separate CSS files, we use utility classes directly in the HTML (e.g., `bg-orange-500` for an orange background).
- **Framer Motion**: Handles all smooth animations, transitions between pages, and button "pops."
- **Lucide React**: The library providing all the beautiful icons (Search, Users, Trophy, etc.).

---

## 📂 3. Project Structure

Here is a map of your files:

```text
/
├── public/                 # Static assets (logos, manifest for PWA)
├── src/
│   ├── components/         # Reusable UI parts (BottomNav, StudentDetail)
│   ├── data/               # Mock data (mockData.js - your "database")
│   ├── lib/                # Helper functions (utils.js)
│   ├── pages/              # Main screens of the app
│   │   ├── Login.jsx       # The entry screen
│   │   ├── Dashboard.jsx   # The home screen with analytics
│   │   ├── Students.jsx    # The student directory & search
│   │   ├── Attendance.jsx  # Daily attendance marking
│   │   ├── Fees.jsx        # Finance & collection overview
│   │   └── Profile.jsx     # Settings & logout
│   ├── App.jsx             # The "Brain" - handles routing and state
│   ├── App.css             # Secondary styles (mostly empty now)
│   ├── index.css           # Global styles and custom "glass" effects
│   └── main.jsx            # The entry point that starts React
├── index.html              # The main HTML wrapper
├── tailwind.config.js      # Custom theme colors and settings
└── package.json            # List of all installed tools/libraries
```

---

## 🧩 4. Key Features & Customization

### How Search Works
The search bar in `Students.jsx` is "multi-parameter." It checks the student's **Name**, **Date of Birth (DOB)**, and **Mobile Number** simultaneously. 
*   **Location**: `src/pages/Students.jsx` inside the `filteredStudents` function.

### How to Add/Edit Students
Since there is no backend (Firebase/SQL) connected yet, we use "Mock Data."
*   **File**: `src/data/mockData.js`
*   **Action**: Simply add a new object to the `students` array to see it appear in the app instantly.

### Changing the Theme Color
If you want to change the primary color again:
1. Open `tailwind.config.js`.
2. Change the hex code for `accent` or `orange`.
3. Tailwind will automatically update the entire app.

---

## 📱 5. Mobile "Native" Feel

We have implemented several tricks to make this feel like a real App:
1. **Fullscreen Logic**: In `App.jsx`, there is a function `enableFullScreen()` that triggers when you log in.
2. **PWA Manifest**: The `public/manifest.json` tells phones that this website can be "Installed" to the home screen.
3. **No-Scroll Body**: The `index.css` hides scrollbars and prevents accidental "pull-to-refresh" on mobile browsers.

---

## 💡 6. Pro Tips for Development

- **Tailwind Classes**: Use [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet) to find class names quickly.
- **Icons**: Search for icons at [lucide.dev](https://lucide.dev/icons).
- **Console Errors**: If the app stops working, check the browser console (Press F12) for error messages.

---

*Documentation generated for Academy ERP v1.0.4*
