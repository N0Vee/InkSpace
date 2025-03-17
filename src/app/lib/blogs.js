import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// Function to extract the first image from markdown content
const extractImage = (content) => {
  const match = content.match(/!\[.*?\]\((.*?)\)/);
  return match ? match[1] : null;
};

// Get all markdown blogs (only server-side)
export function getBlogs() {
  const blogsDirectory = path.join(process.cwd(), 'public', 'blogs');
  const filenames = fs.readdirSync(blogsDirectory);

  return filenames
    .filter((filename) => {
      const filePath = path.join(blogsDirectory, filename);
      return fs.statSync(filePath).isFile(); // ✅ ตรวจสอบว่าเป็นไฟล์
    })
    .map((filename) => {
      const filePath = path.join(blogsDirectory, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const htmlContent = marked(fileContent);
      const title = filename.replace('.md', '').replace('-', ' ');
      const image = extractImage(fileContent) || "blogs/images/default-image.jpg"; // Default image

      return {
        title,
        content: htmlContent,
        filename,
        image
      };
    });
}

// Get a specific blog by slug
export function getBlogBySlug(slug) {
  return getBlogs().find((blog) => blog.filename.replace('.md', '') === slug);
}

// Export a function to get data on server-side
export async function getServerSideProps() {
  const blogs = getBlogs();
  return { props: { blogs } };
}
