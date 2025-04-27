"use client"

import dynamic from 'next/dynamic';
import React from 'react';

const Typewriter = dynamic(() => import('react-typewriter-effect'), { ssr: false });

const HighlightText = ({ text }) => {
  return text.split('InkSpace').map((part, index, array) => (
    <React.Fragment key={index}>
      {part}
      {index !== array.length - 1 && <span className="gradient-text">InkSpace</span>}
    </React.Fragment>
  ));
};

const BlogComponent = () => {
  return (
    <div className="editor-content">
      <h3># Read Web Technology Blogs</h3>
      <p>Discover new ideas and knowledge here...</p>
      <pre>
        <code>
          <Typewriter
            textStyle={{
              fontFamily: 'monospace',
              fontSize: '16px',
              color: '#000',
            }}
            startDelay={500}
            cursorColor="black"
            multiText={[
              "console.log('InkSpace');",
              "print('InkSpace')",
              "std::cout << \"InkSpace\";",
              "echo \"InkSpace\"",
              "printf(\"InkSpace\");",
              "document.write('InkSpace');",
              "System.out.println(\"InkSpace\");",
              "puts(\"InkSpace\");",
              "print(\"InkSpace\")",
              "echo \"InkSpace\" > /dev/console",
              "alert(\"InkSpace\");",
              "printf \"InkSpace\"",
              "Write-Host \"InkSpace\"",
              "echo 'InkSpace'"
            ]}
            multiTextDelay={1500}
            typeSpeed={100}
            cursor={true}
            renderText={(text) => <HighlightText text={text} />}
          />
        </code>
      </pre>
    </div>
  );
};

export default BlogComponent;
