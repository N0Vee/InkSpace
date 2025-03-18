// app/api/blogs/[slug]/route.js
import { GET as getBlogsHandler } from '../route.js';

export async function GET(request, { params }) {
  try {
    // Use the handler to get blogs data
    const blogsResponse = await getBlogsHandler(request);
    const blogsData = await blogsResponse.json();
    
    const { slug } = params;
    const blog = blogsData.find((b) => b.filename.replace('.md', '') === slug);
    
    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response(JSON.stringify({ error: "Failed to load blog" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}