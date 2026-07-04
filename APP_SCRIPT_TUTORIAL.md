# Google Apps Script Setup Tutorial

This tutorial will guide you on how to set up the Google Apps Script backend to receive messages from your portfolio contact form and save them to your Google Sheet.

We've provided a ready-to-use script file: `Gio_Portfolio.js`.

### Step 1: Open Google Apps Script
1. Go to [https://script.google.com/](https://script.google.com/)
2. Click on **New project** in the top left corner.
3. Rename the project to **"Gio Portfolio Contact Form"** by clicking on the "Untitled project" at the top left.

### Step 2: Add the Code
1. In the default `Code.gs` file, delete any existing code.
2. Open the `Gio_Portfolio.js` file in your portfolio codebase.
3. Copy all the contents of `Gio_Portfolio.js` and paste them into your `Code.gs` editor on Google Apps Script. 
4. The script is pre-configured with your Google Sheet ID and Tab Name (`responses`). Just save the file (ctrl+S or cmd+S).

### Step 3: Deploy as a Web App
1. At the top right of the Apps Script dashboard, click on the **Deploy** button.
2. Choose **New deployment**.
3. Under "Select type" (the gear icon ⚙️), ensure **Web app** is selected.
4. Fill in the following details:
   - **Description**: "Initial Deployment" (or whatever you like)
   - **Execute as**: Choose **"Me"** (your email).
   - **Who has access**: Choose **"Anyone"** (This is important, or the contact form will fail when non-logged-in users try to send messages).
5. Click **Deploy**.

### Step 4: Authorize the Script
1. Upon deploying, Google will prompt you to authorize the script (since it accesses your Google Sheets).
2. Click **Authorize access**.
3. Choose your Google account.
4. You might see a warning saying "Google hasn't verified this app." Click on **Advanced** -> **Go to Gio Portfolio Contact Form (unsafe)**.
5. Click **Allow** to grant permissions.

### Step 5: Get your Web App URL
1. Once deployed, a confirmation window will appear giving you your **Web app URL**. It looks like `https://script.google.com/macros/s/.../exec`.
2. Click **Copy** to save this URL.

### Step 6: Connect it to your Portfolio
1. Open the file `src/App.tsx` in your code editor.
2. Search for the `appScriptUrl` variable (around line 226):
   ```typescript
   // TODO: Paste your Google Apps Script Web App URL here
   const appScriptUrl = ""; 
   ```
3. Paste the URL you just copied inside the quotes:
   ```typescript
   const appScriptUrl = "https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec";
   ```
4. Save the file. Your contact form is now fully connected to your Google Sheet!
