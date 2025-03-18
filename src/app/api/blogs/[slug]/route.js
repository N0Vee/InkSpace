// app/api/blogs/[slug]/route.js
import { GET as getBlogsHandler } from '../route.js';

export async function GET(request, { params }) {
  // กำหนด allowedOrigin โดยใช้ process.env.NEXT_PUBLIC_BASE_URL หากมี, ไม่เช่นนั้นใช้ 'http://localhost:3000'
  const allowedOrigin = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // สร้าง Headers object ที่รวม CORS header และ Content-Type
  const headers = new Headers({
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    'Content-Type': 'application/json'
  });

  try {
    // ใช้ handler ดึงข้อมูล blogs
    const blogsResponse = await getBlogsHandler(request);
    const blogsData = await blogsResponse.json();

    const { slug } = params;
    // หา blog โดยเปรียบเทียบกับ filename (ลบ .md)
    const blog = blogsData.find((b) => b.filename.replace('.md', '') === slug);

    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers
      });
    }

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return new Response(JSON.stringify({ error: 'Failed to load blog' }), {
      status: 500,
      headers
    });
  }
}
