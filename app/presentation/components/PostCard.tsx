import { Feather, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PostEntity } from "../../domain/entities/post_entity";

interface PostCardProps {
  post: PostEntity;
}

const replaceImageDomain = (text: string) => {
  const regex =
    /https?:\/\/(?:www\.)?loremflickr\.com\/(\d+)\/(\d+)(?:\/[^\s]+)?/g;
const randomIdentifier = Math.floor(Math.random() * 9) + 1;
  const newText = text.replace(regex, (match, width, height) => {
    return `https://picsum.photos/${width}/${height}?random=${randomIdentifier}`;
  });
  return newText;
};

const replaceDomainCloudflare = (text: string) => {
  const regex = /https?:\/\/(?:www\.)?cloudflare-ipfs\.com\/ipfs\/(.+)/g;

  const newText = text.replace(regex, (match, ipfsPath) => {
    return `https://ipfs.io/ipfs/${ipfsPath}`;
  });

  return newText;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedCreatedAt = moment(post.createdAt).fromNow();

  return (
    <View style={styles.card}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: replaceDomainCloudflare(post.avatar) }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.name}</Text>
          {post.location && (
            <Text style={styles.location}>{post.location}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.optionsButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: replaceImageDomain(post.image) }}
        style={styles.postImage}
      />

      <View style={styles.interactionSection}>
        <View style={styles.iconsLeft}>
          <TouchableOpacity style={styles.iconButtonWithText}>
            <Ionicons
              name={post.liked ? "heart" : "heart-outline"}
              size={24}
              color={post.liked ? "red" : "#fff"}
            />
            <Text style={styles.iconCountText}>
              {post.likes.toLocaleString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButtonWithText}>
            <Ionicons name="chatbubble-outline" size={24} color="#fff" />
            <Text style={styles.iconCountText}>
              {post.comments.toLocaleString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Feather name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name={post.saved ? "bookmark-sharp" : "bookmark-outline"}
            size={24}
            color={post.saved ? "#c8c8c8" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.likesComments}>
        {post.comments > 0 && (
          <Text style={styles.commentsText}>
            View all {post.comments.toLocaleString()} comments
          </Text>
        )}
      </View>

      <View style={styles.postFooter}>
        <Text style={styles.footerText}>
          <Text style={styles.userNameBold}>{post.name}</Text>{" "}
          {post.description}
        </Text>
        <Text style={styles.createdAtText}>{formattedCreatedAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1C1C1C",
    marginVertical: 8,
    borderRadius: 0,
    overflow: "hidden",
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#444",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
  },
  location: {
    color: "#aaa",
    fontSize: 12,
  },
  optionsButton: {
    padding: 5,
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#333",
  },
  interactionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  iconsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 5,
    marginRight: 10,
  },

  iconButtonWithText: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginRight: 15,
  },
  iconCountText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "bold",
  },
  likesComments: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },

  commentsText: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 4,
  },
  postFooter: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footerText: {
    color: "#fff",
    marginBottom: 4,
  },
  userNameBold: {
    fontWeight: "bold",
  },
  createdAtText: {
    color: "#aaa",
    fontSize: 11,
  },
});

export default PostCard;
