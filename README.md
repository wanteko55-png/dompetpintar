Dompet Pintar - Final v1
Structure:
- frontend_github: files to upload to GitHub Pages
- backend_gsheet: Apps Script files to paste into Google Apps Script project
- DB: create Google Sheet with name DompetPintar_DB and sheets Users, Transactions, Budgets, Installments, Savings, Settings

Important:
- Deploy Apps Script Web App and set Script Properties -> DB_SHEET_ID to your spreadsheet ID
- Replace <REPLACE_WITH_GAS_WEBAPP_URL> in frontend JS/HTML with deployed WebApp URL
- Zip contains working minimal prototype. You can extend features from here.
