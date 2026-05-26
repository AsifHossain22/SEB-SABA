1. npm init -y
   - _package.json_
     - "scripts": { "dev": "tsx watch ./src/index.ts" },
     - "type": "module",
2. tsc --init
   - _tsconfig.json_
     - npm install -D @types/node
     - // File Layout - Uncomment
       - "rootDir": "./src",
       - "outDir": "./dist",
     - // Environment Settings - Setup
       - "module": "esnext",
       - "moduleResolution": "bundler",
       - "types": ["node"],
3. npm install -D tsx
4. npm i express
   - npm i --save-dev @types/express
5. _./.env_
6. **_./src_**
   - index.ts
   - app.ts
   - _/config_
     - index.ts
7. npm i dotenv
8. Create Database on NEON DB
   - Connect the string by _.env_ and _/config/index.ts_
9. npm install @neondatabase/serverless
10. **_./src_**
    - /db
      - index.ts
    - /utils
      - sendResponse.ts
    - /middleware
      - logger.ts
      - globalErrorHandler.ts
    - /types
      - index.ts
    - /api
      - /routes
        - auth.routes.ts
      - /controllers
        - auth.controllers.ts
      - /services
        - auth.services.ts
11. npm i bcrypt
    - npm i --save-dev @types/bcrypt
12. npm install jsonwebtoken
    - npm i --save-dev @types/jsonwebtoken
