export interface PostEntity {
  id: string;
  createdAt: string; 
  name: string;
  avatar: string;
  description: string;
  likes: number;
  image: string;
  comments: number;
  liked: boolean;
  saved: boolean;
  location: string;
}

export default PostEntity;