import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button,
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Input,
  Avatar, 
  AvatarFallback, 
  AvatarImage,
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '../components/ui-consolidated';
import { SkillsManagementModal, UserProfileModal, SwapRequestModal } from '../components/FeatureSections';
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp,
  BookOpen,
  Code,
  Palette,
  Camera,
  Music,
  Filter,
  Loader2,
  Sparkles,
  Zap,
  Brain,
  Award,
  Target,
  Globe,
  Flame,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { toast } from 'sonner';
import '../premium-styles.css';

const Discovery = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [showSwapRequestModal, setShowSwapRequestModal] = useState(false);
  const [selectedUserForSwap, setSelectedUserForSwap] = useState(null);
  
  // Data states
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    fetchInitialData();
  }, [user, navigate]);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const [usersResponse, categoriesResponse] = await Promise.all([
        apiService.getDiscoveryUsers({ page: 1, limit: 12 }),
        apiService.getPopularCategories()
      ]);
      
      setUsers(usersResponse.users || []);
      setCategories(categoriesResponse.categories || []);
      setHasMore(usersResponse.pagination?.hasMore || false);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      toast.error('Failed to load discovery data');
      // Fallback to mock data
      setUsers([
        {
          id: 1,
          name: 'Alex Johnson',
          location: 'San Francisco, CA',
          bio: 'Full-stack developer with 5 years of experience',
          profilePhoto: null,
          isVerified: true,
          rating: 4.9,
          reviewCount: 27,
          completedSwaps: 15,
          skills: ['React', 'TypeScript', 'JavaScript'],
          skillsDetailed: [
            { skillName: 'React', level: 'ADVANCED', category: 'Technology' },
            { skillName: 'TypeScript', level: 'ADVANCED', category: 'Technology' }
          ],
          seeking: ['UI/UX Design', 'Product Management'],
          seekingDetailed: [
            { skillName: 'UI/UX Design', priority: 'HIGH', targetLevel: 'INTERMEDIATE' }
          ],
          memberSince: '2024-01-12T06:01:19.844Z'
        }
      ]);
      setCategories([
        { name: 'Technology', count: 15 },
        { name: 'Design', count: 8 },
        { name: 'Business', count: 5 }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchInitialData();
      return;
    }

    try {
      setIsSearching(true);
      const response = await apiService.getDiscoveryUsers({
        search: searchTerm,
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        page: 1,
        limit: 12
      });
      
      setUsers(response.users || []);
      setHasMore(response.pagination?.hasMore || false);
      setPage(1);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const loadMoreUsers = async () => {
    try {
      const nextPage = page + 1;
      const response = await apiService.getDiscoveryUsers({
        search: searchTerm,
        category: selectedCategory === 'all' ? undefined : selectedCategory,
        page: nextPage,
        limit: 12
      });
      
      setUsers(prev => [...prev, ...(response.users || [])]);
      setHasMore(response.pagination?.hasMore || false);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more users:', error);
      toast.error('Failed to load more users');
    }
  };

  const handleSkillRequest = async (userId, userName) => {
    // Find the user data
    const userData = users.find(u => u.id === userId);
    if (userData) {
      setSelectedUserForSwap(userData);
      setShowSwapRequestModal(true);
    }
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    try {
      setIsSearching(true);
      const response = await apiService.getDiscoveryUsers({
        category: category === 'all' ? undefined : category,
        page: 1,
        limit: 12
      });
      
      setUsers(response.users || []);
      setHasMore(response.pagination?.hasMore || false);
      setPage(1);
    } catch (error) {
      console.error('Error filtering by category:', error);
      toast.error('Failed to filter users');
    } finally {
      setIsSearching(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 py-12 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
              Discover Skills & Teachers
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with talented individuals and expand your skillset through meaningful exchanges
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 bg-white/70 backdrop-blur-xl border-white/20 shadow-xl shadow-black/5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl"></div>
          <CardContent className="p-8 relative">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-primary transition-colors duration-300" />
                <Input
                  placeholder="Search skills, people, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border-white/20 rounded-2xl focus:bg-white/80 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-gray-400 hover:bg-white/60 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors duration-300" />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full md:w-64 py-4 bg-white/50 backdrop-blur-sm border-white/20 rounded-2xl focus:bg-white/80 focus:border-primary/30 hover:bg-white/60 transition-all duration-300">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border-white/20 shadow-xl">
                  <SelectItem value="all" className="hover:bg-primary/10">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>All Categories</span>
                    </div>
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name} className="hover:bg-primary/10">
                      <div className="flex items-center space-x-2">
                        <span>{category.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {category.count}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline"
                onClick={() => setShowSkillsModal(true)}
                className="py-4 px-6 bg-white/50 backdrop-blur-sm border-white/20 rounded-2xl hover:bg-white/80 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                <Brain className="mr-2 h-4 w-4" />
                Manage My Skills
              </Button>
              
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="py-4 px-6 bg-gradient-to-r from-primary via-purple-500 to-blue-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-blue-500/90 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="relative mx-auto w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-2xl animate-pulse"></div>
              <div className="absolute inset-1 bg-white rounded-xl flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Discovering Amazing People</h3>
            <p className="text-gray-600">Finding skilled individuals for you...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mx-auto w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl"></div>
              <div className="absolute inset-2 bg-white rounded-2xl flex items-center justify-center">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No users found</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Try adjusting your search criteria or browse all categories to discover amazing people.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                handleSearch();
              }}
              className="mt-6 bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white px-8 py-3 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <Globe className="mr-2 h-4 w-4" />
              Browse All Users
            </Button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {users.map((user) => (
                <Card key={user.id} className="group hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-xl border-white/20 hover:bg-white/90 hover:scale-[1.02] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 ring-4 ring-white/50 group-hover:ring-primary/30 transition-all duration-300">
                          <AvatarImage src={user.profilePhoto} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-primary via-purple-500 to-blue-500 text-white text-lg font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {user.isVerified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                            <Zap className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-lg text-gray-800 truncate group-hover:text-primary transition-colors duration-300">
                            {user.name}
                          </h3>
                          {user.isVerified && (
                            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 px-2 py-1">
                              <Award className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="text-sm">{user.location || 'Location not specified'}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center text-yellow-500 mr-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= (user.rating || 4) 
                                    ? 'fill-current text-yellow-400' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {user.rating || 4.0} ({user.reviewCount || 12} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 relative">
                    <p className="text-gray-600 leading-relaxed">{user.bio || 'Passionate about sharing knowledge and learning new skills.'}</p>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-gray-800">Skills Offered:</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {user.skillsDetailed?.slice(0, 3).map((skill, index) => (
                          <Badge key={index} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-700 border-blue-200 hover:from-blue-500/20 hover:to-purple-500/20 transition-colors duration-300">
                            {skill.skillName} 
                            <span className="ml-1 text-xs opacity-75">({skill.level})</span>
                          </Badge>
                        )) || user.skills?.slice(0, 3).map((skill, index) => (
                          <Badge key={index} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-700 border-blue-200">
                            {skill}
                          </Badge>
                        )) || (
                          <span className="text-sm text-gray-500 italic">No skills listed</span>
                        )}
                        {(user.skillsDetailed?.length > 3 || user.skills?.length > 3) && (
                          <Badge variant="outline" className="text-gray-500">
                            +{(user.skillsDetailed?.length || user.skills?.length || 0) - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Last active 2h ago</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewProfile(user)}
                          className="bg-white/50 border-gray-200 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
                        >
                          <User className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSwapRequest(user)}
                          className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-blue-500/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Target className="h-4 w-4 mr-1" />
                          Request Swap
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  onClick={loadMoreUsers}
                  disabled={isSearching}
                  className="px-8 py-3 bg-white/50 backdrop-blur-sm border-white/20 rounded-2xl hover:bg-white/80 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading More...
                    </>
                  ) : (
                    <>
                      <Users className="mr-2 h-4 w-4" />
                      Load More Users
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <SkillsManagementModal 
        isOpen={showSkillsModal} 
        onClose={() => setShowSkillsModal(false)} 
      />
      <UserProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        userId={selectedUserId}
        userName={selectedUserName}
      />
      
      <SwapRequestModal
        isOpen={showSwapRequestModal}
        onClose={() => {
          setShowSwapRequestModal(false);
          setSelectedUserForSwap(null);
        }}
        selectedUser={selectedUserForSwap}
      />
    </div>
  );
};

export default Discovery;