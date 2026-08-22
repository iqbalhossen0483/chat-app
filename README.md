# 🌪️ VortexChat

VortexChat is a modern, real-time, production-ready instant messaging application featuring seamless **1-to-1 direct messaging** and **collaborative group chats**.

Engineered with a high-performance frontend architecture, VortexChat uses **Next.js**, **Tailwind CSS v4**, **Redux Toolkit & RTK Query**, **NextAuth.js**, and **Socket.io** for an ultra-responsive, reactive, and visually stunning real-time messaging experience.

---

## 🚀 Key Features

### 👤 Authentication & Onboarding

- **Passwordless Authentication:** Quick sign-in using only a phone number and full name.
- **Session Management:** Secure JWT token storage and endpoint authorization handled via **NextAuth.js**.
- **Protected Routes:** Automatic middleware routing to shield conversational dashboards from unauthorized users.

### 💬 Real-Time Messaging & Updates

- **Instant Exchange:** Near-zero latency messaging powered by a stable **Socket.io (WebSockets)** connection.
- **Auto Cache Refresh:** Dynamic WebSockets push and intercept events (`message:new`, `conversation:updated`) to immediately dispatch RTK Query updates without manual reloading.
- **Rich Layouts:** Interactive single-chat and group-chat message bubbles with proper alignment, sender details, status indicators, and timestamp display.

### 👥 Interactive Group Management

- **Flexible Creation:** Create group conversations with custom names and selectable participant pools.
- **Live Administration:** In-app tools for group members:
  - **Rename Group:** Instantly update group names with immediate real-time sync.
  - **Manage Members:** Search and invite additional participants to active group conversations.
  - **See Members:** View a compiled, searchable directory list of all current members.
  - **Leave Group:** Safely step out of group conversations with updated participant rosters.

### 🎨 State-of-the-Art UI/UX

- **Custom Design System:** Built with Tailwind CSS v4 using pure utility styling (no heavy, generic component libraries) for highly interactive, lightweight elements.
- **Dual Theme Support:** Fully adaptive **Light and Dark Modes** backed by Redux theme state toggles and persistent custom providers.
- **Optimized Mobile UX:** Fully responsive layouts. Uses an intuitive mobile-first sidebar system that collapses when viewing an active conversation.
- **Polished Micro-Interactions:** Custom popovers, multi-select components, smooth modals, loaders, skeletal states, and error alerts.

---

## 🛠️ Technology Stack

| Technology            | Purpose              | Description                                                                                               |
| --------------------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Next.js (v16.3.2)** | Framework            | Next-generation React framework with modern App Router directories, layout nesting, and SSR capabilities. |
| **TypeScript**        | Language             | Type safety across API responses, socket events, and UI components.                                       |
| **Tailwind CSS (v4)** | Styling              | Advanced utility-first styles, css-variables themes, and transition states.                               |
| **Redux Toolkit**     | Client State         | Handles application-wide global states such as theme preferences and UI view status.                      |
| **RTK Query**         | Server State & Cache | Declarative data fetching, token injection, tag-based cache invalidation, and query updates.              |
| **Socket.io Client**  | Real-Time Sync       | Multiplexed WebSocket protocol connection for instant event-driven client syncing.                        |
| **NextAuth.js (v4)**  | Auth Provider        | Client/server session synchronization, custom credential authorization, and JWT processing.               |
| **React Hook Form**   | Form Management      | High-performance, declarative form handler with validation bindings.                                      |
| **Zod**               | Validation           | Strongly typed schema definition and verification library.                                                |
| **Lucide React**      | Iconography          | Lightweight, highly-customizable SVG icons.                                                               |
| **React Toastify**    | Notifications        | Immediate, non-intrusive feedback toasts for API/Socket feedback.                                         |

---

## 📂 Project Directory Structure

```text
chat_app/
├── app/                              # Next.js App Router Structure
│   ├── (protected)/                  # Route Group requiring active sessions
│   │   ├── chat/                     # Main chat view and socket hooks
│   │   └── layout.tsx                # Auth gate and session verification
│   ├── api/
│   │   └── auth/                     # NextAuth initialization routes
│   ├── auth/                         # User sign-in interface
│   ├── globals.css                   # Tailwind v4 configuration and keyframes
│   ├── layout.tsx                    # Shared high-level HTML head, fonts, and meta
│   └── page.tsx                      # Beautiful landing page
├── components/                       # Modular UI Components
│   ├── auth/                         # Form & authorization UI
│   ├── chat/                         # Chat layout, sidebars, group settings, and modals
│   ├── landing/                      # Landing page design layout components
│   ├── providers/                    # NextAuth, Redux, and Theme wrapper context
│   └── ui/                           # Atoms & Custom elements (Buttons, Inputs, Modals, etc.)
├── hooks/                            # Custom React Hooks
│   ├── useDebouncer.ts               # State debouncer for user search
│   ├── useOutsideClick.ts            # Detect and dismiss popovers/dropdowns
│   ├── useSocket.ts                  # Socket.io connection and real-time cache dispatcher
│   └── useTheme.ts                   # Hook for dark/light state handling
├── services/                         # Global API Handlers & Middleware
│   ├── api/                          # Prepared base query with header session tokens
│   └── error/                        # Structured RTK Query toast error handlers
├── store/                            # Global Redux Architecture
│   ├── api/                          # RTK Query cache slices for backend routes
│   ├── slice/                        # Standard client state slices (e.g. Theme)
│   └── store.ts                      # Configured store combined with middlewares
├── types/                            # TypeScript Declarations
│   └── type.d.ts                     # Database Schema interfaces (User, Message, Conversation)
├── public/                           # Static assets, logos, and illustration vectors
├── .env.example                      # Production template for environment configuration
├── package.json                      # System dependencies and build tasks
└── tsconfig.json                     # Comprehensive TypeScript compiler config
```

---

## ⚙️ Environment Variables Setup

Before running the application, you must provide your environmental settings. Create a `.env` file in the root directory by duplicating the `.env.example`:

```bash
cp .env.example .env
```

Ensure the following keys are populated:

```env
# URL pointing to the REST API server endpoints
NEXT_PUBLIC_API_BASE_URL=https://frontend-task-chatapp.onrender.com/api

# URL pointing to the WebSocket (Socket.io) server
NEXT_PUBLIC_WEBSOCKET_URL=https://frontend-task-chatapp.onrender.com

# Random high-entropy secret string used to hash and encrypt NextAuth sessions
NEXTAUTH_SECRET=YOUR_SECURE_NEXTAUTH_SECRET_KEY

# Absolute base URL of this application
NEXTAUTH_URL=http://localhost:3000
```

---

## 🚀 Running the Application

### 1. Installation

Install project dependencies using your preferred package manager (npm recommended):

```bash
npm install
```

### 2. Development Mode

Launch the local Next.js hot-reloaded development environment:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

### 3. Build & Static Analysis

Check files for TypeScript types, linting standards, and compile optimization:

```bash
# Code linting
npm run lint

# Production compilation
npm run build
```

### 4. Production Start

Run the compiled, highly optimized production server local node:

```bash
npm run start
```

---

## 🔌 API & Socket Specifications

VortexChat is fully integrated with an external, pre-configured WebSocket & REST backend service.

### Primary REST Routes (Redux RTK Query)

- **Auth**: `POST /auth/login` (Authentication endpoint yielding a JWT access token).
- **Users**: `GET /users` (Search for existing users across the system directory).
- **Conversations**:
  - `GET /conversations` (Fetches active group and 1-to-1 conversations).
  - `GET /conversations/:id/messages` (Retrieves full paginated message history).
  - `POST /conversations/group` (Creates a brand new group with specified participants).
  - `POST /conversations/message` (Delivers text messages into a conversation).
  - `POST /conversations/group/add-member` (Adds new users to a group conversation).
  - `POST /conversations/group/rename` (Renames a group's title).
  - `POST /conversations/group/leave` (Removes the requesting user from the group roster).

### WebSocket Listeners

The application connects to the socket with the user's JWT authorization token and registers the following listeners in the global `useSocket` hooks:

- `message:new`: Intercepts freshly posted messages. Instantly appends the message to the active message cache array (`getMessages`) and invalidates general conversation summaries so the sidebar highlights the newest active message.
- `conversation:updated`: Listens to updates such as participants joining/leaving, name updates, etc., to invalidate active queries and trigger clean re-fetches.

---

## 🔒 Security & Optimization Practices

- **State Cache Isolation**: Messages are grouped and tracked per conversation. Handlers update the exact nested slice in Redux without forcing global page re-renders.
- **Debounced Searches**: Search requests on telephone and names are throttled through a custom `useDebouncer` hook to prevent rapid REST query spam.
- **Optimistic UI Updates**: Instantly adds sent messages to the local message state list before WebSockets or API queries return confirmation to offer instantaneous responsiveness.
- **Component Lazy Refetching**: Employs lazy triggers so data is only fetched from the remote host once individual channels or settings modals are requested.
