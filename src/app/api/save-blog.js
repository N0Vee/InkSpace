import fs from 'fs';
import path from 'path';

function convertEditorDataToMarkdown(data) {
  let markdown = "";
  if (!data || !data.blocks) return markdown;
  data.blocks.forEach((block) => {
    switch (block.type) {
      case 'header': {
        const level = block.data.level || 1;
        markdown += `${'#'.repeat(level)} ${block.data.text}\n\n`;
        break;
      }
      case 'paragraph': {
        markdown += `${block.data.text}\n\n`;
        break;
      }
      case 'list': {
        if (block.data.style === 'ordered') {
          block.data.items.forEach((item, index) => {
            markdown += `${index + 1}. ${item}\n`;
          });
        } else {
          block.data.items.forEach((item) => {
            markdown += `- ${item}\n`;
          });
        }
        markdown += "\n";
        break;
      }
      case 'quote': {
        markdown += `> ${block.data.text}\n`;
        if (block.data.caption) {
          markdown += `> — ${block.data.caption}\n`;
        }
        markdown += "\n";
        break;
      }
      default: {
        if (block.data && block.data.text) {
          markdown += `${block.data.text}\n\n`;
        }
      }
    }
  });
  return markdown;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { title, editorData } = req.body;
    if (!title || !editorData) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    // แปลงข้อมูล editor เป็น Markdown
    const markdownContent = convertEditorDataToMarkdown(editorData);

    // ทำให้ title ปลอดภัยสำหรับชื่อไฟล์
    const safeTitle = title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    const filename = `${safeTitle}.md`;
    
    // กำหนดเส้นทางที่จะเซฟไฟล์ใน public/blogs
    const filePath = path.join(process.cwd(), 'public', 'blogs', filename);

    // เขียนไฟล์ Markdown ลงในระบบไฟล์
    fs.writeFileSync(filePath, markdownContent, 'utf8');

    res.status(200).json({ message: 'Post saved successfully', filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving post' });
  }
}
