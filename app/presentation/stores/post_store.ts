import { create } from 'zustand';
import { Failure } from '../../core/failures/failures';
import { fold } from '../../core/utils/either';
import { PostEntity } from '../../domain/entities/post_entity';
import { GetPostsUseCase } from '../../domain/use_cases/get_post_use_case';

interface PostState {
  posts: PostEntity[];
  loading: boolean;
  loadingMore: boolean;
  error: Failure | null;
  page: number;
  hasMore: boolean;
  
 
  fetchPosts: (useCase: GetPostsUseCase, reset?: boolean) => Promise<void>;
  resetPosts: () => void;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  loading: false,
  loadingMore: false,
  error: null,
  page: 1, 
  hasMore: true,

  resetPosts: () => {
    set({
      posts: [],
      loading: false,
      loadingMore: false,
      error: null,
      page: 1,
      hasMore: true,
    });
  },

  fetchPosts: async (useCase: GetPostsUseCase, reset: boolean = false) => {
    const state = get();
    const limit = 10; 

    if (!reset && (state.loading || state.loadingMore || !state.hasMore)) {
      return; 
    }

   
    if (reset) {
      set({ loading: true, error: null, hasMore: true, page: 1, posts: [] });
    } else {
      set({ loadingMore: true });
    }

    try {
     
      const result = await useCase.execute(reset ? 1 : state.page, limit);

      fold(
        result,
        (failure) => {
          set({ error: failure, hasMore: false });
        },
        (data) => {
          set((state) => ({
            posts: reset ? data : [...state.posts, ...data],
            page: state.page + 1,
            hasMore: data.length === limit, 
            error: null,
          }));
        }
      );
    } catch (err: any) {
      set({
        error: new Failure(`Error inesperado al cargar posts: ${err.message}`),
        hasMore: false,
      });
    } finally {
      set({ loading: false, loadingMore: false });
    }
  },
}));


export default usePostStore