"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogSection({ blogs }) {

    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    let [index, setIndex] = useState(1);

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
        <section className="section has-background-light" ref={sectionRef}>
            <div className="container">
                <h2 className="title has-text-centered">
                    <span className="has-text-black">All </span><span className="gradient-text">Blogs</span>
                </h2>
                <p className="subtitle has-text-centered mb-6">
                    Explore all articles on web technology
                </p>

                <div className="columns is-multiline">
                    {blogs.map((blog) => (
                        <motion.div key={blog.filename} className="column is-one-third-desktop is-half-tablet"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                            transition={{ duration: 0.5 , delay : (index += 1) * 0.1 }}
                        >
                            <Link legacyBehavior href={`/blog/${blog.filename.replace('.md', '')}`}>
                                <a className="blog-card">
                                    <div className="card">
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
                        </motion.div>
                    ))}
                </div>

                <div className="has-text-centered mt-6">
                    <Link legacyBehavior href="/blogs">
                        <a className="button is-link">View All Blogs</a>
                    </Link>
                </div>
            </div>
        </section>
    );
}