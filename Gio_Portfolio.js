var SHEET_ID = '1ZQX_YOlEs76WWbwHoOCH-9QIIsGtPdKcl_FNr64rRYQ';
var SHEET_NAME = 'messages';

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Support either JSON payload or standard form data
    var data = {};
    if (e.postData && e.postData.contents) {
      if (e.postData.type === "application/json") {
        data = JSON.parse(e.postData.contents);
      } else {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }
    
    // A1 - timestamp, A2 - name, A3 - email, A4 - messages
    var timestamp = new Date();
    var name = data.name || '';
    var email = data.email || '';
    var message = data.message || '';
    
    // Append the row to the next available row on the sheet
    // Columns: A is timestamp, B is name, C is email, D is messages
    sheet.appendRow([timestamp, name, email, message]);
    
    // Setup header row if it is empty (checking if the script just wrote to row 1)
    if (sheet.getLastRow() === 1) {
      // In case we want to set headers on the first row
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, 4).setValues([["Timestamp", "Name", "Email", "Messages"]]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }
    
    // Send email notification
    try {
      MailApp.sendEmail({
        to: "gio.sabucido@gmail.com",
        subject: "New Portfolio Message from " + name,
        htmlBody: "<b>Name:</b> " + name + "<br/>" +
                  "<b>Email:</b> " + email + "<br/>" +
                  "<b>Message:</b><br/>" + message,
        name: "gio.sabucido@gmail.com"
      });
    } catch(mailErr) {
      // Ignore mail errors so the form submission still succeeds
    }
    
    var response = {
      "status": "success",
      "message": "Data successfully recorded."
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    var errResponse = {
      "status": "error",
      "message": err.toString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fallback for GET requests
function doGet(e) {
  return ContentService.createTextOutput("This Web App only accepts POST requests.");
}
