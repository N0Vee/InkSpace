import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const extractImage = (content) => {
  const match = content.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : null;
};

// Get all blogs
function getBlogs() {
  const blogsDirectory = path.join(process.cwd(), 'public', 'blogs');
  const filenames = fs.readdirSync(blogsDirectory);

  return filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(blogsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      return {
        title: filename.replace('.md', '').replace('-', ' '),
        content: marked(fileContent),
        filename,
        image: extractImage(fileContent) || "/blogs/images/default-image.jpg",
      };
    });
}

// API Route for GET /api/blogs
export async function GET() {
  try {
    const blogs = getBlogs();
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to load blogs" }), { status: 500 });
  }
}
