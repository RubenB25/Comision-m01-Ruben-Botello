import React, { useState, useEffect } from 'react'
import PostItem from "../components/PostItem";
import "../styles/InfiniteScroll.module.css"
import Card from 'react-bootstrap/Card';
import { API_URL } from "../utils/consts";
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../styles/InfiniteScroll.module.css';
const InfiniteScrollC = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const getPosts = (page) => {
    const uri = `${API_URL}/post/all`;
  
    fetch(uri)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPosts((prevPosts) => [...prevPosts, ...data]);

        if (data.length < postsPerPage) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const fetchMoreData = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      getPosts(newPage);
      return newPage;
    });
  };

  useEffect(() => {
    getPosts(page);
  }, [page]);

  return (
    <div className={styles.infiniteScrollContainer}>
      <p className={styles.isTitle}>Publicaciones Recientes</p>
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {posts.map((post) => (
        <PostItem
          key={post._id}
          postId={post._id}
          title={post.title}
          url={post.url}
          content={post.content}
          username={post.author.username}
          avatar={post.author.avatar}
          comments={post.comments}
        />
      ))}
    </InfiniteScroll>
  </div>
  );
};

export default InfiniteScrollC;