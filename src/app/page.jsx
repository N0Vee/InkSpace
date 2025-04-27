'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroSection from './components/HeroSection';
import FeaturedSection from './components/FeaturedSection';
import BlogSection from './components/BlogSection';
import EditorContent from './lib/EditorContent';
import Loading from './components/Loading'
import './styles/home.scss';

export default function Home() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch('/api/blogs');
                if (!res.ok) {
                    throw new Error('Failed to fetch blogs');
                }
                const data = await res.json();
                setBlogs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="error-container">
            <div className="container has-text-centered py-6">
                <h2 className="title is-3 has-text-danger">Oops!</h2>
                <p className="subtitle">{error}</p>
                <button className="button is-primary mt-4" onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        </div>;
    }

    const shuffledBlogs = blogs.sort(() => 0.5 - Math.random());
    const featuredBlogs = shuffledBlogs.slice(0, 3); // Get the first 3 blogs as featured

    return (
        <div className="inkspace-layout">
            {/* Hero Section */}
            <HeroSection />

            {/* Featured Blogs Section */}
            <FeaturedSection featuredBlogs={featuredBlogs} />

            {/* All Blogs Section */}
            <BlogSection blogs={blogs} />

            {/* Write New Section */}
            <section className="section">
                <div className="container">
                    <div className="columns is-vcentered">
                        <div className="column is-6">
                            <h2 className="title">
                                Start <span className="gradient-text">Reading</span> Today
                            </h2>
                            <p className="subtitle">
                                Discover the best Web Technology content in our community
                            </p>
                            <div className="content">
                                <p>
                                    Reading blogs on Inkspace helps you:
                                </p>
                                <ul className="benefits-list">
                                    <li>Stay updated with the latest <strong className='gradient-text'>Web Technology</strong> trends 🔍</li>
                                    <li>Learn new techniques and insights from industry experts 🧠</li>
                                    <li>Discover tools and frameworks to boost your development workflow 🛠️</li>
                                    <li>Understand complex technologies through clear and easy-to-read articles 📚</li>
                                </ul>
                                <Link legacyBehavior href="/blogs">
                                    <a className="button is-primary is-medium mt-4">Start Reading</a>
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
                            <p className='has-text-weight-bold'>
                                A platform for reading blogs about Web Technology.
                            </p>
                        </div>
                        <div className="column is-2 is-offset-1">
                            <h3 className="title is-5 has-text-dark">Explore</h3>
                            <ul className="footer-links">
                                <li><Link legacyBehavior href="/"><a>Home</a></Link></li>
                                <li><Link legacyBehavior href="/blogs"><a>Blogs</a></Link></li>
                            </ul>
                        </div>
                        <div className="column is-2">
                            <h3 className="title is-5 has-text-dark">Technology</h3>
                            <ul className="footer-links">
                                <li><a href="#">Next.js</a></li>
                                <li><a href="#">Bulma</a></li>
                                <li><a href="#">SCSS</a></li>
                            </ul>
                        </div>
                        <div className="column is-2">
                            <h3 className="title is-5 has-text-dark">Connect</h3>
                            <ul className="footer-links">
                                <li><a href="https://github.com/N0Vee/InkSpace">GitHub</a></li>
                                <li><a href="mailto:wanichanon.work@gmail.com">Contact</a></li>
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
