'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import Loading from '../components/Loading'
import '../styles/home.scss';
import '../styles/blogs.scss';

export default function Page() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', () => {
            const navbar = document.querySelector('.navbar');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('is-scrolled');
                } else {
                    navbar.classList.remove('is-scrolled');
                }
            });

            // Mobile menu toggle
            const burger = document.querySelector('.navbar-burger');
            const menu = document.querySelector('#navMenu');

            burger.addEventListener('click', () => {
                burger.classList.toggle('is-active');
                menu.classList.toggle('is-active');
            });
        });
    }, [])



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
        return <Loading title={"Blogs"} />;
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
    return (
        <>

            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <a href="/" className="navbar-item">
                            <span className="logo">Ink<span className="accent">Space</span></span>
                        </a>
                        <div className="navbar-burger" data-target="navMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                    <div id="navMenu" className="navbar-menu">
                        <div className="navbar-start">
                            
                        </div>

                        <div className="navbar-center">
                            <a href="/" className="navbar-item">
                                Home
                            </a>
                            <a href="/write" className="navbar-item highlight">
                                <span className="icon">
                                    <i className="fas fa-pen"></i>
                                </span>
                                <span>Start Writing</span>
                            </a>
                        </div>

                        <div className="navbar-end">
                            
                        </div>
                    </div>
                </div>
            </nav>

            <section className="section has-background-light">
                <div className="container">
                    <h2 className="title has-text-centered">
                        <span className="has-text-black">All </span><span className="gradient-text">Blogs</span>
                    </h2>
                    <p className="subtitle has-text-centered mb-6">
                        Explore all articles on web technology
                    </p>

                    <div className="columns is-multiline">
                        {blogs.map((blog) => (
                            <div key={blog.filename} className="column is-one-third-desktop is-half-tablet" >
                                <Link legacyBehavior href={`/blog/${blog.filename.replace('.md', '')}`}>
                                    <a className="blog-card">
                                        <div className="card">
                                            <div className="card-image">
                                                <figure className="image is-3by2">
                                                    <img src={blog.image} alt={blog.title} className="blog-thumbnail" />
                                                </figure>
                                            </div>
                                            <div className="card-content">
                                                <p className="title is-4 has-text-white">{blog.title}</p>
                                                <div className="content">
                                                    <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 120) + '...' }} />
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
                </div>
            </section>
        </>

    );
}