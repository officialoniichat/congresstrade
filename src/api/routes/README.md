<content># API Routes Documentation

## Authentication Routes
`/api/auth/*` - Authentication related endpoints

### Login
```typescript
POST /api/auth/login
Body: {
  email: string;
  password: string;
}
Response: {
  token: string;
  user: User;
}
```

### Validate Token
```typescript
GET /api/auth/validate
Headers: {
  Authorization: `Bearer ${token}`
}
Response: {
  valid: boolean;
  user?: User;
}
```

## Contact Routes
`/api/contacts/*` - Contact management endpoints

### List Contacts
```typescript
GET /api/contacts
Headers: {
  Authorization: `Bearer ${token}`
}
Query: {
  search?: string;
  status?: string;
  dateRange?: string;
}
Response: Contact[]
```

### Create Contact
```typescript
POST /api/contacts
Body: {
  name: string;
  phone: string;
  email?: string;
  preferred_date: string;
  preferred_time: string;
}
Response: {
  id: number;
}
```

### Update Contact
```typescript
PUT /api/contacts/:id
Headers: {
  Authorization: `Bearer ${token}`
}
Body: Partial<Contact>
Response: {
  success: boolean;
}
```

### Delete Contact
```typescript
DELETE /api/contacts/:id
Headers: {
  Authorization: `Bearer ${token}`
}
Response: {
  success: boolean;
}
```

### Update Status
```typescript
PATCH /api/contacts/:id/status
Headers: {
  Authorization: `Bearer ${token}`
}
Body: {
  status: string;
}
Response: {
  success: boolean;
}
```

## Note Routes
`/api/contacts/:id/notes/*` - Contact notes management

### Add Note
```typescript
POST /api/contacts/:id/notes
Headers: {
  Authorization: `Bearer ${token}`
}
Body: {
  text: string;
}
Response: ContactNote
```

### Delete Note
```typescript
DELETE /api/contacts/:id/notes/:noteId
Headers: {
  Authorization: `Bearer ${token}`
}
Response: {
  success: boolean;
}
```</content>