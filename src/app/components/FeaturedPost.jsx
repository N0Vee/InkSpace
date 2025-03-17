// components/FeaturedPost.js
import Link from 'next/link';
import Image from 'next/image';
import '../styles/blogCard_FeaturedPost.scss';

const FeaturedPost = ({ post }) => {
  
  return (
    <div className="featured-post">
      <div className="featured-post-content">
        <div className="featured-tags">
          {tags.map((tag, index) => (
            <span key={index} className="featured-tag">{tag}</span>
          ))}
        </div>
        
        <Link href={`/blog/${id}`}>
          <h2 className="featured-title">{title}</h2>
        </Link>
        
        <p className="featured-excerpt">{excerpt}</p>
        
        <div className="featured-meta">
          <div className="featured-author">{author}</div>
          <div className="featured-details">
            <span className="featured-date">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span className="dot">•</span>
            <span className="featured-readtime">{readTime}</span>
          </div>
        </div>
        
        <Link href={`/blog/${id}`}>
          <button className="featured-button">Read More</button>
        </Link>
      </div>
      
      <div className="featured-post-image">
        <Image 
          src={coverImage || '/images/placeholder.jpg'} 
          alt={title}
          width={600}
          height={400}
          layout="responsive"
          className="featured-image"
          unoptimized={true} 
        />
      </div>
    </div>
  );
};

export default FeaturedPost;