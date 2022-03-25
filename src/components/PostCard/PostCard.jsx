import { Link } from 'react-router-dom'

const PostCard = ({post}) => {
  return (  
    <div className="card">
      <div className="card-body">
        <h2 className="card-text">{post.title}</h2>
        <p className="card-text">{post.story}</p>
        <img 
            src={post.postPhoto } 
            alt="pic"
            className="card-post-photo"
    />
      </div>
    </div>  

  );
}

export default PostCard;