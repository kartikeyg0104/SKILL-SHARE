
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { 
  Button,
  Input,
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Avatar, 
  AvatarFallback, 
  AvatarImage,
  Badge,
  Textarea
} from '../components/ui-consolidated';
import { CommentsModal, ShareModal, UserProfileModal } from '../components/FeatureSections';
import { 
  Search, 
  Bell, 
  MessageCircle, 
  Home,
  Users,
  Settings,
  Plus,
  Heart,
  Share,
  Bookmark,
  MoreHorizontal,
  Verified,
  TrendingUp,
  Hash,
  User,
  ImageIcon,
  Smile,
  MapPin,
  Calendar,
  LogOut,
  RefreshCw,
  Sparkles,
  Flame,
  Zap,
  Globe,
  Brain,
  Star,
  Award
} from 'lucide-react';
import { toast } from 'sonner';
import '../premium-styles.css';

// Premium Create Post Component
const CreatePost = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (content.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const hashtags = content.match(/#\w+/g) || [];
        const cleanHashtags = hashtags.map(tag => tag.substring(1));
        
        const postData = {
          content: content.trim(),
          hashtags: cleanHashtags,
          isPublic: true
        };

        const response = await apiService.createPost(postData);
        onPost(response.post);
        setContent('');
        setIsExpanded(false);
        toast.success('🎉 Post shared successfully!');
      } catch (error) {
        console.error('Error creating post:', error);
        toast.error('❌ Failed to create post. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 rounded-3xl"></div>
      
      <Card className="relative bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5"></div>
        
        <CardContent className="relative p-8">
          <div className="flex space-x-4">
            <div className="relative">
              <Avatar className="h-14 w-14 ring-4 ring-white/50 shadow-lg">
                <AvatarImage src={user?.profilePhoto} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-primary via-purple-500 to-blue-500 text-white font-bold text-lg">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Plus className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="relative">
                <Textarea
                  placeholder="✨ What's happening in your skill journey?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setIsExpanded(true)}
                  className="min-h-[80px] resize-none border-0 bg-white/50 backdrop-blur-sm rounded-2xl focus:bg-white/70 focus:ring-2 focus:ring-primary/20 text-lg placeholder:text-gray-400 shadow-inner transition-all duration-300"
                  maxLength={280}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-full">
                  {content.length}/280
                </div>
              </div>
              
              {isExpanded && (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-300">
                  {/* Premium Action Buttons */}
                  <div className="flex items-center space-x-2">
                    {[
                      { icon: ImageIcon, label: 'Image', color: 'from-blue-500 to-cyan-500' },
                      { icon: Smile, label: 'Emoji', color: 'from-yellow-500 to-orange-500' },
                      { icon: MapPin, label: 'Location', color: 'from-green-500 to-emerald-500' },
                      { icon: Calendar, label: 'Event', color: 'from-purple-500 to-pink-500' },
                      { icon: Hash, label: 'Hashtag', color: 'from-indigo-500 to-blue-500' }
                    ].map((item, index) => (
                      <Button 
                        key={index}
                        variant="ghost" 
                        size="sm" 
                        className="h-10 w-10 p-0 rounded-xl hover:scale-110 transition-all duration-300 group relative overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity rounded-xl`}></div>
                        <item.icon className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors relative z-10" />
                      </Button>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border-0">
                        🌍 Public post
                      </Badge>
                      {content.match(/#\w+/g) && (
                        <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 border-0">
                          {content.match(/#\w+/g).length} hashtag{content.match(/#\w+/g).length > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setContent('');
                          setIsExpanded(false);
                        }}
                        className="rounded-xl border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleSubmit}
                        disabled={!content.trim() || content.length > 280 || isSubmitting}
                        className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-blue-500/90 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Sharing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Share
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Social Post Component (inline)
const SocialPost = ({ post, onLike, onBookmark, onViewProfile, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleProfileClick = () => {
    if (onViewProfile) {
      onViewProfile(post.author.id, post.author.name);
    }
  };

  const handleLike = async () => {
    try {
      const response = await apiService.likePost(post.id);
      onLike(post.id, response.liked, response.likesCount);
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Failed to like post');
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await apiService.bookmarkPost(post.id);
      onBookmark(post.id, response.bookmarked);
    } catch (error) {
      console.error('Error bookmarking post:', error);
      toast.error('Failed to bookmark post');
    }
  };

  const handleAddComment = async () => {
    if (comment.trim() && !isSubmittingComment) {
      setIsSubmittingComment(true);
      try {
        const response = await apiService.addComment(post.id, { content: comment.trim() });
        onAddComment(post.id, response.comment);
        setComment('');
        toast.success('Comment added successfully!');
      } catch (error) {
        console.error('Error adding comment:', error);
        toast.error('Failed to add comment');
      } finally {
        setIsSubmittingComment(false);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp === 'now') return 'now';
    if (timestamp === '2h') return '2h';
    if (timestamp === '4h') return '4h';
    if (timestamp === '6h') return '6h';
    return timestamp;
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar 
                className="h-10 w-10 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all" 
                onClick={handleProfileClick}
              >
                <AvatarImage src={post.author.profilePhoto} alt={post.author.name} />
                <AvatarFallback>
                  {post.author.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center space-x-1">
                  <span 
                    className="font-semibold cursor-pointer hover:underline hover:text-primary transition-colors"
                    onClick={handleProfileClick}
                  >
                    {post.author.name}
                  </span>
                  {post.author.isVerified && (
                    <Badge variant="secondary" className="h-4 w-4 p-0">
                      <Verified className="h-3 w-3 text-blue-500" />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{formatTimestamp(post.timestamp)}</span>
                </div>
              </div>
            </div>
            
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-4">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {post.imageUrl && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt="Post content" 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center space-x-2 ${post.liked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
              <span>Like</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={() => setShowComments(true)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Comment</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={() => setShowShare(true)}
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center space-x-2 ${post.bookmarked ? 'text-blue-500' : ''}`}
              onClick={handleBookmark}
            >
              <Bookmark className={`h-4 w-4 ${post.bookmarked ? 'fill-current' : ''}`} />
              <span>Bookmark</span>
            </Button>
          </div>

          {/* Quick Comment Input */}
          <div className="mt-4 flex space-x-2">
            <Input
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <Button 
              size="sm" 
              onClick={handleAddComment}
              disabled={!comment.trim() || isSubmittingComment}
            >
              {isSubmittingComment ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Modal */}
      <CommentsModal 
        isOpen={showComments} 
        onClose={() => setShowComments(false)} 
        postId={post.id}
        post={post}
      />

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShare} 
        onClose={() => setShowShare(false)} 
        post={post}
      />
    </>
  );
};

// Premium Social Sidebar Component
const SocialSidebar = () => {
  const { user } = useAuth();
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [followingStates, setFollowingStates] = useState({});
  const [followLoading, setFollowLoading] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);

  const fetchSidebarData = async () => {
    try {
      if (user) {
        const [topicsResponse, usersResponse] = await Promise.all([
          apiService.getTrendingTopics(),
          apiService.getSuggestedUsers()
        ]);
        
        setTrendingTopics(topicsResponse.topics || []);
        setSuggestedUsers(usersResponse.suggestedUsers || []);
      } else {
        setTrendingTopics([
          { tag: 'SkillSwap', posts: '15 posts' },
          { tag: 'Learning', posts: '8 posts' },
          { tag: 'Community', posts: '6 posts' }
        ]);
        setSuggestedUsers([
          {
            id: 1,
            name: 'Alex Johnson',
            profilePhoto: null,
            bio: 'Full-stack developer passionate about teaching',
            skillsOffered: [{ skillName: 'React' }, { skillName: 'Node.js' }],
            mutualConnections: 3,
            followersCount: 45,
            followingCount: 23
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching sidebar data:', error);
      
      setTrendingTopics([
        { tag: 'SkillSwap', posts: '15 posts' },
        { tag: 'Learning', posts: '8 posts' },
        { tag: 'Community', posts: '6 posts' }
      ]);
      setSuggestedUsers([
        {
          id: 1,
          name: 'Alex Johnson',
          profilePhoto: null,
          bio: 'Full-stack developer passionate about teaching',
          skillsOffered: [{ skillName: 'React' }, { skillName: 'Node.js' }],
          mutualConnections: 3,
          followersCount: 45,
          followingCount: 23
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const handleFollow = async (userId, userName) => {
    try {
      setFollowLoading(prev => ({ ...prev, [userId]: true }));
      
      const response = await apiService.followUser(userId);
      
      setFollowingStates(prev => ({
        ...prev,
        [userId]: response.isFollowing
      }));

      if (response.isFollowing) {
        setSuggestedUsers(prev => prev.filter(user => user.id !== userId));
        toast.success(`🎉 You are now following ${userName}`);
      } else {
        toast.success(`👋 You unfollowed ${userName}`);
      }
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('❌ Failed to follow user');
    } finally {
      setFollowLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    toast.success(`🔍 Searching for posts with #${topic.tag}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-xl"></div>
              <div className="h-4 bg-gray-200 rounded-xl w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sticky top-6">
      {/* Trending Topics */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-red-50/50 to-pink-50/50 rounded-3xl"></div>
        <Card className="relative bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-pink-500/5"></div>
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3 text-xl font-bold">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Trending</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsLoading(true);
                  fetchSidebarData();
                }}
                disabled={isLoading}
                className="rounded-xl hover:bg-white/50 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-3 pb-6">
            {trendingTopics.length === 0 ? (
              <div className="text-center py-6">
                <Flame className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-gray-500 font-medium">No trending topics yet</p>
                <p className="text-xs text-gray-400 mt-1">Start posting with hashtags to see trends!</p>
              </div>
            ) : (
              trendingTopics.map((topic, index) => (
                <div 
                  key={index} 
                  className="group flex items-center justify-between hover:bg-white/50 p-3 rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                  onClick={() => handleTopicClick(topic)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Hash className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">#{topic.tag}</span>
                  </div>
                  <Badge variant="secondary" className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border-0 text-xs">
                    {topic.posts}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Suggested Users */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50 rounded-3xl"></div>
        <Card className="relative bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center space-x-3 text-xl font-bold">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Discover People</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4 pb-6">
            {suggestedUsers.length === 0 ? (
              <div className="text-center py-6">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-gray-500 font-medium">No suggested users</p>
                <p className="text-xs text-gray-400 mt-1">Check back later for new connections!</p>
              </div>
            ) : (
              suggestedUsers.map((person) => (
                <div key={person.id} className="group space-y-3 p-4 rounded-2xl hover:bg-white/50 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-white/50 shadow-lg group-hover:scale-110 transition-transform">
                        <AvatarImage src={person.profilePhoto} alt={person.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary via-purple-500 to-blue-500 text-white font-bold">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors">{person.name}</div>
                      <div className="text-sm text-gray-600 line-clamp-2">{person.bio}</div>
                      {person.skillsOffered && person.skillsOffered.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {person.skillsOffered.slice(0, 2).map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border-0">
                              {skill.skillName}
                            </Badge>
                          ))}
                          {person.skillsOffered.length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 border-0">
                              +{person.skillsOffered.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        <span>👥 {person.followersCount || 0} followers</span>
                        {person.mutualConnections > 0 && (
                          <span>• 🤝 {person.mutualConnections} mutual</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={followingStates[person.id] ? "default" : "outline"} 
                    className={`w-full rounded-xl transition-all duration-300 ${
                      followingStates[person.id] 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg' 
                        : 'border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5'
                    }`}
                    onClick={() => handleFollow(person.id, person.name)}
                    disabled={!user || followLoading[person.id]}
                  >
                    {followLoading[person.id] ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        Following...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {followingStates[person.id] ? (
                          <>
                            <span>✅ Following</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Follow</span>
                          </>
                        )}
                      </div>
                    )}
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Social Feed Component (inline)
const SocialFeed = ({ onViewProfile }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []); // Fetch once on component mount

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      // Only fetch if user is authenticated
      if (user) {
        const response = await apiService.getPublicFeed({ page, limit: 10 });
        setPosts(response.posts || []);
        setHasMore(response.pagination?.hasMore || false);
      } else {
        // Use fallback data for non-authenticated users
        setPosts([
          {
            id: '1',
            author: {
              id: 'alex_j',
              name: 'Alex Johnson',
              profilePhoto: null,
              isVerified: true
            },
            content: 'Just finished an amazing React workshop! The way hooks can simplify state management is incredible. #React #WebDev #Learning',
            timestamp: '2h',
            likes: 24,
            comments: 8,
            shares: 3,
            imageUrl: null,
            liked: false,
            bookmarked: false
          }
        ]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Use fallback data on error
      setPosts([
        {
          id: '1',
          author: {
            id: 'alex_j',
            name: 'Alex Johnson',
            profilePhoto: null,
            isVerified: true
          },
          content: 'Just finished an amazing React workshop! The way hooks can simplify state management is incredible. #React #WebDev #Learning',
          timestamp: '2h',
          likes: 24,
          comments: 8,
          shares: 3,
          imageUrl: null,
          liked: false,
          bookmarked: false
        }
      ]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (postId, liked, likesCount) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked, likes: likesCount }
        : post
    ));
  };

  const handleBookmark = (postId, bookmarked) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked }
        : post
    ));
  };

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleAddComment = (postId, newComment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CreatePost onPost={handleAddPost} />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <SocialPost
            key={post.id}
            post={post}
            onLike={handleLike}
            onBookmark={handleBookmark}
            onViewProfile={onViewProfile}
            onAddComment={handleAddComment}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => {
              setPage(page + 1);
              fetchPosts();
            }}
          >
            Load More Posts
          </Button>
        </div>
      )}
    </div>
  );
};

// Main Social Page Component
const Social = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');

  const handleViewProfile = (userId, userName) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setShowProfileModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-4">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-gray-700 font-semibold">✨ SkillSwap Community</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                Connect & Share
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Your Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Share your learning experiences, connect with fellow skill enthusiasts, and discover amazing opportunities.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SocialSidebar />
          </div>
          <div className="lg:col-span-3">
            <SocialFeed onViewProfile={handleViewProfile} />
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      <UserProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        userId={selectedUserId}
        userName={selectedUserName}
      />
    </div>
  );
};

export default Social;