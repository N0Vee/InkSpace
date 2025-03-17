import { getBlogs } from './lib/blogs';
import EditorContent from './lib/EditorContent';
import Link from 'next/link';
import './styles/home.scss';


export default function Home() {
    
    const blogs = getBlogs();
    const featuredBlogs = blogs.slice(0, 3); // Get first 3 blogs as featured

    return (
        <div className="inkspace-layout">
            {/* Hero Section */}
            <section className="hero is-medium is-link">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-1">
                            <span className="gradient-text">Inkspace</span>
                        </h1>
                        <h2 className="subtitle is-3">
                            A platform for reading and writing blogs about Web Technology
                        </h2>
                        <p className="mb-5">
                            Featuring a powerful Markdown Editor and AI-powered content generation using Gemini
                        </p>
                        <div className="buttons">
                            <Link legacyBehavior href="/write">
                                <a className="button is-primary is-medium">Start Writing</a>
                            </Link>
                            <Link legacyBehavior href="/blogs">
                                <a className="button is-light is-medium">Explore Blogs</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Blogs Section */}
            <section className="section">
                <div className="container">
                    <h2 className="title has-text-centered">
                        Featured <span className="gradient-text">Blogs</span>
                    </h2>
                    <p className="subtitle has-text-centered mb-6">
                        Discover the best content from our community
                    </p>

                    <div className="columns is-multiline">
                        {featuredBlogs.map((blog) => (
                            <div key={blog.filename} className="column is-one-third">
                                <Link legacyBehavior href={`/blog/${blog.filename.replace('.md', '')}`}>
                                    <a className="featured-blog-card">
                                        <div className="card">
                                            <div className="card-image">
                                                <figure className="image is-3by2">
                                                    <img src={blog.image} alt={blog.title} className="blog-thumbnail" />
                                                </figure>
                                            </div>
                                            <div className="card-content">
                                                <p className="title is-4">{blog.title}</p>
                                                <div className="content">
                                                    <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) + '...' }} />
                                                </div>
                                                <div className="mt-4 is-flex is-justify-content-space-between is-align-items-center">
                                                    <span className="tag is-info">Featured</span>
                                                    <span className="is-size-7">5 min read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="has-text-centered mt-6">
                        <Link legacyBehavior href="/blogs">
                            <a className="button is-link is-outlined">View All Featured</a>
                        </Link>
                    </div>
                </div>
            </section>

            {/* All Blogs Section */}
            <section className="section has-background-light">
                <div className="container">
                    <h2 className="title has-text-centered">
                        All <span className="gradient-text">Blogs</span>
                    </h2>
                    <p className="subtitle has-text-centered mb-6">
                        Explore all articles on web technology
                    </p>

                    <div className="columns is-multiline">
                        {blogs.map((blog) => (
                            <div key={blog.filename} className="column is-one-third-desktop is-half-tablet">
                                <Link legacyBehavior href={`/blog/${blog.filename.replace('.md', '')}`}>
                                    <a className="blog-card">
                                        <div className="card">
                                            <div className="card-content">
                                                <p className="title is-4">{blog.title}</p>
                                                <div className="content">
                                                    <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 150) + '...' }} />
                                                </div>
                                                <div className="mt-4 is-flex is-justify-content-space-between is-align-items-center">
                                                    <span className="tag is-info">Web Tech</span>
                                                    <button className="button is-small is-outlined is-link">Read More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="has-text-centered mt-6">
                        <Link legacyBehavior href="/blogs">
                            <a className="button is-link">View All Blogs</a>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Write New Section */}
            <section className="section">
                <div className="container">
                    <div className="columns is-vcentered">
                        <div className="column is-6">
                            <h2 className="title">
                                Start <span className="gradient-text">Writing</span> Today
                            </h2>
                            <p className="subtitle">
                                Share your knowledge with our community
                            </p>
                            <div className="content">
                                <p>
                                    Inkspace gives you powerful tools to create engaging content:
                                </p>
                                <ul>
                                    <li>Feature-rich Markdown Editor</li>
                                    <li>AI-powered content generation with Gemini</li>
                                    <li>Editor.js support for advanced content management</li>
                                    <li>Beautiful, responsive design</li>
                                </ul>
                                <Link legacyBehavior href="/write">
                                    <a className="button is-primary mt-4">Create New Blog</a>
                                </Link>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="editor-preview">
                                <div className="editor-toolbar">
                                    <span className="editor-dot"></span>
                                    <span className="editor-dot"></span>
                                    <span className="editor-dot"></span>
                                </div>
                                <EditorContent />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4">
                            <h3 className="title is-4">
                                <span className="gradient-text">Inkspace</span>
                            </h3>
                            <p>
                                A platform for reading and writing blogs about Web Technology,
                                featuring a Markdown Editor and AI-powered content generation.
                            </p>
                        </div>
                        <div className="column is-2 is-offset-1">
                            <h3 className="title is-5">Explore</h3>
                            <ul className="footer-links">
                                <li><Link legacyBehavior href="/"><a>Home</a></Link></li>
                                <li><Link legacyBehavior href="/blogs"><a>Blogs</a></Link></li>
                                <li><Link legacyBehavior href="/write"><a>Write</a></Link></li>
                                <li><Link legacyBehavior href="/about"><a>About</a></Link></li>
                            </ul>
                        </div>
                        <div className="column is-2">
                            <h3 className="title is-5">Technology</h3>
                            <ul className="footer-links">
                                <li><a href="#">Next.js</a></li>
                                <li><a href="#">Bulma</a></li>
                                <li><a href="#">SCSS</a></li>
                                <li><a href="#">Gemini AI</a></li>
                            </ul>
                        </div>
                        <div className="column is-2">
                            <h3 className="title is-5">Connect</h3>
                            <ul className="footer-links">
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">GitHub</a></li>
                                <li><a href="#">LinkedIn</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="has-text-centered">
                        <p>&copy; 2025 Inkspace. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}