import { Failure } from '../../core/failures/failures';
import { Either } from '../../core/utils/either';
import { PostEntity } from '../entities/post_entity';
import { PostRepository } from '../repositories/post_repository';

export class GetPostsUseCase {
  constructor(private repository: PostRepository) {}

  async execute(page: number, limit: number): Promise<Either<Failure, PostEntity[]>> {
    return this.repository.getPosts(page, limit);
  }
}

export default GetPostsUseCase;