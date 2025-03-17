'use client'

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import BlogCard from './components/BlogCard';
import FeaturedPost from './components/FeaturedPost';
import './styles/home.scss';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('latest');
  

  const handleFilterChange = (e) => {
    setActiveFilter(e.target.value);
    // In a real app, you would fetch filtered content here
  };

  return (
    <div className="inkspace-container">
      <Head>
        <title>InkSpace | Web Technology Blog Platform</title>
        <meta name="description" content="Read and write blogs about Web Technology with Markdown support and AI-powered content generation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="title">
              <span className="title-icon">✍️</span> InkSpace
            </h1>
            <p className="subtitle">
              Explore the latest in web technology through thoughtful, <br className="hide-mobile" />
              expert-crafted articles and community insights
            </p>
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search articles, topics, or authors..." 
                className="search-input"
              />
              <button className="search-button">
                <span className="icon">🔍</span>
              </button>
            </div>
          </div>
          <div className="hero-decoration">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
        </section>

        {loading ? (
          <div className="loading">
            <div className="loading-icon">⟳</div>
            <p>Curating the best content for you...</p>
          </div>
        ) : (
          <>
            {featured && (
              <section className="featured-section">
                <div className="section-header">
                  <h2 className="section-title">Featured Post</h2>
                  <div className="section-line"></div>
                </div>
                <FeaturedPost post={featured} />
              </section>
            )}

            <section className="blogs-section">
              <div className="blogs-header">
                <div className="section-header">
                  <h2 className="section-title">Latest Blogs</h2>
                  <div className="section-line"></div>
                </div>
                <div className="filter-container">
                  <select 
                    className="filter-select"
                    value={activeFilter}
                    onChange={handleFilterChange}
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                    <option value="trending">Trending</option>
                  </select>
                </div>
              </div>
              
              <div className="blogs-grid">
                {blogs.map(blog => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
              
              <div className="topics-container">
                <div className="section-header">
                  <h3 className="section-subtitle">Popular Topics</h3>
                </div>
                <div className="topics-grid">
                  {['React', 'Next.js', 'CSS', 'JavaScript', 'TypeScript', 'API', 'Performance'].map(topic => (
                    <Link legacyBehavior href={`/topic/${topic.toLowerCase()}`} key={topic}>
                      <a className="topic-tag">{topic}</a>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pagination">
                <button className="pagination-button active">1</button>
                <button className="pagination-button">2</button>
                <button className="pagination-button">3</button>
                <button className="pagination-button next">
                  Next <span className="arrow">→</span>
                </button>
              </div>
            </section>
          </>
        )}
        
        <div className="newsletter-section">
          <div className="newsletter-content">
            <div className="newsletter-icon">✉️</div>
            <h3>Stay in the loop</h3>
            <p>Get the latest web development insights delivered to your inbox</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
      </main>

      <div className="cta-container">
        <div className="cta-content">
          <h2>Start Writing Today</h2>
          <p>Share your web technology insights with our growing community of developers and designers</p>
          <div className="cta-buttons">
            <Link legacyBehavior href="/new-blog">
              <a className="cta-button primary">Create New Post</a>
            </Link>
            <Link legacyBehavior href="/how-it-works">
              <a className="cta-button secondary">How It Works</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}