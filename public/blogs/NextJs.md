# Next.js: The Complete Guide

![Next.js Logo](https://logowik.com/content/uploads/images/nextjs2106.logowik.com.webp)

## What is Next.js?

Next.js is a React framework that enables functionality such as server-side rendering, static site generation, and API routes. Created by Vercel (formerly Zeit), Next.js has become one of the most popular choices for building modern web applications due to its powerful features and developer experience.

## Core Features

### Multiple Rendering Strategies

![Rendering Comparison](https://www.thetombomb.com/images/ForPosts/renderingTable.png)

Next.js offers flexibility with multiple rendering options:

- **Server-Side Rendering (SSR)**: Generates HTML on each request
- **Static Site Generation (SSG)**: Pre-renders pages at build time
- **Incremental Static Regeneration (ISR)**: Updates static pages after deployment
- **Client-Side Rendering**: Traditional React rendering in the browser

```jsx
// SSG with data fetching
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  
  return {
    props: { data },
    revalidate: 60 // ISR: regenerate page every 60 seconds
  }
}
```

### File-System Based Routing

Next.js creates routes automatically based on your file structure in the `pages` directory:

```
pages/
├── index.js         // Route: /
├── about.js         // Route: /about
└── posts/
    ├── index.js     // Route: /posts
    └── [id].js      // Route: /posts/:id
```

### Built-in API Routes

Create API endpoints inside your Next.js app by adding files to the `pages/api` directory:

```jsx
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello World!' })
}
```

### Image Optimization

![Image Optimization](https://h8dxkfmaphn8o0p3.public.blob.vercel-storage.com/docs/dark/responsive-image.png)

Next.js includes an `Image` component that automatically optimizes images:
- Responsive sizes
- WebP format where supported
- Lazy loading
- Prevents layout shift

```jsx
import Image from 'next/image'

export default function ProfilePage() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile Picture"
      width={500}
      height={500}
      priority
    />
  )
}
```

## The App Router (Next.js 13+)

![App Router Architecture](https://h8dxkfmaphn8o0p3.public.blob.vercel-storage.com/docs/dark/terminology-component-tree.png)

Next.js 13 introduced a new `app` directory with enhanced features:

- **React Server Components**: Split rendering between client and server
- **Nested Layouts**: Share UI across routes while preserving state
- **Server Actions**: Write server-side logic directly in your components
- **Streaming**: Progressively render UI
- **Parallel Routes**: Render multiple pages in the same layout

```jsx
// app/page.js
export default async function HomePage() {
  // This component is a Server Component by default
  const data = await fetch('https://api.example.com/data')
  const posts = await data.json()
  
  return (
    <main>
      {posts.map(post => (
        <Article key={post.id} post={post} />
      ))}
    </main>
  )
}
```

## Data Fetching

Next.js provides several ways to fetch data:

- **getServerSideProps**: Fetch data on each request (SSR)
- **getStaticProps**: Fetch data at build time (SSG)
- **getStaticPaths**: Specify dynamic routes to pre-render (SSG)
- **SWR/React Query**: Client-side data fetching with caching

```jsx
// Server Component data fetching (App Router)
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <main>{/* Use data */}</main>
}
```

## Styling Options

Next.js supports various styling approaches:

- **CSS Modules**: Scoped CSS files
- **Sass/SCSS**: Built-in support
- **CSS-in-JS**: Works with styled-components, Emotion, etc.
- **Tailwind CSS**: Easy integration

```jsx
// Using CSS Modules
import styles from './Button.module.css'

export default function Button() {
  return (
    <button className={styles.button}>
      Click Me
    </button>
  )
}
```

## Deployment & Performance

![Performance Metrics](https://media.licdn.com/dms/image/D4E12AQGJ0k9_noOwXQ/article-cover_image-shrink_600_2000/0/1709482194452?e=2147483647&v=beta&t=myIB4qiOckcPzHwwgixkNW4kIuQzVaqdQ-oHWk50UVc)

Next.js applications can be deployed to any hosting provider that supports Node.js, but they integrate especially well with Vercel:

- **Edge Functions**: Run code closer to users
- **Analytics**: Built-in performance monitoring
- **Automatic HTTPS**: Secure by default
- **Global CDN**: Fast content delivery
- **Zero-config deployments**: Connect Git repository and deploy

## Getting Started

```bash
# Create a new Next.js app
npx create-next-app@latest my-app

# Run the development server
cd my-app
npm run dev
```

## Why Choose Next.js?

- **Performance**: Optimized production builds with automatic code splitting
- **SEO**: Server-side rendering improves search engine visibility
- **Developer Experience**: Fast Refresh, TypeScript support, ESLint integration
- **Scalability**: From small sites to large applications
- **Community**: Large ecosystem of plugins and examples

## Learning Resources

- [Official Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)
- [Vercel Platform](https://vercel.com)