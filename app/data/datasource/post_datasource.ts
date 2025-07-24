import axios, { AxiosError } from 'axios'; // Import Axios and AxiosError for type checking
import { NetworkFailure, ServerFailure } from '../../core/failures/failures';
import { Either, left, right } from '../../core/utils/either';
import { PostEntity } from '../../domain/entities/post_entity';

export interface PostDataSource {
  getPosts(page: number, limit: number): Promise<Either<ServerFailure | NetworkFailure, PostEntity[]>>;
}

export class PostDataSourceImpl implements PostDataSource {
  private readonly BASE_URL = 'https://662029f13bf790e070af2cd8.mockapi.io/api/v1';

  async getPosts(page: number, limit: number): Promise<Either<ServerFailure | NetworkFailure, PostEntity[]>> {
    try {
        const response = await axios.get<PostEntity[]>(`${this.BASE_URL}/posts`, {
           params: {
          page: page,
          limit: limit,
        },
      });

        const data: PostEntity[] = response.data;
      return right(data);
    } catch (error: any) {
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError; 

    
        if (axiosError.code === 'ERR_NETWORK') {
          return left(new NetworkFailure());
        }

  
        if (axiosError.response) {
          
          const status = axiosError.response.status;
          const statusText = axiosError.response.statusText || 'Unknown Error';
          const errorMessage = axiosError.response.data
            ? (axiosError.response.data as any).message || JSON.stringify(axiosError.response.data)
            : statusText;

          return left(new ServerFailure(`Error ${status}: ${errorMessage}`, status));
        } else if (axiosError.request) {
               return left(new NetworkFailure()); 
        } else {
             return left(new ServerFailure(`Error al configurar la petición: ${axiosError.message}`));
        }
      }
        return left(new ServerFailure(`Error inesperado: ${error.message || 'Error desconocido'}`));
    }
  }
}

export default PostDataSourceImpl;