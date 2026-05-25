# Authentication VS Authorization

- Authentication: Who are you?
- Authorization: What can you do?

- Authentication
  - Core Types:
    1. Session-based (Stateful):
    - The server stores user data (session) on its side
    - The client (browser) gets a session ID in a cookie
    - On every request -> the cookie is sent -> server checks it and identifies
      the user
      - It's stateful (server remembers everything)
      - Needs server storage and it's harder to scale for large systems
    2. JWT-based (Stateless):
    - After login, the server gives a JWT token
    - The token is stored on the client side (browser/app)
    - On every request -> the token is sent -> server verifies it and identifies
      the user
      - It is stateless (server does not store anything)
      - Faster, more scalable, and better for modern apps

- Authorization
  - Core Types:
    1. Role-Based Access Control (RBAC)
    - Admin -> can do everything
    - User -> limited access
    - Agent -> some special permission
    2. Permission-Based (Fine-Grained Access)
    - User 1 -> Can read and write
    - User 2 -> Can read only
    3. Attribute-Based Access Control (ABAC)
    - Only allow access if:
      - User role = admin
      - AND location = United Arab Emirates
      - AND time = office hours
    4. Policy-Based Access Control (PBAC)
    - Only premium users can access this route
    - Only verified users can withdraw money
