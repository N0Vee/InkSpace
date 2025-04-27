"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image'

export default function FeaturedSection({ featuredBlogs }) {
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
        <section className="section" ref={sectionRef}>
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
                                    <motion.div
                                        className="card"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                                        transition={{ duration: 0.8, delay: (index += 1) * 0.1 }}
                                    >
                                        <div className="card-image">
                                            <figure className="image is-3by2">
                                                <Image
                                                    width={500}
                                                    height={500}
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="blog-thumbnail"
                                                />
                                            </figure>
                                        </div>
                                        <div className="card-content">
                                            <p className="title is-4 has-text-white">{blog.title}</p>
                                            <div className="content">
                                                <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) + '...' }} />
                                            </div>
                                            <div className="mt-4 is-flex is-justify-content-space-between is-align-items-center">
                                                <span className="tag is-info">Featured</span>
                                                <span className="is-size-7">5 min read</span>
                                            </div>
                                        </div>
                                    </motion.div>
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
    );
} 