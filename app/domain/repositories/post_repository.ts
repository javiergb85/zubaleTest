import { Failure } from '../../core/failures/failures';
import { Either } from '../../core/utils/either';
import { PostEntity } from '../entities/post_entity';

export interface PostRepository {
  getPosts(page: number, limit: number): Promise<Either<Failure, PostEntity[]>>;
}

export default PostRepository;