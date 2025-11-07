import React, { useState, useEffect } from 'react';

const BlogApp = () => {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  // Load posts 
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    setPosts(savedPosts);
  }, []);

  // Save posts 
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }
      
      input:focus, textarea:focus {
        border-color: #3498db !important;
      }
      
      @media (max-width: 768px) {
        .header {
          padding: 1rem !important;
          flex-direction: column !important;
          gap: 1rem !important;
          text-align: center !important;
        }
        
        .nav {
          justify-content: center !important;
          flex-wrap: wrap !important;
        }
        
        .main {
          padding: 1rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, title: formData.title, content: formData.content, updatedAt: new Date().toLocaleString() }
          : post
      ));
      setEditingPost(null);
    } else {
      // Add new post
      const newPost = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      };
      setPosts([newPost, ...posts]);
    }

    setFormData({ title: '', content: '' });
    setCurrentView('posts');
  };

  const deletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content });
    setCurrentView('create');
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setFormData({ title: '', content: '' });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    logo: {
      margin: 0,
      fontSize: '1.8rem',
    },
    nav: {
      display: 'flex',
      gap: '1rem',
    },
    navButton: {
      background: 'none',
      border: '2px solid transparent',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeNav: {
      backgroundColor: '#34495e',
      borderColor: '#3498db',
    },
    main: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    dashboard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      margin: '2rem 0',
    },
    statCard: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: '0.5rem 0 0 0',
    },
    recentSection: {
      marginTop: '2rem',
    },
    recentPost: {
      borderBottom: '1px solid #eee',
      padding: '1rem 0',
    },
    recentTitle: {
      margin: '0 0 0.5rem 0',
      color: '#2c3e50',
    },
    recentDate: {
      margin: 0,
      color: '#7f8c8d',
      fontSize: '0.9rem',
    },
    createSection: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    input: {
      padding: '1rem',
      border: '2px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    textarea: {
      padding: '1rem',
      border: '2px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      outline: 'none',
      resize: 'vertical',
      fontFamily: 'Arial, sans-serif',
      transition: 'border-color 0.3s ease',
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
    },
    submitButton: {
      backgroundColor: '#27ae60',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
    },
    cancelButton: {
      backgroundColor: '#95a5a6',
      color: 'white',
      border: 'none',
      padding: '1rem 2rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    postsSection: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: '#7f8c8d',
    },
    emptyMessage: {
      color: '#7f8c8d',
      fontStyle: 'italic',
      textAlign: 'center',
      padding: '2rem',
    },
    postsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    },
    postCard: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1.5rem',
      backgroundColor: '#fafafa',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    postTitle: {
      margin: '0 0 1rem 0',
      color: '#2c3e50',
      fontSize: '1.3rem',
    },
    postContent: {
      margin: '0 0 1rem 0',
      lineHeight: '1.6',
      color: '#555',
    },
    postMeta: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      marginBottom: '1rem',
      color: '#7f8c8d',
      fontSize: '0.85rem',
    },
    postActions: {
      display: 'flex',
      gap: '0.5rem',
    },
    editButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
    deleteButton: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header} className="header">
        <h1 style={styles.logo}>My Blog</h1>
        <nav style={styles.nav} className="nav">
          <button 
            style={{...styles.navButton, ...(currentView === 'dashboard' ? styles.activeNav : {})}}
            onClick={() => setCurrentView('dashboard')}
          >
            Dashboard
          </button>
          <button 
            style={{...styles.navButton, ...(currentView === 'posts' ? styles.activeNav : {})}}
            onClick={() => setCurrentView('posts')}
          >
            All Posts
          </button>
          <button 
            style={{...styles.navButton, ...(currentView === 'create' ? styles.activeNav : {})}}
            onClick={() => {
              setCurrentView('create');
              setEditingPost(null);
              setFormData({ title: '', content: '' });
            }}
          >
            New Post
          </button>
        </nav>
      </header>

      <main style={styles.main} className="main">
        {currentView === 'dashboard' && (
          <div style={styles.dashboard}>
            <h2>Dashboard</h2>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <h3>Total Posts</h3>
                <p style={styles.statNumber}>{posts.length}</p>
              </div>
              <div style={styles.statCard}>
                <h3>Recent Posts</h3>
                <p style={styles.statNumber}>{posts.filter(p => {
                  const postDate = new Date(p.createdAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return postDate > weekAgo;
                }).length}</p>
              </div>
            </div>
            
            <div style={styles.recentSection}>
              <h3>Latest Posts</h3>
              {posts.slice(0, 3).map(post => (
                <div key={post.id} style={styles.recentPost}>
                  <h4 style={styles.recentTitle}>{post.title}</h4>
                  <p style={styles.recentDate}>{post.createdAt}</p>
                </div>
              ))}
              {posts.length === 0 && (
                <p style={styles.emptyMessage}>No posts yet. Create your first post!</p>
              )}
            </div>
          </div>
        )}

        {currentView === 'create' && (
          <div style={styles.createSection}>
            <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Post title..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={styles.input}
              />
              <textarea
                placeholder="Write your post content here..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                style={styles.textarea}
                rows="10"
              ></textarea>
              <div style={styles.buttonGroup}>
                <button onClick={handleSubmit} style={styles.submitButton}>
                  {editingPost ? 'Update Post' : 'Publish Post'}
                </button>
                {editingPost && (
                  <button onClick={cancelEdit} style={styles.cancelButton}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'posts' && (
          <div style={styles.postsSection}>
            <h2>All Blog Posts</h2>
            {posts.length === 0 ? (
              <div style={styles.emptyState}>
                <h3>No posts yet!</h3>
                <p>Start writing your first blog post.</p>
                <button 
                  onClick={() => setCurrentView('create')} 
                  style={styles.submitButton}
                >
                  Create First Post
                </button>
              </div>
            ) : (
              <div style={styles.postsGrid}>
                {posts.map(post => (
                  <div key={post.id} style={styles.postCard}>
                    <h3 style={styles.postTitle}>{post.title}</h3>
                    <p style={styles.postContent}>
                      {post.content.length > 150 
                        ? post.content.substring(0, 150) + '...' 
                        : post.content
                      }
                    </p>
                    <div style={styles.postMeta}>
                      <small>Created: {post.createdAt}</small>
                      {post.updatedAt !== post.createdAt && (
                        <small>Updated: {post.updatedAt}</small>
                      )}
                    </div>
                    <div style={styles.postActions}>
                      <button 
                        onClick={() => startEdit(post)} 
                        style={styles.editButton}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deletePost(post.id)} 
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogApp;