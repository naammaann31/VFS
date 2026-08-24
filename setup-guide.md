# Setup & Deployment Guide - Free IELTS Mock Test System
**Client:** Vectra Foreign Services (Ahmedabad, India)  
**Architecture:** 100% Free Static Frontend (`ielts-mock-test.html`) + Google Apps Script + Google Sheets + Google Drive

---

## 📌 Overview

This complete IELTS Mock Test system runs with zero recurring operational costs. The candidate completes the test on your website, and all lead data, test answers, Task 2 essay responses, and recorded speaking audio files are automatically uploaded to your Google Sheet and Google Drive folder.

---

## 🚀 Step 1: Create Your Google Sheet & Apps Script Backend

1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Rename the spreadsheet to: **`Vectra IELTS Test Submissions`**.
3. In the top menu, click **Extensions** → **Apps Script**.
4. In the Apps Script code editor, delete any default `myFunction()` code.
5. Copy the entire contents of the file [`google-apps-script-backend.gs`](file:///c:/Users/LENOVO/Desktop/Projects/VFS/google-apps-script-backend.gs) and paste it into the editor.
6. (Optional) Customize the notification email at the top of the script:
   ```javascript
   var NOTIFY_EMAIL = "info@vectraforeignservices.com";
   ```
7. Click the **Save** icon (💾) or press `Ctrl + S`.

---

## 🌐 Step 2: Deploy Google Apps Script as a Web App

1. In the top-right corner of the Apps Script window, click **Deploy** → **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and select **Web app**.
3. Fill in the deployment details:
   - **Description**: `IELTS Mock Test Backend`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: **`Anyone`** *(Crucial: Allows candidate submissions without requiring candidate Google login)*.
4. Click **Deploy**.
5. Grant necessary Google permissions when prompted:
   - Click *Authorize Access*.
   - Choose your Google account.
   - Click *Advanced* → *Go to IELTS Mock Test Backend (unsafe)*.
   - Click *Allow*.
6. Copy the generated **Web App URL** (ends with `/exec`).

> 📋 **Example URL format:**  
> `https://script.google.com/macros/s/AKfycbx.../exec`

---

## ⚙️ Step 3: Configure Frontend HTML (`ielts-mock-test.html`)

1. Open [`ielts-mock-test.html`](file:///c:/Users/LENOVO/Desktop/Projects/VFS/ielts-mock-test.html) in your code editor.
2. Locate the `CONFIG` object near the bottom of the file (inside the `<script>` block):
   ```javascript
   const CONFIG = {
     // Paste your Google Web App URL here:
     SCRIPT_URL: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",

     // Upload your Listening MP3 audio file to your server and set URL here:
     LISTENING_AUDIO_URL: "https://vectraforeignservices.com/audio/ielts-listening-sample.mp3",

     // Test duration (default 40 minutes):
     TIMER_MINUTES: 40,

     NOTIFY_EMAIL: "info@vectraforeignservices.com"
   };
   ```
3. Save the file.

---

## 📤 Step 4: Upload Audio & HTML Page to Your Website Hosting

1. **Upload Listening Audio MP3**:
   - Upload your official Listening MP3 audio file to your website directory (e.g. `https://vectraforeignservices.com/audio/ielts-listening-sample.mp3`).
   - Paste that public URL into `CONFIG.LISTENING_AUDIO_URL`.
2. **Upload HTML Page**:
   - Upload `ielts-mock-test.html` to your website hosting server (cPanel, WordPress media, static server, or Vercel/Netlify).
   - Recommended URL structure: `https://vectraforeignservices.com/ielts-mock-test.html`.

> [!IMPORTANT]  
> **HTTPS Security Requirement:**  
> Modern mobile and desktop browsers (Chrome, Safari, iOS, Android) require an **HTTPS** secure connection (SSL certificate) to allow microphone recording via `getUserMedia`. Ensure your website domain uses `https://`.

---

## 📝 Step 5: How Vectra Team Reviews Submissions & Grades Tests

1. Open your **`Vectra IELTS Test Submissions`** Google Sheet.
2. Every student submission automatically creates a row with:
   - **Student Lead Data**: Name, Email, Phone/WhatsApp, Target Country.
   - **Listening & Reading Answers**: Columns `L_Q1` through `R_Q3`.
   - **Writing Essay**: Full essay text and word count.
   - **Speaking Audio Links**: Direct Google Drive view links (`Speaking Q1 Link`, `Speaking Q2 Link`).
3. **Evaluating Speaking**:
   - Click the Google Drive audio link in column N or O to listen to the student's recorded voice directly in browser playback.
4. **Entering Band Scores**:
   - Enter your evaluated Band Score in column P (**`Band Score`**).
   - Enter evaluator staff initials in column Q (**`Checked By`**).
5. Send the evaluated Band Score report to the student's email within 48 hours to convert them into a study-abroad client!

---

## 🧪 Demo Mode & Local Testing

If `CONFIG.SCRIPT_URL` is left empty (`""`), the page automatically operates in **Demo Mode**. Submissions will be logged directly to your browser's Developer Tools Console (`F12` → `Console`), allowing complete offline preview testing without affecting live sheets.
