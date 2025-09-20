import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { 
  Button,
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Progress,
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from '../components/ui-consolidated';
import { SkillsManagementModal } from '../components/FeatureSections';
import { 
  User, 
  Settings, 
  LogOut, 
  Star, 
  Trophy, 
  BookOpen, 
  Users, 
  TrendingUp,
  Calendar,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Bell,
  Home,
  Loader2,
  Sparkles,
  Award,
  Brain,
  Target,
  Zap,
  Globe,
  Flame,
  Clock,
  CheckCircle,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';
import '../premium-styles.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  
  // Data states
  const [dashboardData, setDashboardData] = useState(null);
  const [swapRequests, setSwapRequests] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch multiple data sources in parallel
      const [swapRequestsResponse, dashboardAnalyticsResponse] = await Promise.all([
        apiService.getSwapRequests({ type: 'all', status: 'all', limit: 5 }),
        apiService.getDashboardAnalytics()
      ]);
      
      setSwapRequests(swapRequestsResponse.swapRequests || []);
      setDashboardData(dashboardAnalyticsResponse?.summary || dashboardAnalyticsResponse || {});
      
      // Generate recent activity from swap requests
      const activity = (swapRequestsResponse.swapRequests || []).map(request => ({
        id: request.id,
        type: 'swap_request',
        title: `Swap request for ${request.skillRequested}`,
        description: `Exchange ${request.skillOffered} for ${request.skillRequested}`,
        date: request.createdAt,
        status: request.status,
        partner: request.requester?.name || request.receiver?.name
      }));
      
      setRecentActivity(activity);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      // Fallback to mock data
      setSwapRequests([
        {
          id: 1,
          skillOffered: "JavaScript",
          skillRequested: "Python",
          status: "PENDING",
          createdAt: "2024-01-15T10:00:00Z",
          requester: { name: "Alice Johnson" },
          receiver: { name: "Bob Smith" }
        }
      ]);
      setDashboardData({
        totalSwaps: 24,
        skillsOffered: user?.skillsOffered?.length || 0,
        skillsWanted: user?.skillsWanted?.length || 0,
        networkConnections: 156
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const quickStats = [
    {
      title: "Total Swaps",
      value: dashboardData?.totalSwaps || 0,
      change: "+12% from last month",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      title: "Skills Offered",
      value: dashboardData?.skillsOffered || user?.skillsOffered?.length || 0,
      change: "+2 new skills",
      icon: BookOpen,
      color: "text-green-600"
    },
    {
      title: "Skills Wanted",
      value: dashboardData?.skillsWanted || user?.skillsWanted?.length || 0,
      change: "3 matches found",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Network",
      value: dashboardData?.networkConnections || 0,
      change: "+8 new connections",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  const achievements = [
    { 
      name: "First Swap", 
      description: "Complete your first skill exchange", 
      unlocked: true 
    },
    { 
      name: "Skill Master", 
      description: "Teach 10 different skills", 
      unlocked: true 
    },
    { 
      name: "Community Builder", 
      description: "Connect with 50 skill partners", 
      unlocked: false 
    },
    { 
      name: "Learning Enthusiast", 
      description: "Learn 20 new skills", 
      unlocked: false 
    },
    { 
      name: "Top Rated", 
      description: "Maintain a 4.8+ rating", 
      unlocked: true 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/5 to-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
      
      {/* Premium Hero Header */}
      <div className="relative z-10 bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-4">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-gray-700 font-semibold">✨ Your Dashboard</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent">
                  Welcome back,
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  {user?.name?.split(' ')[0] || 'Learner'}! 🎯
                </span>
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Continue your amazing learning journey today
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Premium Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Profile Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 rounded-3xl"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5"></div>
                  <CardHeader className="relative text-center pb-2">
                    <div className="relative mx-auto mb-6">
                      <Avatar className="w-24 h-24 ring-4 ring-white/50 shadow-xl">
                        <AvatarImage src={user?.profilePhoto} />
                        <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary via-purple-500 to-blue-500 text-white">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {user?.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium flex items-center justify-center gap-1">
                      <Globe className="w-4 h-4" />
                      {user?.location || 'Location not set'}
                    </CardDescription>
                    
                    <div className="flex items-center justify-center space-x-2 mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(user?.reputation?.overallRating || 0) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-bold text-gray-800">
                        {user?.reputation?.overallRating || 0}
                      </span>
                      <span className="text-gray-600 text-sm">
                        ({user?.reputation?.totalRatings || 0} reviews)
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-6 pt-2">
                    {/* Trust Score */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-500" />
                          Trust Score
                        </span>
                        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                          {user?.reputation?.trustScore || 50}/100
                        </Badge>
                      </div>
                      <Progress 
                        value={user?.reputation?.trustScore || 50} 
                        className="h-2 bg-gray-200" 
                      />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Swaps', value: user?.reputation?.completedSwaps || 0, icon: Target, color: 'from-green-500 to-emerald-500' },
                        { label: 'Skills', value: (user?.skillsOffered?.length || 0) + (user?.skillsWanted?.length || 0), icon: Brain, color: 'from-blue-500 to-cyan-500' },
                        { label: 'Credits', value: user?.credits?.balance || 0, icon: Award, color: 'from-yellow-500 to-orange-500' },
                        { label: 'Badges', value: user?.achievements?.length || 0, icon: Trophy, color: 'from-purple-500 to-pink-500' }
                      ].map((stat, index) => (
                        <div key={index} className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/70 transition-colors">
                          <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                            <stat.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                          <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        onClick={() => setShowSkillsModal(true)}
                        className="w-full bg-gradient-to-r from-primary via-purple-500 to-blue-500 hover:from-primary/90 hover:via-purple-500/90 hover:to-blue-500/90 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Manage Skills
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/profile')}
                        className="w-full rounded-2xl border-2 border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="swaps">Swap Requests</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickStats.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {stat.title}
                            </p>
                            <p className={`text-2xl font-bold ${stat.color}`}>
                              {stat.value}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {stat.change}
                            </p>
                          </div>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Swap Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Swap Requests</CardTitle>
                    <CardDescription>
                      Your latest skill exchange requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {swapRequests.length > 0 ? (
                      <div className="space-y-4">
                        {swapRequests.slice(0, 3).map((request) => (
                          <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">
                                {request.skillOffered} ↔ {request.skillRequested}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                with {request.requester?.name || request.receiver?.name}
                              </div>
                            </div>
                            <Badge variant={
                              request.status === 'ACCEPTED' ? 'default' :
                              request.status === 'PENDING' ? 'secondary' :
                              'destructive'
                            }>
                              {request.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No swap requests yet</p>
                        <p className="text-sm">Start by exploring skills in the Discovery section</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Swap Requests Tab */}
              <TabsContent value="swaps" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Swap Requests</CardTitle>
                    <CardDescription>
                      Manage your skill exchange requests
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {swapRequests.length > 0 ? (
                      <div className="space-y-4">
                        {swapRequests.map((request) => (
                          <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <div className="font-medium">
                                {request.skillOffered} ↔ {request.skillRequested}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                with {request.requester?.name || request.receiver?.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(request.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={
                                request.status === 'ACCEPTED' ? 'default' :
                                request.status === 'PENDING' ? 'secondary' :
                                'destructive'
                              }>
                                {request.status}
                              </Badge>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No swap requests found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Recent Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest actions and interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentActivity.length > 0 ? (
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <MessageSquare className="h-4 w-4 text-primary" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{activity.title}</div>
                              <div className="text-sm text-muted-foreground">
                                {activity.description}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()}
                              </div>
                            </div>
                            <Badge variant="outline">{activity.status}</Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No recent activity</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>
                      Track your progress and unlock new badges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div 
                          key={index} 
                          className={`p-4 border rounded-lg ${
                            achievement.unlocked 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              achievement.unlocked 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              <Trophy className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className={`font-medium ${
                                achievement.unlocked ? 'text-green-900' : 'text-gray-500'
                              }`}>
                                {achievement.name}
                              </div>
                              <div className={`text-sm ${
                                achievement.unlocked ? 'text-green-700' : 'text-gray-400'
                              }`}>
                                {achievement.description}
                              </div>
                            </div>
                            {achievement.unlocked && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                Unlocked
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Skills Management Modal */}
      <SkillsManagementModal 
        isOpen={showSkillsModal} 
        onClose={() => setShowSkillsModal(false)} 
      />
    </div>
  );
};

export default Dashboard;