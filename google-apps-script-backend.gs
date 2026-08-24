/**
 * ==============================================================================
 * IELTS MOCK TEST BACKEND - GOOGLE APPS SCRIPT
 * ==============================================================================
 * Web App backend for Vectra Foreign Services IELTS Mock Test System.
 * Captures student registration, test answers, writing essay, and speaking audio.
 * Saves audio recordings to Google Drive and logs submission data to Google Sheets.
 * ==============================================================================
 */

// Optional default notification email address for Vectra evaluation team
var NOTIFY_EMAIL = "vectraforeignservices@gmail.com";

// Google Drive folder name for storing student audio recordings
var FOLDER_NAME = "IELTS Speaking Recordings";

/**
 * HTTP GET Request Handler (Supports GET-based OTP dispatch & CORS-safe verification)
 */
function doGet(e) {
  try {
    var action = e && e.parameter ? e.parameter.action : "";

    if (action === "send_otp") {
      var targetEmail = (e.parameter.email || "").toLowerCase().trim();
      var fullName = e.parameter.fullName || "Candidate";

      if (!targetEmail || targetEmail.indexOf("@") === -1) {
        return createJsonResponse(false, "Please provide a valid email address.");
      }

      var otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      var cache = CacheService.getScriptCache();
      cache.put("OTP_" + targetEmail, otpCode, 600);

      var subject = "🔑 Your IELTS Mock Test Verification Code - Vectra Foreign Services";
      var bodyHtml = "<div style='font-family:Arial, sans-serif; max-width:550px; margin:0 auto; padding:20px; border:1px solid #E5E7EB; border-radius:10px; background-color:#FFFFFF;'>" +
        "<div style='background-color:#1C2B4B; padding:15px; text-align:center; border-radius:8px 8px 0 0; color:#FFFFFF;'>" +
          "<h2 style='margin:0; font-size:20px;'>Vectra Foreign Services</h2>" +
          "<p style='margin:4px 0 0 0; font-size:12px; color:#D97706;'>Free Computer-Delivered IELTS Practice Test</p>" +
        "</div>" +
        "<div style='padding:20px; color:#1F2937; line-height:1.6;'>" +
          "<p>Dear <strong>" + fullName + "</strong>,</p>" +
          "<p>Thank you for registering for the IELTS Mock Test. Please use the following 6-digit verification code to confirm your email address and begin your test:</p>" +
          "<div style='text-align:center; margin:25px 0;'>" +
            "<span style='font-size:32px; font-weight:bold; letter-spacing:6px; color:#1C2B4B; background-color:#F6F5F1; padding:12px 24px; border-radius:8px; border:2px dashed #D97706; inline-block;'>" + otpCode + "</span>" +
          "</div>" +
          "<p style='font-size:13px; color:#6B7280;'>This verification code is valid for <strong>10 minutes</strong>.</p>" +
        "</div>" +
        "<div style='border-top:1px solid #E5E7EB; padding-top:15px; font-size:12px; color:#9CA3AF; text-align:center;'>" +
          "Vectra Foreign Services • Study Abroad & Visa Consultancy • Ahmedabad, Gujarat" +
        "</div>" +
      "</div>";

      try {
        dispatchEmail(targetEmail, subject, bodyHtml);
        return createJsonResponse(true, "Verification code sent successfully to " + targetEmail);
      } catch (err) {
        return createJsonResponse(false, "Failed to send email: " + err.toString());
      }
    }

    if (action === "verify_otp") {
      var targetEmail = (e.parameter.email || "").toLowerCase().trim();
      var submittedOtp = (e.parameter.otp || "").trim();

      var cache = CacheService.getScriptCache();
      var cachedOtp = cache.get("OTP_" + targetEmail);

      if (!cachedOtp) {
        return createJsonResponse(false, "Verification code expired or not requested.");
      }

      if (cachedOtp === submittedOtp) {
        cache.remove("OTP_" + targetEmail);
        return createJsonResponse(true, "Email verified successfully!");
      } else {
        return createJsonResponse(false, "Incorrect verification code. Please check your email.");
      }
    }

    return createJsonResponse(true, "Vectra IELTS Mock Test Backend is active and running!");
  } catch (err) {
    return createJsonResponse(false, err.toString());
  }
}

/**
 * HTTP POST Request Handler
 * Handles JSON payload sent from ielts-mock-test.html
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse(false, "No post data received");
    }

    // Parse JSON payload from request body
    var payload = JSON.parse(e.postData.contents);

    // --- ACTION ROUTER: SEND OTP ---
    if (payload.action === "send_otp") {
      var targetEmail = (payload.email || "").toLowerCase().trim();
      if (!targetEmail || targetEmail.indexOf("@") === -1) {
        return createJsonResponse(false, "Please provide a valid email address.");
      }

      // Generate random 6-digit OTP
      var otpCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Store OTP in CacheService for 10 minutes (600 seconds)
      var cache = CacheService.getScriptCache();
      cache.put("OTP_" + targetEmail, otpCode, 600);

      // Send Verification Email
      try {
        var subject = "🔑 Your IELTS Mock Test Verification Code - Vectra Foreign Services";
        var bodyHtml = "<div style='font-family:Arial, sans-serif; max-width:550px; margin:0 auto; padding:20px; border:1px solid #E5E7EB; border-radius:10px; background-color:#FFFFFF;'>" +
          "<div style='background-color:#1C2B4B; padding:15px; text-align:center; border-radius:8px 8px 0 0; color:#FFFFFF;'>" +
            "<h2 style='margin:0; font-size:20px;'>Vectra Foreign Services</h2>" +
            "<p style='margin:4px 0 0 0; font-size:12px; color:#D97706;'>Free Computer-Delivered IELTS Practice Test</p>" +
          "</div>" +
          "<div style='padding:20px; color:#1F2937; line-height:1.6;'>" +
            "<p>Dear <strong>" + (payload.fullName || "Candidate") + "</strong>,</p>" +
            "<p>Thank you for registering for the IELTS Mock Test. Please use the following 6-digit verification code to confirm your email address and begin your test:</p>" +
            "<div style='text-align:center; margin:25px 0;'>" +
              "<span style='font-size:32px; font-weight:bold; letter-spacing:6px; color:#1C2B4B; background-color:#F6F5F1; padding:12px 24px; border-radius:8px; border:2px dashed #D97706; inline-block;'>" + otpCode + "</span>" +
            "</div>" +
            "<p style='font-size:13px; color:#6B7280;'>This verification code is valid for <strong>10 minutes</strong>. If you did not request this code, please ignore this email.</p>" +
          "</div>" +
          "<div style='border-top:1px solid #E5E7EB; padding-top:15px; font-size:12px; color:#9CA3AF; text-align:center;'>" +
            "Vectra Foreign Services • Study Abroad & Visa Consultancy • Ahmedabad, Gujarat" +
          "</div>" +
        "</div>";

        dispatchEmail(targetEmail, subject, bodyHtml);
        return createJsonResponse(true, "Verification code sent successfully to " + targetEmail);
      } catch (mailErr) {
        Logger.log("Mail Error: " + mailErr.toString());
        return createJsonResponse(false, "Failed to send email: " + mailErr.toString());
      }
    }

    // --- ACTION ROUTER: VERIFY OTP ---
    if (payload.action === "verify_otp") {
      var targetEmail = (payload.email || "").toLowerCase().trim();
      var submittedOtp = (payload.otp || "").trim();

      var cache = CacheService.getScriptCache();
      var cachedOtp = cache.get("OTP_" + targetEmail);

      if (!cachedOtp) {
        return createJsonResponse(false, "Verification code has expired or was not requested. Please request a new code.");
      }

      if (cachedOtp === submittedOtp) {
        // Clear cached code once verified
        cache.remove("OTP_" + targetEmail);
        return createJsonResponse(true, "Email verified successfully!");
      } else {
        return createJsonResponse(false, "Incorrect verification code. Please check your email and try again.");
      }
    }

    // 1. Get or Create Spreadsheet & "Submissions" Sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Submissions");

    if (!sheet) {
      sheet = ss.insertSheet("Submissions");
      var headers = [
        "Timestamp",
        "Full Name",
        "Email",
        "Phone / WhatsApp",
        "Target Country",
        "Listening Q1",
        "Listening Q2",
        "Listening Q3",
        "Reading Q1",
        "Reading Q2",
        "Reading Q3",
        "Writing Essay",
        "Writing Word Count",
        "Speaking Q1 Link",
        "Speaking Q2 Link",
        "Band Score",
        "Checked By"
      ];
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);

      // Format header row style
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#1C2B4B");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
    }

    // 2. Locate or Create Google Drive Folder for Audio Recordings
    var folder = getOrCreateDriveFolder(FOLDER_NAME);

    // 3. Process & Save Speaking Audio Recordings
    var studentCleanName = sanitizeFileName(payload.fullName || "Candidate");
    var dateStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd_HHmm");

    var speakingQ1Url = saveAudioFile(
      folder,
      payload.speaking ? payload.speaking.q1 : null,
      studentCleanName + "_" + dateStr + "_Q1"
    );

    var speakingQ2Url = saveAudioFile(
      folder,
      payload.speaking ? payload.speaking.q2 : null,
      studentCleanName + "_" + dateStr + "_Q2"
    );

    // 4. Construct Row Data Array
    var essayText = payload.writing ? (payload.writing.essay || "") : "";
    var essayWords = payload.writing ? (payload.writing.wordCount || 0) : 0;

    var rowData = [
      payload.timestamp || new Date().toISOString(),
      payload.fullName || "",
      payload.email || "",
      payload.phone || "",
      payload.targetCountry || "",

      payload.listening ? payload.listening.q1 : "",
      payload.listening ? payload.listening.q2 : "",
      payload.listening ? payload.listening.q3 : "",

      payload.reading ? payload.reading.q1 : "",
      payload.reading ? payload.reading.q2 : "",
      payload.reading ? payload.reading.q3 : "",

      essayText,
      essayWords,

      speakingQ1Url || "Not Recorded",
      speakingQ2Url || "Not Recorded",

      "", // Band Score (To be filled manually by Vectra team)
      ""  // Checked By (To be filled manually by Vectra team)
    ];

    // Append to Sheet
    sheet.appendRow(rowData);

    // Auto-Format Google Sheet for clean essay readability
    try {
      var lastRow = sheet.getLastRow();
      sheet.setColumnWidth(1, 140);  // Timestamp
      sheet.setColumnWidth(2, 160);  // Full Name
      sheet.setColumnWidth(3, 200);  // Email
      sheet.setColumnWidth(4, 130);  // Phone
      sheet.setColumnWidth(5, 120);  // Target Country
      sheet.setColumnWidth(12, 450); // Writing Essay (Wide readable column)
      sheet.setColumnWidth(13, 110); // Word Count
      sheet.setColumnWidth(14, 180); // Speaking Q1
      sheet.setColumnWidth(15, 180); // Speaking Q2
      sheet.setColumnWidth(16, 100); // Band Score
      sheet.setColumnWidth(17, 120); // Checked By

      // Enable text-wrapping on the entire Writing Essay column
      sheet.getRange(1, 12, lastRow, 1).setWrap(true);
      // Set top vertical alignment across all rows
      sheet.getRange(1, 1, lastRow, rowData.length).setVerticalAlignment("top");
    } catch (fmtErr) {
      Logger.log("Format error: " + fmtErr.toString());
    }

    // 5. Send Notification Email to Evaluation Desk with Full Formatted Essay
    var recipientEmail = payload.notifyEmail || NOTIFY_EMAIL;
    if (recipientEmail && recipientEmail.indexOf("@") !== -1) {
      sendNotificationEmail(recipientEmail, payload, speakingQ1Url, speakingQ2Url);
    }

    return createJsonResponse(true, "Submission successfully saved");

  } catch (err) {
    Logger.log("doPost Error: " + err.toString());
    return createJsonResponse(false, err.toString());
  }
}

/**
 * Helper: Find or Create Google Drive Folder
 */
function getOrCreateDriveFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    var newFolder = DriveApp.createFolder(folderName);
    newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return newFolder;
  }
}

/**
 * Helper: Decode Base64 and Save Audio File to Google Drive
 */
function saveAudioFile(folder, speakingObj, fileNamePrefix) {
  if (!speakingObj || !speakingObj.base64 || speakingObj.base64.trim() === "") {
    return "";
  }

  try {
    var rawBase64 = speakingObj.base64;
    var mimeType = speakingObj.mimeType || "audio/webm";

    // Strip Data URL prefix if present (e.g. data:audio/webm;base64,)
    if (rawBase64.indexOf(",") !== -1) {
      rawBase64 = rawBase64.split(",")[1];
    }

    // Determine File Extension
    var ext = ".webm";
    if (mimeType.indexOf("mp4") !== -1 || mimeType.indexOf("m4a") !== -1 || mimeType.indexOf("aac") !== -1) {
      ext = ".m4a";
    } else if (mimeType.indexOf("wav") !== -1) {
      ext = ".wav";
    } else if (mimeType.indexOf("ogg") !== -1) {
      ext = ".ogg";
    }

    var fileName = fileNamePrefix + ext;
    var decoded = Utilities.base64Decode(rawBase64);
    var blob = Utilities.newBlob(decoded, mimeType, fileName);

    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getUrl();

  } catch (err) {
    Logger.log("Error saving audio file (" + fileNamePrefix + "): " + err.toString());
    return "Error saving audio";
  }
}

/**
 * Helper: Sanitize string for clean filenames
 */
function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9_\-]/g, "_").toLowerCase();
}

/**
 * Helper: Dispatch Email Alert with Full Formatted Essay & Audio Links
 */
function sendNotificationEmail(recipient, payload, audioUrl1, audioUrl2) {
  try {
    var candidateName = payload.fullName || "Candidate";
    var email = payload.email || "N/A";
    var phone = payload.phone || "N/A";
    var country = payload.targetCountry || "N/A";

    var essayText = payload.writing ? (payload.writing.essay || "No essay submitted.") : "No essay submitted.";
    var essayWords = payload.writing ? (payload.writing.wordCount || 0) : 0;
    
    // Convert newlines to HTML paragraphs for clean essay reading
    var formattedEssay = essayText
      .split(/\n+/)
      .map(function(p) { return "<p style='margin: 0 0 1em 0; line-height: 1.7; color: #1F2937; font-size: 15px;'>" + p.trim() + "</p>"; })
      .join("");

    var subject = "🎓 New IELTS Test Submission: " + candidateName + " (" + country + ")";

    var bodyHtml = "<div style='font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; background: #F9FAFB; padding: 20px; border-radius: 12px; border: 1px solid #E5E7EB;'>" +
      // Header
      "<div style='background: #1C2B4B; color: #FFFFFF; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;'>" +
        "<h2 style='margin: 0 0 4px 0; font-size: 20px; color: #FFFFFF;'>🎓 IELTS Mock Test Evaluation Dossier</h2>" +
        "<p style='margin: 0; font-size: 13px; color: #F59E0B;'>Vectra Foreign Services • Student Evaluation Desk</p>" +
      "</div>" +

      // Candidate Profile Card
      "<div style='background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px;'>" +
        "<h3 style='margin: 0 0 12px 0; font-size: 15px; color: #1C2B4B; border-bottom: 2px solid #F3F4F6; padding-bottom: 6px;'>👤 Candidate Profile</h3>" +
        "<table style='width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;'>" +
          "<tr><td style='padding: 4px 0; width: 35%; font-weight: bold;'>Name:</td><td>" + candidateName + "</td></tr>" +
          "<tr><td style='padding: 4px 0; font-weight: bold;'>Email:</td><td><a href='mailto:" + email + "' style='color: #2563EB;'>" + email + "</a></td></tr>" +
          "<tr><td style='padding: 4px 0; font-weight: bold;'>WhatsApp / Phone:</td><td><a href='https://wa.me/" + phone.replace(/[^0-9]/g, "") + "' style='color: #059669; font-weight: bold;'>" + phone + "</a></td></tr>" +
          "<tr><td style='padding: 4px 0; font-weight: bold;'>Target Country:</td><td><strong>" + country + "</strong></td></tr>" +
        "</table>" +
      "</div>" +

      // Writing Module Card (FULL FORMATTED ESSAY)
      "<div style='background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #D97706;'>" +
        "<div style='display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #F3F4F6; padding-bottom: 8px;'>" +
          "<h3 style='margin: 0; font-size: 16px; color: #1C2B4B;'>✍️ Academic Writing (Task 2) Essay</h3>" +
          "<span style='background: " + (essayWords >= 150 ? "#D1FAE5" : "#FEE2E2") + "; color: " + (essayWords >= 150 ? "#065F46" : "#991B1B") + "; font-weight: bold; padding: 4px 10px; border-radius: 12px; font-size: 12px;'>" +
            essayWords + " Words " + (essayWords >= 150 ? "✓ Met" : "⚠️ Below 150") +
          "</span>" +
        "</div>" +
        "<div style='background: #F8FAFC; padding: 10px 14px; border-radius: 6px; font-size: 13px; color: #4B5563; margin-bottom: 14px; font-style: italic; border-left: 3px solid #9CA3AF;'>" +
          "Prompt: Some people believe that studying abroad is essential for achieving long-term career success, while others argue that higher education in one's home country is equally beneficial. Discuss both views and give your opinion." +
        "</div>" +
        "<div style='background: #FFFBEB; border: 1px solid #FEF3C7; padding: 18px 22px; border-radius: 8px; font-family: Georgia, serif;'>" +
          formattedEssay +
        "</div>" +
      "</div>" +

      // Speaking Module Audio Links
      "<div style='background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px; border-left: 4px solid #2563EB;'>" +
        "<h3 style='margin: 0 0 12px 0; font-size: 15px; color: #1C2B4B;'>🎙️ Speaking Voice Recordings</h3>" +
        "<div style='margin-bottom: 8px; font-size: 14px;'>" +
          "<strong>Part 1 Recording:</strong> " + (audioUrl1 ? "<a href='" + audioUrl1 + "' target='_blank' style='background: #2563EB; color: #FFFFFF; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 13px; margin-left: 8px;'>▶ Listen Audio Q1</a>" : "<span style='color:#9CA3AF;'>Not Recorded</span>") +
        "</div>" +
        "<div style='font-size: 14px;'>" +
          "<strong>Part 2 Recording:</strong> " + (audioUrl2 ? "<a href='" + audioUrl2 + "' target='_blank' style='background: #2563EB; color: #FFFFFF; padding: 4px 12px; border-radius: 4px; text-decoration: none; font-size: 13px; margin-left: 8px;'>▶ Listen Audio Q2</a>" : "<span style='color:#9CA3AF;'>Not Recorded</span>") +
        "</div>" +
      "</div>" +

      // Footer
      "<div style='text-align: center; font-size: 12px; color: #9CA3AF; margin-top: 20px;'>" +
        "Open your Google Sheet 'Submissions' tab to record the candidate's final Band Score and assign an counselor." +
      "</div>" +
    "</div>";

    dispatchEmail(recipient, subject, bodyHtml);
  } catch (e) {
    Logger.log("Email dispatch failed: " + e.toString());
  }
}

/**
 * Helper: Send email using GmailApp with fallback to MailApp
 */
function dispatchEmail(toEmail, subject, bodyHtml) {
  try {
    GmailApp.sendEmail(toEmail, subject, "Your IELTS Mock Test verification code", {
      htmlBody: bodyHtml,
      name: "Vectra Foreign Services"
    });
    return true;
  } catch (gmailErr) {
    Logger.log("GmailApp failed, attempting MailApp: " + gmailErr.toString());
    MailApp.sendEmail({
      to: toEmail,
      subject: subject,
      htmlBody: bodyHtml
    });
    return true;
  }
}

/**
 * Helper: Standard JSON Response Format
 */
function createJsonResponse(isOk, message) {
  var output = {
    ok: isOk,
    message: message,
    timestamp: new Date().toISOString()
  };
  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}
