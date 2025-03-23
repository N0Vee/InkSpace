import React from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { CalendarIcon, UserIcon, TagIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import '../../styles/blog.scss';
import 'highlight.js/styles/atom-one-dark.css';
import Toc from '@/app/components/Toc';

// Function to estimate reading time based on content length
const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
};

// Custom renderer for syntax highlighting in code blocks and inline code
const setupMarked = () => {
    const renderer = new marked.Renderer();

    // Custom code block renderer updated for token-based API (Marked v5+)
    renderer.code = (token) => {
        const { text, lang } = token;
        let highlighted;

        // Use highlight.js to highlight if the language is specified and supported.
        if (lang && hljs.getLanguage(lang)) {
            highlighted = hljs.highlight(text, { language: lang }).value;
        } else {
            // Fall back to auto-highlighting if language is not specified or recognized
            highlighted = hljs.highlightAuto(text).value;
        }

        return `<pre class="hljs language-${lang || 'text'}" data-language="${lang || 'text'}">
  <code>${highlighted}</code>
</pre>`;
    };

    renderer.codespan = (code) => {
        return `<code class="inline-code">${code}</code>`;
    };

    marked.setOptions({
        renderer,
        gfm: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        xhtml: true
    });

    return marked;
};

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const markedInstance = setupMarked();

    try {
       
        const apiUrl = new URL(`/api/blogs/${slug}`, process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000').toString();

        
        const response = await fetch(apiUrl, {
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch blog: ${response.status}`);
        }

        const blog = await response.json();

        // Use markedInstance.parse to convert markdown content to HTML
        const contentHtml = markedInstance.parse(blog.content);
        const readingTime = calculateReadingTime(blog.content);

        // Get related posts
        const relatedPosts = blog.relatedPosts || [];

        return (
            <>

                <div className="blog-layout">
                    <Toc />

                    <article className="blog-post-container">

                        {/* Blog Header */}
                        <header className="blog-header">
                            <div className="blog-meta">
                                {blog.category && (
                                    <span className="blog-category">
                                        <TagIcon className="icon" />
                                        {blog.category}
                                    </span>
                                )}
                                <span className="blog-date">
                                    <CalendarIcon className="icon" />
                                    {blog.date || 'Unknown date'}
                                </span>
                                <span className="blog-reading-time">
                                    <ClockIcon className="icon" />
                                    {readingTime} min read
                                </span>
                            </div>

                            <h1 className="blog-title gradient-text">{blog.title}</h1>

                            {blog.subtitle && (
                                <p className="blog-subtitle">{blog.subtitle}</p>
                            )}

                            {blog.author && (
                                <div className="blog-author">
                                    {blog.authorAvatar ? (
                                        <img
                                            src={blog.authorAvatar}
                                            alt={`${blog.author} avatar`}
                                            className="author-avatar"
                                        />
                                    ) : (
                                        <div className="author-avatar-placeholder">
                                            <UserIcon className="icon" />
                                        </div>
                                    )}
                                    <span>By {blog.author}</span>
                                </div>
                            )}
                        </header>

                        {/* Featured Image */}
                        {blog.featuredImage && (
                            <div className="featured-image-container">
                                <img
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                    className="featured-image"
                                />
                            </div>
                        )}

                        {/* Blog Content */}
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="blog-tags">
                                <TagIcon className="icon" />
                                {blog.tags.map((tag, index) => (
                                    <a href={`/blog/tag/${tag}`} key={index} className="blog-tag">
                                        {tag}
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Author Info */}
                        {blog.author && (
                            <div className="author-info">
                                <div className="author-avatar-container">
                                    {blog.authorAvatar ? (
                                        <img
                                            src={blog.authorAvatar}
                                            alt={`${blog.author} avatar`}
                                            className="author-avatar-large"
                                        />
                                    ) : (
                                        <div className="author-avatar-placeholder-large">
                                            <UserIcon className="icon" />
                                        </div>
                                    )}
                                </div>
                                <div className="author-details">
                                    <h4>{blog.author}</h4>
                                    {blog.authorBio && <p>{blog.authorBio}</p>}
                                </div>
                            </div>
                        )}
                
                    </article>
                </div>
            </>

        );
    } catch (error) {
        console.error("Error in BlogPost component:", error);

        // Return error state
        return (
            <div className="not-found-container">
                <h1 className="gradient-text">Blog post not found</h1>
                <p>Sorry, the blog post you're looking for doesn't exist or has been moved.</p>
                <a href="/blog" className="back-link">
                    <ChevronLeftIcon className="icon" />
                    Back to all posts
                </a>
            </div>
        );
    }
}