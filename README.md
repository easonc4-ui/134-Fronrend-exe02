# Surplus Food React Demo

React + Vite Mobile Demo
A small mobile demo built with React + Vite. The interface is inspired by a campus near-expiry food purchasing flow. In a desktop browser, the page is displayed at a mobile screen size and supports simple product browsing, product details, pickup information, checkout, and order generation.

Features
Browse nearby food mystery boxes on the home page
Search and filter products
Tap the search box to open the search results page
Tap a product to open the detail page
Favorite products
View pickup address and pickup instructions
Use the red QR code button in the bottom navigation to go directly to the pickup QR code page
Open the checkout page
Switch payment methods
Enter a promo code and apply a discount
Complete a purchase and generate a pickup code
View purchased orders on the orders page
Running Locally
Install dependencies first:

npm install
Start the local development server:

npm run dev
After startup, open the address shown in the terminal. It is usually:

http://127.0.0.1:5173/
If port 5173 is already in use, Vite will automatically switch to another port, such as 5174.

Build
npm run build
The build output will be generated in the dist/ directory.

Preview The Build
npm run preview
Demo Flow
Click a product card on the home page.
On the detail page, review the product information and click View pickup & reserve.
On the pickup preview page, click Pickup Instructions to view pickup details.
Click Reserve for ... to enter the checkout page.
Select a payment method.
Optionally enter the promo code SAVE10 and click Apply to apply the discount.
Click Place order to complete the purchase.
After a successful purchase, you will be taken to the Pickup page to view the pickup QR code.
You can also click the red QR code button in the center of the bottom navigation to go directly to the Pickup / QR Code page.
Tech Stack
React
Vite
lucide-react
CSS
