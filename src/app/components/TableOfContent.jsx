"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import '../styles/sidebar.scss';

const TableOfContent = () => {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const slug = segments[segments.length - 1] || null;
    const [headings, setHeadings] = useState([]);
    const [error, setError] = useState(null);
    const [activeHeading, setActiveHeading] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Fetch blog content and extract headings
    useEffect(() => {
        if (!slug) return;

        const apiUrl = new URL(
            `/api/blogs/${slug}`,
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        ).toString();

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((blog) => {
                if (blog.content) {
                    console.log("Fetched Blog:", blog);
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = blog.content;
                    const extractedHeadings = [];
                    tempDiv.querySelectorAll("h2, h3").forEach((heading, index) => {
                        const level = heading.tagName === "H2" ? 2 : 3;
                        const text = heading.innerText.trim();
                        const headingSlug = text
                            .toLowerCase()
                            .replace(/[^a-z0-9\s]/g, "")
                            .replace(/\s+/g, "-");
                        extractedHeadings.push({ level, text, slug: headingSlug });
                    });
                    setHeadings(extractedHeadings);
                }
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [slug]);

    // Add IDs to headings in the document
    useEffect(() => {
        setTimeout(() => {
            headings.forEach((heading) => {
                const elements = document.querySelectorAll(`h2, h3`);
                elements.forEach((el) => {
                    if (el.innerText.trim() === heading.text) {
                        el.id = heading.slug;
                    }
                });
            });
        }, 500);
    }, [headings]);

    // Track active heading based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (headings.length === 0) return;
            
            const scrollPosition = window.scrollY + 100;
            
            // Find all heading elements with their positions
            const headingPositions = headings.map(heading => ({
                id: heading.slug,
                position: document.getElementById(heading.slug)?.getBoundingClientRect().top + window.scrollY || 0
            }));
            
            // Sort by position
            headingPositions.sort((a, b) => a.position - b.position);
            
            // Find the current active heading
            let currentActive = headingPositions[0]?.id;
            
            for (const heading of headingPositions) {
                if (scrollPosition >= heading.position) {
                    currentActive = heading.id;
                } else {
                    break;
                }
            }
            
            if (currentActive !== activeHeading) {
                setActiveHeading(currentActive);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [headings, activeHeading]);

    // Handle smooth scrolling
    const handleClick = (event, id) => {
        event.preventDefault();
        const targetElement = document.getElementById(id);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            setActiveHeading(id);
        }
    };

    // Toggle sidebar collapse
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    if (error) {
        return <div className="toc-error">Error: {error}</div>;
    }

    return (
        <aside className={`table-of-contents ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="toc-header">
                <h3 className="toc-title">Contents</h3>
                <button 
                    className="collapse-btn" 
                    onClick={toggleCollapse}
                    aria-label={isCollapsed ? "Expand contents" : "Collapse contents"}
                >
                    {isCollapsed ? '＋' : '－'}
                </button>
            </div>
            
            {!isCollapsed && (
                headings.length === 0 ? (
                    <p className="no-headings">No headings found</p>
                ) : (
                    <>
                        <ul className="toc-list">
                            {headings.map((heading, index) => (
                                <li
                                    key={index}
                                    className={`toc-item ${activeHeading === heading.slug ? 'active' : ''}`}
                                    style={{ marginLeft: `${(heading.level - 2) * 16}px` }}
                                >
                                    <a
                                        href={`#${heading.slug}`}
                                        className="toc-link"
                                        onClick={(e) => handleClick(e, heading.slug)}
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="toc-footer">
                            <button 
                                className="back-to-top"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                Back to top
                            </button>
                        </div>
                    </>
                )
            )}
        </aside>
    );
};

export default TableOfContent;