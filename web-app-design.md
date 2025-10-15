# Bid2Hand Web Application Design

## 1. Vision & Goals
Bid2Hand is a cross-border purchasing platform that allows Thai customers to buy goods from Japanese marketplaces. The new web application must deliver a smooth buying experience, provide transparency on parcel handling, and incentivise loyalty through membership perks and a gamified reward system. Administrators require robust tools to manage parcels, orders, announcements, and limited-quantity rewards.

## 2. Target Personas
- **End Customer (Member):** Thai shoppers who order products from Japan, track parcel status, access membership benefits, spin a lucky wheel, and redeem reward items.
- **Guest User:** Prospective customers evaluating the service; they can explore marketing content but require registration to access parcel data or rewards.
- **Operations Admin:** Staff responsible for parcel intake, status updates, inventory of rewards, and publishing announcements.
- **Marketing Admin:** Staff managing loyalty program rules, reward catalogue, promotions, and daily announcements.

## 3. Information Architecture Overview
```
Public Landing
└─ Login / Register
   ├─ Forgot Password
   └─ Verification Flow
Member Portal (requires login)
├─ Dashboard
│  ├─ Parcel Snapshot
│  ├─ Recent Orders
│  └─ Membership Progress
├─ Orders & Parcels
│  ├─ Order History
│  ├─ Parcel Tracking (Japanese warehouse → Thailand)
│  └─ Shipment Details
├─ Member Benefits
│  ├─ Benefit Overview
│  ├─ Lucky Wheel (gamified tab)
│  └─ Benefit History
├─ Rewards & Points
│  ├─ Points Balance
│  ├─ Reward Catalogue (limited items)
│  └─ Redemption History
└─ Account Settings
   ├─ Profile & Addresses
   ├─ Security (password, 2FA)
   └─ Notification Preferences
Admin Portal (separate subdomain or /admin)
├─ Dashboard (KPIs, alerts)
├─ Parcel Management
│  ├─ Intake & status updates
│  ├─ Bulk import / scan
│  └─ Customer notifications
├─ Orders & Customer Service
├─ Rewards Inventory Management
│  ├─ Item stock & allocation per member
│  └─ Redemption approval workflow
├─ Membership & Promotions
└─ Announcements Management
```

## 4. Frontend Application Design
The frontend is a responsive single-page application built with React + Vite, TypeScript, and Tailwind CSS.

### 4.1 Layout
- **Global Layout:** Top navigation bar with logo, user menu, and notifications; collapsible side navigation for authenticated sections; persistent tab component for Benefit/Lucky Wheel switching.
- **Theming:** Light/dark theme support with pastel primary palette inspired by Bid2Hand branding. Use Tailwind’s design tokens for consistency.
- **Responsiveness:** Breakpoints at 320, 768, 1024, and 1280 px. Mobile view uses a bottom navigation drawer.

### 4.2 Key Screens
- **Login Page:** Left panel marketing content, right panel authentication form. Options for email/password, social login (future), and button to register. Include password reset link.
- **Dashboard:** Modular cards showing parcel arrivals, pending shipments, points balance, and quick actions ("Track Parcel", "Redeem Rewards"). Display announcement banner carousel at top.
- **Orders & Parcels:** Tabbed view separating "Orders" and "Parcels". Each order card summarises item, status, and CTAs. Parcel timeline shows statuses (Ordered → Arrived JP Warehouse → In Transit → Delivered TH). Search and filter by status/date.
- **Member Benefits:** Sub-tabs: (1) "Benefits" listing available coupons/discounts. (2) "Lucky Wheel" interactive component using canvas/SVG; limited spins per day; results appended to activity log. (3) "History" timeline of claimed benefits.
- **Rewards & Points:** Points summary header with progress bar towards next tier. Grid of reward items with stock badges, limited quantity indicator, and CTA to redeem (disabled when stock = 0). Item detail modal shows description, points cost, quantity left, and confirm redemption.
- **Announcements:** Always visible within dashboard and dedicated page with filter by date/category. Allows quick catch-up on daily updates.
- **Account Settings:** Forms for personal info, addresses, password change, two-factor enabling, and preference toggles.

### 4.3 Component Library
- Buttons (primary, secondary, ghost)
- Tabs & segmented controls
- Data table for admin views
- Status chips (parcel status, order state)
- Progress bar & radial gauges for points
- Notification banner & toast system
- Modal & drawer components

### 4.4 State Management & Data Fetching
- React Query for server-state management and caching of parcels, orders, rewards.
- Zustand or Redux Toolkit for global UI state (auth token, layout controls, membership tier info).
- Formik + Yup for form management and validation.

### 4.5 Accessibility & Internationalisation
- WCAG 2.1 AA compliance: semantic HTML, aria labels, focus management, sufficient contrast.
- Support Thai and English locales using i18next; fallback to Thai for logged-in users, English for guest marketing page.

## 5. Membership & Gamification System
- **Membership Tiers:** Bronze, Silver, Gold, Platinum determined by annual spending or cumulative points. Each tier unlocks benefits (discounts, additional spins, shipping vouchers).
- **Point Accrual:** Earn points per purchase value; bonus for timely parcel pickup. Points expire after 24 months of inactivity.
- **Lucky Wheel:** Daily spin count determined by tier (Bronze 1, Silver 2, etc.). Prizes include points, discount coupons, or reward item vouchers. Secure randomisation handled server-side to prevent tampering; frontend displays animation and results.
- **Reward Catalogue:** Items stored with `sku`, `name`, `description`, `pointsCost`, `quantityAvailable`, `perMemberLimit`, `validFrom`, `validTo`. Redemption decrements stock and logs history for auditing.

## 6. Backend (Admin) Application Design
Built with Node.js (NestJS) + TypeScript. Modular architecture with REST + GraphQL endpoints consumed by both frontend portals.

### 6.1 Core Modules
- **Auth Module:** JWT-based auth with refresh tokens. RBAC roles: `member`, `admin`, `marketing`, `operations`. Support OAuth for future B2B integrations.
- **User & Membership Module:** CRUD for member profiles, tier calculation jobs, point ledger, and benefit entitlements.
- **Order & Parcel Module:** Integrates with Japanese warehouse API for parcel intake. Supports manual overrides, status updates, and push notifications to members.
- **Rewards Module:** Manage reward items, stock levels, redemption requests, approvals, and audit logs.
- **Announcement Module:** CRUD for daily announcements with scheduling (start/end publish date). Supports attachments and push notifications.
- **Lucky Wheel Module:** Prize configuration, probability weights, spin logs, fraud detection rules (e.g., max spins/day, suspicious IPs).

### 6.2 Admin UI Features
- Dashboard with KPI widgets (new parcels today, pending redemptions, announcements due).
- Parcel management table with scanning input, bulk status updates, and filters.
- Reward inventory page showing stock per SKU, low-stock alerts, and ability to restock or disable items.
- Announcement composer with rich-text editor, scheduling controls, preview for member view.
- Audit trail page showing user actions for compliance.

### 6.3 Integrations & Services
- Integration with shipping APIs for real-time tracking updates.
- Optional integration with LINE Notify or email/SMS for member alerts.
- Scheduled jobs via NestJS Cron for point expiry, tier recalculation, and daily summary emails.

## 7. Data Model Overview
```
User
- id (UUID)
- email
- passwordHash
- role
- profile { name, phone, addresses }
- membershipTier
- pointsBalance
- tierExpiresAt

Order
- id
- userId
- marketplace
- orderNumber
- items[] { sku, name, qty, price }
- status
- createdAt

Parcel
- id
- orderId
- trackingNumber
- currentStatus
- statusTimeline[] { status, timestamp, location }
- arrivedAtJpWarehouseAt
- departedFromJpAt
- arrivedInThailandAt

RewardItem
- id
- sku
- name
- description
- pointsCost
- quantityAvailable
- perMemberLimit
- imageUrl
- isActive

Redemption
- id
- userId
- rewardItemId
- pointsSpent
- status (pending, approved, fulfilled)
- createdAt

Announcement
- id
- title
- body
- category
- publishFrom
- publishUntil
- createdBy

LuckyWheelSpin
- id
- userId
- resultType (points, coupon, reward)
- resultValue
- createdAt
- metadata (clientIP, deviceId)
```

## 8. API Endpoints (Representative)
- `POST /auth/login`, `POST /auth/register`, `POST /auth/refresh`
- `GET /members/me`, `PATCH /members/me`, `GET /members/me/points`
- `GET /orders`, `GET /orders/:id`
- `GET /parcels`, `GET /parcels/:id`, `POST /parcels/:id/status`
- `GET /benefits`, `POST /lucky-wheel/spin`
- `GET /rewards`, `POST /rewards/:id/redeem`, `POST /rewards/:id/fulfill`
- `GET /announcements`, `POST /announcements`
- Admin-specific endpoints for CRUD operations on parcels, rewards, announcements, and membership settings.

## 9. Security & Compliance
- Enforce HTTPS, HSTS, secure cookies, CSRF protection on forms.
- Validate inputs server-side, sanitize outputs to prevent XSS.
- Use rate limiting on auth and spin endpoints.
- Store audit logs and maintain GDPR-compliant data deletion process.

## 10. Deployment & DevOps
- **Frontend:** Deploy via Vercel or Netlify; use CI pipeline (GitHub Actions) for lint/test/build before deploy.
- **Backend:** Deploy to AWS (ECS/Fargate) or DigitalOcean Apps. Use managed PostgreSQL, Redis for caching/session, and S3 for asset storage.
- **Monitoring:** Integrate with CloudWatch/New Relic for backend metrics, Sentry for error tracking, Log aggregation with ELK stack.
- **CDN:** CloudFront/Cloudflare for asset caching and DDoS mitigation.

## 11. Roadmap & Phasing
1. **Phase 1:** Core member portal (login, dashboard, orders, parcels), basic admin for parcel updates and announcements.
2. **Phase 2:** Membership tiers, points ledger, reward catalogue with redemption flow.
3. **Phase 3:** Lucky wheel gamification, advanced analytics, marketing automation.
4. **Phase 4:** Mobile app integration, extended partner APIs.

## 12. Success Metrics
- Increase member retention by 20% within 6 months.
- 90% of parcels updated within 1 hour of status change.
- 70% of active members engaging with benefits or rewards monthly.
- Reduce customer support inquiries by 30% through self-service tracking.

