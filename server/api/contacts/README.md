# Contacts API Documentation

## Directory Structure
```
api/contacts/
├── README.md
├── controllers/       # Business logic
├── models/           # Data models and validation
├── routes/           # Route definitions
├── services/         # Database operations
└── utils/           # Helper functions
```

## API Endpoints

### Create Contact
```http
POST /api/contacts
```

Request body:
```json
{
  "name": "string",
  "phone": "string",
  "email": "string?",
  "preferred_date": "YYYY-MM-DD",
  "preferred_time": "HH:mm",
  "investment_capacity": "string?",
  "risk_tolerance": "string?",
  "experience_level": "string?",
  "time_horizon": "string?"
}
```

### List Contacts
```http
GET /api/contacts
```

Query parameters:
- `search`: Search by name/email/phone
- `status`: Filter by status
- `dateRange`: Filter by date range

### Update Contact
```http
PUT /api/contacts/:id
```

### Delete Contact
```http
DELETE /api/contacts/:id
```

### Update Status
```http
PATCH /api/contacts/:id/status
```

Request body:
```json
{
  "status": "new|contacted|qualified|converted|lost"
}
```

### Notes Management
```http
POST /api/contacts/:id/notes    # Add note
DELETE /api/contacts/:id/notes/:noteId  # Delete note
```

## Database Schema

### contacts
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  investment_capacity TEXT,
  risk_tolerance TEXT,
  experience_level TEXT,
  time_horizon TEXT,
  preferred_package TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### contact_notes
```sql
CREATE TABLE contact_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contact_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (contact_id) REFERENCES contacts (id) ON DELETE CASCADE
)
```