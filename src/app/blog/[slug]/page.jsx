import { getBlogBySlug } from '../../lib/blogs';
import React from 'react';
import { marked } from 'marked';

export default async function BlogPost({ params }) {
  const { slug } = await params;

 
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return <div>Blog post not found</div>;
  }


  const contentHtml = marked(blog.content);

  return (
    <div className="blog-post-container">
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
