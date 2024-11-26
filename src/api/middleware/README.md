<content># API Middleware Documentation

## Authentication Middleware
Validates JWT tokens and protects routes

### Usage
```typescript
import { authenticateToken } from '../middleware/auth';

router.get('/protected', authenticateToken, (req, res) => {
  // Route handler
});
```

### Implementation
```typescript
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    return res.status(403).json({ error: 'Invalid token' });
  }
}
```

## Role Authorization
Restricts routes based on user roles

### Usage
```typescript
import { authorizeRole } from '../middleware/auth';

router.post('/admin', authorizeRole(['admin']), (req, res) => {
  // Admin only route
});
```

## Error Handling
Global error handling middleware

### Usage
```typescript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
```

## CORS Configuration
```typescript
app.use(cors({
  origin: ['http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```</content>