# Elysia.js: High-Performance TypeScript Framework

![Elysia.js Logo](https://media2.dev.to/dynamic/image/width=1280,height=720,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fkvakkj0rghm8ov4qxyd1.png)

## What is Elysia.js?

Elysia.js is a high-performance, TypeScript-first web framework built specifically for the Bun JavaScript runtime. Created by saltyAom, Elysia focuses on developer experience and performance through ergonomic APIs and compile-time validations.

## Core Features

### Bun-Powered Performance

![Elysia Performance](https://elysiajs.com/blog/elysia-12/node-benchmark.webp)

Built on top of Bun, Elysia takes advantage of its high-performance runtime to deliver exceptional speed:
- Handles tens of thousands of requests per second
- Minimal overhead compared to raw Bun
- Optimized for throughput and low latency

### TypeScript-First Design

Elysia is built from the ground up with TypeScript, providing end-to-end type safety:

```typescript
import { Elysia } from 'elysia'

const app = new Elysia()
    .get('/hello/:name', ({ params: { name } }) => {
        // name is automatically typed as string
        return `Hello ${name}`
    })
    .listen(3000)

// Types are inferred throughout the application
type App = typeof app
```

### Schema Validation with Type Inference

![Schema Validation](https://elysiajs.com/assets/lifecycle.webp)

Elysia integrates with TypeBox for runtime validation with automatic type inference:

```typescript
import { Elysia, t } from 'elysia'

new Elysia()
    .post('/user',
        ({ body }) => {
            // body is automatically typed based on the schema
            return `Created user ${body.name} (${body.age})`
        },
        {
            body: t.Object({
                name: t.String(),
                age: t.Number({ minimum: 0 }),
                email: t.String({ format: 'email' }),
                tags: t.Array(t.String())
            })
        }
    )
    .listen(3000)
```

### Decorator Pattern

Elysia uses a decorator pattern for clean route definitions:

```typescript
import { Elysia, t } from 'elysia'

new Elysia()
    .get('/', () => 'Hello World')
    .guard({
        headers: t.Object({
            authorization: t.String()
        })
    })
    .get('/protected', ({ headers }) => {
        return `Authorized with: ${headers.authorization}`
    })
    .listen(3000)
```

### Plugin System

Elysia has a powerful plugin system for extending functionality:

```typescript
import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { jwt } from '@elysiajs/jwt'

new Elysia()
    .use(cors())
    .use(swagger())
    .use(jwt({
        secret: 'supersecret'
    }))
    .get('/', () => 'Hello World')
    .listen(3000)
```

### Lifecycle Hooks

Comprehensive lifecycle hooks for request processing:

```typescript
new Elysia()
    .onRequest((context) => {
        console.log(`Request to ${context.request.url}`)
    })
    .onBeforeHandle(({ request }) => {
        console.log('Before handling the request')
    })
    .onAfterHandle((context) => {
        console.log('After handling the request')
    })
    .onError((context) => {
        console.error('Error occurred:', context.error)
    })
    .get('/', () => 'Hello')
    .listen(3000)
```

### File Uploads

Easy handling of file uploads:

```typescript
import { Elysia } from 'elysia'

new Elysia()
    .post('/upload', async ({ body }) => {
        const file = body.file
        
        // Store file or process it
        await Bun.write('uploads/' + file.name, file)
        
        return {
            success: true,
            fileName: file.name,
            size: file.size
        }
    }, {
        body: t.Object({
            file: t.File()
        })
    })
    .listen(3000)
```

## Ecosystem

Elysia has a growing ecosystem of official and community plugins:

- **@elysiajs/cors**: CORS support
- **@elysiajs/swagger**: OpenAPI/Swagger documentation
- **@elysiajs/jwt**: JWT authentication
- **@elysiajs/static**: Static file serving
- **@elysiajs/html**: HTML template rendering
- **@elysiajs/cookie**: Cookie management

## Getting Started

```bash
# Make sure Bun is installed
curl -fsSL https://bun.sh/install | bash

# Create a new Elysia project
bun create elysia my-app

# Navigate to the project
cd my-app

# Install dependencies
bun install

# Run the development server
bun run dev
```

## Hello World Example

```typescript
// index.ts
import { Elysia } from 'elysia'

new Elysia()
    .get('/', () => 'Hello Elysia')
    .listen(3000)
    .then((server) => 
        console.log(`🦊 Elysia is running at ${server.hostname}:${server.port}`)
    )
```

## REST API Example

```typescript
// api.ts
import { Elysia, t } from 'elysia'

// In-memory database for example
const db = {
    users: [
        { id: 1, name: 'John', email: 'john@example.com' }
    ]
}

// Create a new Elysia instance
const app = new Elysia()
    // GET all users
    .get('/users', () => db.users)
    
    // GET user by ID
    .get('/users/:id', ({ params: { id } }) => {
        const user = db.users.find(user => user.id === parseInt(id))
        return user ?? { error: 'User not found' }
    })
    
    // POST new user
    .post('/users', 
        ({ body }) => {
            const newUser = {
                id: db.users.length + 1,
                ...body
            }
            db.users.push(newUser)
            return newUser
        },
        {
            body: t.Object({
                name: t.String(),
                email: t.String({ format: 'email' })
            })
        }
    )
    
    // DELETE user
    .delete('/users/:id', ({ params: { id } }) => {
        const userId = parseInt(id)
        const userIndex = db.users.findIndex(user => user.id === userId)
        
        if (userIndex === -1) return { error: 'User not found' }
        
        const [deletedUser] = db.users.splice(userIndex, 1)
        return { deleted: deletedUser }
    })
    
    .listen(3000)
```

## Why Choose Elysia.js?

- **Performance**: One of the fastest Node.js-compatible frameworks
- **Type Safety**: First-class TypeScript support with inference
- **Developer Experience**: Clean API design and ergonomic interfaces
- **Validation**: Built-in schema validation with type inference
- **Modern**: Built for modern JavaScript practices and Bun runtime
- **Lightweight**: Minimal overhead and dependencies

## Learning Resources

- [Official Elysia Documentation](https://elysiajs.com)
- [Elysia GitHub Repository](https://github.com/elysiajs/elysia)
- [Elysia Discord Community](https://discord.gg/elysia)