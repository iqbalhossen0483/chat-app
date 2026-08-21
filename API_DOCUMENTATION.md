# Chat Application API Documentation

A comprehensive, production-ready specification for the Real-Time 1-to-1 and Group Chat API (REST + WebSocket).

---

## 1. Overview & Base URLs

- **API Version:** `1.0.0`
- **Protocol:** HTTPS (REST) & WSS / HTTP Long-Polling (Socket.io v4)
- **REST Base URL:** `https://frontend-task-chatapp.onrender.com/api`
- **WebSocket Base URL:** `https://frontend-task-chatapp.onrender.com`
- **Default Request & Response Format:** `application/json`

---

## 2. Authentication

The API uses **JWT (JSON Web Tokens)** for authenticating both REST endpoints and WebSocket connections.

### REST Requests

Include the JWT token in the HTTP `Authorization` header for all protected endpoints:

```http
Authorization: Bearer <your_jwt_token>
```

### WebSocket (Socket.io)

Pass the JWT token in the handshake `auth` payload when initializing the Socket.io client:

```javascript
import { io } from "socket.io-client";

const socket = io("https://frontend-task-chatapp.onrender.com", {
  auth: {
    token: "YOUR_JWT_TOKEN",
  },
});
```

---

## 3. Data Schemas

### User

```json
{
  "_id": "6a882468e5d6aac97521e25e",
  "name": "Ada Lovelace",
  "phone": "+15551234567",
  "createdAt": "2026-08-21T10:11:52.529Z"
}
```

### Direct Conversation Summary

```json
{
  "_id": "6a883644e5d6aac97521f629",
  "type": "direct",
  "lastMessage": {
    "text": "Hello world!",
    "sender": "6a882468e5d6aac97521e25e",
    "createdAt": "2026-08-21T11:29:34.621Z"
  },
  "participant": {
    "_id": "6a88239ee5d6aac97521e234",
    "name": "Alice Smith",
    "phone": "+8801700000002"
  },
  "updatedAt": "2026-08-21T11:29:34.855Z"
}
```

### Group Conversation Summary

```json
{
  "_id": "6a883dede5d6aac975220b66",
  "type": "group",
  "name": "Computer Pioneers",
  "createdBy": "6a882468e5d6aac97521e25e",
  "admins": ["6a882468e5d6aac97521e25e"],
  "participants": [
    {
      "_id": "6a882468e5d6aac97521e25e",
      "name": "Ada Lovelace",
      "phone": "+15551234567"
    },
    {
      "_id": "6a882f6de5d6aac97521e902",
      "name": "Alan Turing",
      "phone": "+15559876543"
    },
    {
      "_id": "6a882f6ee5d6aac97521e905",
      "name": "Grace Hopper",
      "phone": "+15555555555"
    }
  ],
  "lastMessage": {},
  "createdAt": "2026-08-21T12:00:45.718Z",
  "updatedAt": "2026-08-21T12:00:45.718Z"
}
```

### Message

```json
{
  "_id": "6a883dc8e5d6aac975220b3d",
  "conversation": "6a882f71e5d6aac97521e90d",
  "sender": "6a882468e5d6aac97521e25e",
  "text": "Hello Alan from Ada!",
  "createdAt": "2026-08-21T12:00:08.901Z"
}
```

### Error Response Schema

```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "path": "phone",
        "message": "phone is required"
      }
    ]
  }
}
```

---

## 4. Endpoints Reference

### 4.1 System Endpoints

#### `GET /health`

- **Summary:** Health check
- **Security:** Public (No authentication required)
- **Base Path Notice:** Call at root server URL (`https://frontend-task-chatapp.onrender.com/health`)

**Response (200 OK):**

```json
{
  "status": "ok"
}
```

---

### 4.2 Authentication Endpoints

#### `POST /api/auth/login`

- **Summary:** Log in or register
- **Description:** Unified login and registration endpoint. Registers new phone numbers automatically or logs in existing ones. Returns a Bearer JWT token.
- **Security:** Public

**Request Body:**

```json
{
  "phone": "+15551234567",
  "name": "Ada Lovelace"
}
```

**Parameters & Constraints:**

- `phone` (_string_, required): Valid phone number with country code.
- `name` (_string_, required): User's full name.

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6a882468e5d6aac97521e25e",
    "name": "Ada Lovelace",
    "phone": "+15551234567",
    "createdAt": "2026-08-21T10:11:52.529Z"
  }
}
```

**Error Responses:**

- `400 Bad Request` (`VALIDATION_ERROR`): Missing or invalid `phone` or `name`.

---

#### `GET /api/auth/me`

- **Summary:** Current user profile
- **Description:** Retrieves the authenticated user associated with the provided JWT bearer token.
- **Security:** Bearer Auth Required

**Headers:**

```http
Authorization: Bearer <token>
```

**Response (200 OK):**

```json
{
  "_id": "6a882468e5d6aac97521e25e",
  "name": "Ada Lovelace",
  "phone": "+15551234567",
  "createdAt": "2026-08-21T10:11:52.529Z"
}
```

**Error Responses:**

- `401 Unauthorized` (`INVALID_TOKEN`): Token missing, malformed, or expired.

---

### 4.3 Users Endpoints

#### `GET /api/users/search`

- **Summary:** Search users by name or phone
- **Security:** Bearer Auth Required

**Query Parameters:**
| Parameter | Type | Required | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `q` | `string` | Yes | Search query matching user name or phone number | `Alan` |

**Response (200 OK):**

```json
[
  {
    "_id": "6a882f6de5d6aac97521e902",
    "name": "Alan Turing",
    "phone": "+15559876543"
  }
]
```

---

### 4.4 Conversations Endpoints

#### `GET /api/conversations`

- **Summary:** List my conversations
- **Description:** Retrieves all direct and group conversations the current user is a member of.
- **Security:** Bearer Auth Required

**Response (200 OK):**

```json
[
  {
    "_id": "6a883644e5d6aac97521f629",
    "type": "direct",
    "lastMessage": {
      "text": "Hello world!",
      "sender": "6a882468e5d6aac97521e25e",
      "createdAt": "2026-08-21T11:29:34.621Z"
    },
    "updatedAt": "2026-08-21T11:29:34.855Z",
    "participant": {
      "_id": "6a88239ee5d6aac97521e234",
      "name": "Alice Smith",
      "phone": "+8801700000002"
    }
  },
  {
    "_id": "6a883dede5d6aac975220b66",
    "type": "group",
    "name": "Computer Pioneers",
    "createdBy": "6a882468e5d6aac97521e25e",
    "admins": ["6a882468e5d6aac97521e25e"],
    "participants": [
      {
        "_id": "6a882468e5d6aac97521e25e",
        "name": "Ada Lovelace",
        "phone": "+15551234567"
      },
      {
        "_id": "6a882f6de5d6aac97521e902",
        "name": "Alan Turing",
        "phone": "+15559876543"
      }
    ],
    "lastMessage": {},
    "updatedAt": "2026-08-21T12:00:45.718Z"
  }
]
```

---

#### `POST /api/conversations`

- **Summary:** Start a direct conversation
- **Description:** Opens or returns an existing 1-to-1 direct conversation with another user.
- **Security:** Bearer Auth Required

**Request Body:**

```json
{
  "userId": "6a882f6de5d6aac97521e902"
}
```

**Response (200 OK / 201 Created):**

```json
{
  "_id": "6a882f71e5d6aac97521e90d",
  "participants": ["6a882468e5d6aac97521e25e", "6a882f6de5d6aac97521e902"],
  "createdAt": "2026-08-21T10:58:57.218Z"
}
```

---

#### `GET /api/conversations/{id}/messages`

- **Summary:** Get message history
- **Description:** Fetches paginated messages for a conversation.
- **Security:** Bearer Auth Required

**Path Parameters:**

- `id` (_string_, required): Conversation ID (`_id`).

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `limit` | `integer` | No | `20` | Max messages per page |
| `before` | `string` | No | null | Cursor ID of message to load older messages before |

**Response (200 OK):**

```json
{
  "messages": [
    {
      "_id": "6a883dc8e5d6aac975220b3d",
      "conversation": "6a882f71e5d6aac97521e90d",
      "sender": "6a882468e5d6aac97521e25e",
      "text": "Hello Alan from Ada!",
      "createdAt": "2026-08-21T12:00:08.901Z"
    }
  ],
  "hasMore": true
}
```

---

### 4.5 Messages Endpoints

#### `POST /api/messages`

- **Summary:** Send a message
- **Description:** Sends a message to a direct chat or group conversation. Dispatches `message:new` over WebSocket automatically.
- **Security:** Bearer Auth Required

**Request Body:**

```json
{
  "conversationId": "6a882f71e5d6aac97521e90d",
  "text": "Hello Alan from Ada!"
}
```

**Response (200 OK / 201 Created):**

```json
{
  "_id": "6a883dc8e5d6aac975220b3d",
  "conversation": "6a882f71e5d6aac97521e90d",
  "sender": "6a882468e5d6aac97521e25e",
  "text": "Hello Alan from Ada!",
  "createdAt": "2026-08-21T12:00:08.901Z"
}
```

---

### 4.6 Group Endpoints

#### `POST /api/conversations/group`

- **Summary:** Create a group
- **Description:** Creates a group chat. The authenticated creator becomes an admin automatically. At least 2 other participant IDs are required (minimum group size = 3 members).
- **Security:** Bearer Auth Required

**Request Body:**

```json
{
  "name": "Project Team",
  "participantIds": ["6a882f6de5d6aac97521e902", "6a882f6ee5d6aac97521e905"]
}
```

**Response (200 OK / 201 Created):**

```json
{
  "_id": "6a883dede5d6aac975220b66",
  "type": "group",
  "name": "Project Team",
  "createdBy": "6a882468e5d6aac97521e25e",
  "admins": ["6a882468e5d6aac97521e25e"],
  "participants": [
    {
      "_id": "6a882468e5d6aac97521e25e",
      "name": "Ada Lovelace",
      "phone": "+15551234567"
    },
    {
      "_id": "6a882f6de5d6aac97521e902",
      "name": "Alan Turing",
      "phone": "+15559876543"
    },
    {
      "_id": "6a882f6ee5d6aac97521e905",
      "name": "Grace Hopper",
      "phone": "+15555555555"
    }
  ],
  "createdAt": "2026-08-21T12:00:45.718Z",
  "updatedAt": "2026-08-21T12:00:45.718Z"
}
```

**Error Responses:**

- `400 Bad Request` (`VALIDATION_ERROR`): Fewer than 2 participant IDs supplied.

---

#### `POST /api/conversations/{id}/participants`

- **Summary:** Add members to a group
- **Description:** Adds new members to an existing group. Admin privileges required.
- **Security:** Bearer Auth Required

**Path Parameter:**

- `id` (_string_, required): Group conversation ID.

**Request Body:**

```json
{
  "userIds": ["6a883deee5d6aac975220b6a"]
}
```

**Response (200 OK):**

```json
{
  "_id": "6a883dede5d6aac975220b66",
  "type": "group",
  "name": "Project Team",
  "createdBy": "6a882468e5d6aac97521e25e",
  "admins": ["6a882468e5d6aac97521e25e"],
  "participants": [
    {
      "_id": "6a882468e5d6aac97521e25e",
      "name": "Ada Lovelace",
      "phone": "+15551234567"
    },
    {
      "_id": "6a883deee5d6aac975220b6a",
      "name": "John von Neumann",
      "phone": "+15550009999"
    }
  ],
  "updatedAt": "2026-08-21T12:00:47.860Z"
}
```

---

#### `DELETE /api/conversations/{id}/participants/{userId}`

- **Summary:** Remove a member / leave a group
- **Description:** Removes a member from a group (if caller is admin) or leaves the group (if `userId` matches the current caller).
- **Security:** Bearer Auth Required

**Path Parameters:**

- `id` (_string_, required): Group conversation ID.
- `userId` (_string_, required): Target user ID to remove or leave.

**Response (200 OK):**

```json
{
  "_id": "6a883dede5d6aac975220b66",
  "type": "group",
  "name": "Project Team",
  "createdBy": "6a882468e5d6aac97521e25e",
  "admins": ["6a882468e5d6aac97521e25e"],
  "participants": [
    {
      "_id": "6a882468e5d6aac97521e25e",
      "name": "Ada Lovelace",
      "phone": "+15551234567"
    }
  ],
  "updatedAt": "2026-08-21T12:00:51.520Z"
}
```

---

#### `POST /api/conversations/{id}/admins`

- **Summary:** Promote a member to admin
- **Description:** Promotes an existing member of a group to an admin. Caller must be an admin.
- **Security:** Bearer Auth Required

**Path Parameter:**

- `id` (_string_, required): Group conversation ID.

**Request Body:**

```json
{
  "userId": "6a882f6de5d6aac97521e902"
}
```

**Response (200 OK):**

```json
{
  "_id": "6a883dede5d6aac975220b66",
  "type": "group",
  "name": "Project Team",
  "admins": ["6a882468e5d6aac97521e25e", "6a882f6de5d6aac97521e902"]
}
```

---

#### `PATCH /api/conversations/{id}`

- **Summary:** Rename a group
- **Description:** Changes the display name of a group conversation. Caller must be an admin.
- **Security:** Bearer Auth Required

**Path Parameter:**

- `id` (_string_, required): Group conversation ID.

**Request Body:**

```json
{
  "name": "Renamed Team"
}
```

**Response (200 OK):**

```json
{
  "_id": "6a883dede5d6aac975220b66",
  "type": "group",
  "name": "Renamed Team",
  "updatedAt": "2026-08-21T12:00:49.266Z"
}
```

---

## 5. WebSocket Integration (Socket.io)

### Connection

Connect to the host origin root (Socket.io path defaults to `/socket.io/`):

```javascript
const socket = io("https://frontend-task-chatapp.onrender.com", {
  auth: { token: "YOUR_JWT_TOKEN" },
});
```

### Client -> Server Events

#### Event: `message:send`

Sends a message in real-time.

- **Payload:**

```json
{
  "conversationId": "6a882f71e5d6aac97521e90d",
  "text": "Hello world over WebSocket!"
}
```

- **Optional Acknowledgement Callback:** `(response) => void`

---

### Server -> Client Events

#### Event: `message:new`

Emitted when a new message arrives in a direct or group conversation.

- **Payload:**

```json
{
  "_id": "6a883dc8e5d6aac975220b3d",
  "conversation": "6a882f71e5d6aac97521e90d",
  "sender": "6a882468e5d6aac97521e25e",
  "text": "Hello world over WebSocket!",
  "createdAt": "2026-08-21T12:00:08.901Z"
}
```

#### Event: `conversation:updated`

Emitted when a group conversation changes (group created, renamed, or members/admins added or removed).

- **Payload:** Updated conversation object.

---

## 6. Error Codes Reference

| Error Code         | HTTP Status | Description                                                                       |
| :----------------- | :---------- | :-------------------------------------------------------------------------------- |
| `VALIDATION_ERROR` | `400`       | Input validation failed (e.g. missing required field, insufficient participants). |
| `INVALID_TOKEN`    | `401`       | Token is missing, expired, or invalid JWT signature.                              |
| `FORBIDDEN`        | `403`       | User does not have authorization (e.g. non-admin performing group edit).          |
| `NOT_FOUND`        | `404`       | Requested route, conversation, or user was not found.                             |
| `SERVER_ERROR`     | `500`       | Internal server exception or database error.                                      |
