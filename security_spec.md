# Security Specification - Ludo Tournament Registrations

## Data Invariants
- A registration must have a valid full name (max 100 chars).
- An email must be a valid email string.
- Phone number must be a valid string (max 20 chars).
- Region must be one of: "Alexandra", "Soweto", "Mamelodi".
- `createdAt` must be the server time.
- Documents are publicly creatable but not readable by the public (to protect PII). Only specific admin logic or backend would read them, or they remain write-only for the client. (In this case, let's assume users can't read others' registrations).

## The Dirty Dozen Payloads (Rejection Tests)
1. **Empty Payload**: `{}` (Should fail: missing required keys)
2. **Missing Field**: `{"fullName": "John Doe", "email": "john@example.com"}` (Should fail: missing phoneNumber, region, createdAt)
3. **Invalid Email**: `{"fullName": "John Doe", "email": "not-an-email", "phoneNumber": "123", "region": "Soweto", "createdAt": "request.time"}`
4. **Invalid Region**: `{"fullName": "John Doe", "email": "john@example.com", "phoneNumber": "123", "region": "Chicago", "createdAt": "request.time"}`
5. **Future Timestamp**: `{"fullName": "John Doe", "email": "john@example.com", "phoneNumber": "123", "region": "Soweto", "createdAt": "2030-01-01T00:00:00Z"}` (Should fail: createdAt must be request.time)
6. **Massive String**: `{"fullName": "A".repeat(2000), ...}` (Should fail: name too long)
7. **Invalid ID**: Attempting to write to `/registrations/poison-id-$$$`
8. **Malicious Ghost Field**: `{"fullName": "John", ..., "isAdmin": true}` (Should fail: shadow fields prohibited)
9. **Update Attempt**: Authenticated user trying to update an existing registration (Should fail: registrations are immutable once created by user)
10. **Global Read**: `allow read: if true` (Should fail: PII must be protected)
11. **Spoofed Auth**: Providing an auth object but mismatched data (N/A for public creation, but good to keep in mind)
12. **Recursive Path**: `/registrations/id/sub/id` (Should fail: default deny)
