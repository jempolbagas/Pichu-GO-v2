# 📄 Project Blueprint: PICHU GO Calculator 2.0

### 1. Vision & Purpose

* **Goal:** Transition the calculator from a server-side Python script (Streamlit) to a high-performance, client-side web application.
* **Primary Driver:** Unlocking total design freedom (pixel-perfect UI) and instant reactivity without server round-trips.
* **End-User Experience:** A beautiful, "app-like" experience on mobile browsers that provides instant price estimations for Group Order customers.

---

### 2. Technology Stack

| Component | Choice | Reason |
| --- | --- | --- |
| **Frontend Framework** | **React** (via Vite) | Component-based architecture for reusable UI elements (Cards, Inputs). |
| **Styling Engine** | **Tailwind CSS v4** | **(Updated)** High-performance styling engine with zero-configuration setup using the Vite plugin. |
| **Language** | **JavaScript/TypeScript** | Runs natively in the browser for instant math calculations. |
| **Data Source** | **Google Sheets** (CSV) | Easy for the admin to update rates without touching code. |
| **Middleware** | **Vercel Functions** | A serverless proxy to hide the Google Sheet ID from the public. |
| **Deployment** | **Vercel** | Free hosting, easy CI/CD, and native support for serverless functions. |

---

### 3. Architecture & Data Flow

**Strategy:** "Option A - Transparent Middleman"

1. **The Database (Google Sheet):**
* A **new, dedicated spreadsheet** containing *only* configuration data (Rates, Fees).
* **Format:** Two columns: `key`, `value`.
* **Security:** Locked cells, "Viewer" permissions only for the Service Account (if used) or public link via Proxy.


2. **The Middleman (API Proxy):**
* **Endpoint:** `/api/rates`
* **Action:** Fetches the CSV data from Google using the secret `SHEET_ID` stored in Environment Variables.
* **Response:** Returns a clean JSON object to the frontend (e.g., `{ rate_kr: 11.75, admin_go: 6000 }`).


3. **The Client (Browser):**
* **On Load:** Calls `/api/rates` once.
* **Interaction:** User types price/shipping -> Browser calculates math instantly using the fetched rates.
* **Fallback:** If the API fails, use hardcoded values stored in the JS code.



---

### 4. Implementation Details

#### A. Logic Porting (Python  JS)

The calculation logic must remain domain-specific. Do not change variable names.

* **Korea Logic:**
* `itemPriceIdr = (inputPrice * 10000) * rateKr`
* `sharedFeesIdr = (ongkir * rateKr + jasaTfKr) / people`
* *Rounding:* Round up to nearest 10 (Math.ceil).


* **China Logic:**
* `itemPriceIdr = inputPrice * rateCh`
* `sharedFeesIdr = (ongkir * rateCh + jasaTfCh) / people`


* **Variables to Preserve:** `ongkir`, `jasa_tf`, `admin_go`, `rate_kr`, `rate_ch`.

#### B. UI/UX Specifications

* **Design Language:** "Aurora Glass" (Gradient backgrounds + translucent cards).
* **Responsive Design:** **Mobile-First**. Most users will access this via Twitter/X links on their phones.
* **Configuration:** Use CSS variables in `@theme` block inside `index.css` instead of `tailwind.config.js`.
* **Components:**
* **Tabs:** Floating "Pill" switcher for Korea/China.
* **Inputs:** Large, touch-friendly areas. No tiny steppers.
* **Result Card:** Large typography for the Total, smaller text for the breakdown.


* **Disclaimer:** Must include: *"Estimasi harga (belum termasuk pajak/ems). Harga final saat tagihan."*

---

### 5. Security & Safety Protocol

1. **Secret Management:**
* The `SHEET_ID` must **never** be hardcoded in the React components. It lives only in `.env` (local) and Vercel Environment Variables (production).


2. **Input Sanitization:**
* The API Proxy must parse values as `numbers` before sending to frontend.


3. **Rate Limiting:**
* Implement "Stale-While-Revalidate" caching in the API. If 1,000 users hit the site, the API only hits Google Sheets once every 60 seconds, serving the cached result to everyone else.



---

### 6. Development Roadmap (Step-by-Step)

#### Phase 1: Foundation (Tailwind v4 Setup)

* [x] Initialize Project: `npm create vite@latest pichu-go-web -- --template react`
* [x] Install Tailwind v4: `npm install tailwindcss @tailwindcss/vite`
* [x] Configure Vite: Add `tailwindcss()` to plugins in `vite.config.js`.
* [x] Set up CSS: Add `@import "tailwindcss";` and `@theme` variables (Primary Color, Aurora Animation) in `src/index.css`.
* [x] Create the `pichu-config` Google Sheet and add dummy data.

#### Phase 2: The Middleman

* [ ] Create `/api/rates.js` (Vercel function).
* [ ] Write the logic to fetch Google Sheet CSV and convert to JSON.
* [ ] Test the API locally using `vercel dev`.

#### Phase 3: The Core Logic

* [ ] Create `utils/calculator.js`.
* [ ] Port the Python functions to JavaScript.
* [ ] Write a simple test to ensure `1000 Won` equals the expected Rupiah.

#### Phase 4: UI Construction

* [ ] Build `Layout.jsx` (The background wrapper using v4 `@theme` variables).
* [ ] Build `CalculatorInput.jsx` (Styled input fields).
* [ ] Build `ResultCard.jsx` (The glassmorphism card).
* [ ] Wire up state (React `useState`) to connect Inputs -> Logic -> Result.

#### Phase 5: Integration & Polish

* [ ] Connect the React app to fetch data from `/api/rates` on load.
* [ ] Add Loading states (skeletons/spinners) while fetching rates.
* [ ] Add the "Estimated Only" disclaimer.

#### Phase 6: Deployment

* [ ] Push to GitHub.
* [ ] Connect Repository to Vercel.
* [ ] Add `SHEET_ID` to Vercel Environment Variables.
* [ ] Verify live functionality.

---

### 7. Developer Notes (for the builder)

* **Tailwind v4 Specific:** No `tailwind.config.js`. Define all custom colors, fonts, and animations directly in `index.css` under the `@theme` block.
* **Don't over-engineer:** We don't need Redux or heavy state management. React's built-in `useState` and `useEffect` are enough.
* **Browser Compatibility:** Ensure the "Glassmorphism" (backdrop-filter) works on Safari (iOS), as that is the primary device for K-Pop GO buyers.