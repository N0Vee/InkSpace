'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown to render Markdown

import '../styles/blogCard_FeaturedPost.scss';

const BlogCard = ({ blog }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const { id, coverImage, title, tags, excerpt, author, date, readTime, content } = blog; // Destructure blog properties

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <motion.div
            className="blog-card"
            ref={sectionRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.6, delay: id * 0.1 }}
        >
            <div className="blog-card-image">
                <Link href={`/blog/${id}`}>
                    <Image
                        src={coverImage || '/images/placeholder.jpg'}
                        alt={title}
                        width={400}
                        height={400}
                        className="cover-image"
                        unoptimized={true}
                    />
                </Link>
            </div>

            <div className="blog-card-content">
                <div className="blog-tags">
                    {tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="blog-tag">{tag}</span>
                    ))}
                </div>

                <Link href={`/blog/${id}`}>
                    <h3 className="blog-title">{title}</h3>
                </Link>

                <p className="blog-excerpt">{excerpt}</p>

                <div className="blog-meta">
                    <div className="blog-author">{author}</div>
                    <div className="blog-details">
                        <span className="blog-date">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="dot">•</span>
                        <span className="blog-readtime">{readTime}</span>
                    </div>
                </div>

                {/* Render the Markdown content */}
                <div className="blog-markdown-content">
                    <ReactMarkdown>{content}</ReactMarkdown> {/* Display Markdown content */}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCard;
