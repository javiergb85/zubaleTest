import { Failure } from '../../core/failures/failures';
import { Either } from '../../core/utils/either';
import { PostEntity } from '../../domain/entities/post_entity';
import { PostRepository } from '../../domain/repositories/post_repository';
import { PostDataSource } from '../datasource/post_datasource';

export class PostRepositoryImpl implements PostRepository {
  constructor(private remoteDataSource: PostDataSource) {}

  async getPosts(page: number, limit: number): Promise<Either<Failure, PostEntity[]>> {

    const result = await this.remoteDataSource.getPosts(page, limit);
    
    
    return result; 
  }
}

export default PostRepositoryImpl;