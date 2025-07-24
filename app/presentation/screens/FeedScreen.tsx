import React, { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PostCard from '../components/PostCard';
import { usePostStore } from '../stores/post_store';

import { Ionicons } from '@expo/vector-icons';
import { PostDataSourceImpl } from '../../data/datasource/post_datasource';
import { PostRepositoryImpl } from '../../data/repositories/post_repository.impl';
import { GetPostsUseCase } from '../../domain/use_cases/get_post_use_case';


const postRemoteDataSource = new PostDataSourceImpl();
const postRepository = new PostRepositoryImpl(postRemoteDataSource);
const getPostsUseCase = new GetPostsUseCase(postRepository);


const FeedScreen: React.FC = () => {
  const { posts, loading, loadingMore, error, hasMore, fetchPosts, resetPosts } = usePostStore();


  const handleInitialLoadOrRefresh = useCallback(() => {
    resetPosts(); 
    fetchPosts(getPostsUseCase, true); 
  }, [fetchPosts, resetPosts]);


  const handleLoadMore = useCallback(() => {
    if (!loading && !loadingMore && hasMore) {
      fetchPosts(getPostsUseCase); 
    }
  }, [loading, loadingMore, hasMore, fetchPosts]);

  useEffect(() => {

    if (posts.length === 0 && !loading && !loadingMore && !error) {
      handleInitialLoadOrRefresh();
    }
  }, [posts.length, loading, loadingMore, error, handleInitialLoadOrRefresh]);

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  };

  const renderEmptyList = () => {
    if (!loading && !error && posts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay posts disponibles.</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleInitialLoadOrRefresh}>
            <Text style={styles.retryButtonText}>Cargar de nuevo</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };


  if (loading && posts.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Cargando feed...</Text>
      </View>
    );
  }


  if (error && posts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        <Button title="Retry" onPress={handleInitialLoadOrRefresh} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
  
      <View style={styles.appHeader}>

      <View style={styles.appHeaderLeft}>
        <Image
          source={{ uri: 'https://www.zubalero.com/cl/wp-content/uploads/2024/02/zubale-logo-2024.png' }}
          style={styles.logo}
          resizeMode="contain" 
        />
      </View>


      <TouchableOpacity style={styles.appHeaderRight}>
       
        <Ionicons name="notifications-outline" size={28} color="#fff" />
       
      </TouchableOpacity>
    </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={loading} 
            onRefresh={handleInitialLoadOrRefresh} 
            tintColor="#fff" 
          />
        }
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
 appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 15,
    paddingVertical: 10,  
    backgroundColor: '#1C1C1C', 
    borderBottomWidth: 0.5,    
    borderBottomColor: '#333', 
    height: 60, 
  },
  appHeaderLeft: {
    flexDirection: 'row', 
    alignItems: 'center',

  },
  logo: {
    width: 110, 
    height: 40,

  },
  appHeaderRight: {
    padding: 5, 
  },
  appHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#444'
  },
  appHeaderName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatList: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200, 
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FeedScreen;