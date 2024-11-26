<content># API Documentation

## Base URL
Development: `http://localhost:3001/api`

## Authentication
All admin routes require JWT authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
- `POST /auth/login`
  - Login with email/password
  - Returns JWT token
  - Public access

- `GET /auth/validate` 
  - Validate JWT token
  - Returns user info
  - Requires auth

### Contacts
- `GET /contacts`
  - List all contacts
  - Requires auth
  - Supports filtering & pagination

- `POST /contacts`
  - Create new contact
  - Public access
  - Required fields: name, phone, preferred_date, preferred_time

- `PUT /contacts/:id`
  - Update contact
  - Requires auth
  - Validates required fields

- `DELETE /contacts/:id`
  - Delete contact
  - Requires auth
  - Also deletes related notes

- `PATCH /contacts/:id/status`
  - Update contact status
  - Requires auth
  - Status options: new, contacted, qualified, converted, lost

### Contact Notes
- `POST /contacts/:id/notes`
  - Add note to contact
  - Requires auth
  - Required field: text

- `DELETE /contacts/:id/notes/:noteId`
  - Delete note
  - Requires auth

## Error Handling
All endpoints return errors in consistent format:
```json
{
  "error": "Error message",
  "details": {
    "field": "Field specific error"
  }
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Response Format
Success responses:
```json
{
  "success": true,
  "data": {
    // Response data
  }
}
```

## Development Setup
1. Start server on port 3001:
```bash
npm run dev
```

2. Server uses in-memory SQLite database
3. Default admin credentials:
   - Email: admin@congresstrade.de
   - Password: admin123</content>