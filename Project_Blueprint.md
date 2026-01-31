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
| **Language** | **TypeScript** | Runs natively in the browser for instant math calculations. |
| **Data Source** | **Google Sheets** (CSV) | Easy for the admin to update rates without touching code. |
| **Middleware** | **Vercel Functions** | A serverless proxy to hide the Google Sheet ID from the public. |
| **Deployment** | **Vercel** | Free hosting, easy CI/CD, and native support for serverless functions. |

---

### 3. Architecture & Data Flow

**Strategy:** "Transparent Middleman"

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
* *Rounding:* Round up to nearest 10 (Math.ceil).


* **Variables to Preserve:** `ongkir`, `jasa_tf`, `admin_go`, `rate_kr`, `rate_ch`.

---

### 5. Security & Safety Protocol

1. **Secret Management:**
* The `SHEET_ID` must **never** be hardcoded in the React components. It lives only in `.env` (local) and Vercel Environment Variables (production).


2. **Input Sanitization:**
* The API Proxy must parse values as `numbers` before sending to frontend.


3. **Rate Limiting:**
* Implement "Stale-While-Revalidate" caching in the API. If 1,000 users hit the site, the API only hits Google Sheets once every 60 seconds, serving the cached result to everyone else.



---