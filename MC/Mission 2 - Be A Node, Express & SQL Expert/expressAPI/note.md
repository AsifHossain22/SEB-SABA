# Project Set Up:

- npm init -y
- tsc --init
- npm install -D @types/node
- npm install -D tsx
- // Uncomment from File Layout in 'tsconfig.json' file
  - "rootDir": "./src",
  - "outDir": "./dist",
- "types": ["node"] in 'tsconfig.json' file
- "module": "esnext" in 'tsconfig.json' file
- "moduleResolution": "bundler" in 'tsconfig.json' file

- npm i express

- "scripts": { "dev": "tsx watch ./src/index.ts" } in 'package.json' file
- "type": "module" in 'package.json' file
