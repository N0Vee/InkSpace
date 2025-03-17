"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import '../styles/newBlog.scss';


const Editor = dynamic(() => import('../components/Editor'), { ssr: false });

const NewBlog = () => {
    const [title, setTitle] = useState('');
    const [editorData, setEditorData] = useState(null);

    // รับข้อมูลจาก Editor.js
    const handleSave = (data) => {
        setEditorData(data);
    };

    // ส่งข้อมูลไปยัง API เพื่อเซฟไฟล์ Markdown ใน public/blogs/
    const handleSubmit = async () => {
        if (!title || !editorData) {
            alert('กรุณากรอก title และเนื้อหาก่อน');
            return;
        }

        try {
            const response = await fetch('/api/save-blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, editorData }),
            });

            const result = await response.json();
            console.log(result.message);
            if (response.ok) {
                alert('บันทึกไฟล์ Markdown สำเร็จ');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกโพสต์');
        }
    };

    return (
        <div className="container">
            <h1 className="title">สร้าง Blog Post ใหม่</h1>
            <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
            />

            <div className="editorContainer">
                <Editor onSave={handleSave} />
            </div>

            <button onClick={handleSubmit} className="button">
                บันทึกเป็น Markdown
            </button>
        </div>
    );
};

export default NewBlog;
