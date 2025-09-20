import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import { 
  Button,
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Badge,
  Progress,
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from '../components/ui-consolidated';
import { EditProfileModal } from '../components/FeatureSections';
import { 
  Edit,
  MapPin,
  Star,
  Trophy,
  User,
  Settings,
  Loader2,
  Sparkles,
  Zap,
  Brain,
  Target,
  Award,
  Globe,
  Shield,
  Calendar,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import '../premium-styles.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    fetchProfileData();
  }, [user, navigate]);

  const fetchProfileData = async () => {
    // Use user data from auth context since API requires authentication
    setProfileData(user);
    setIsLoading(false);
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      const response = await apiService.updateUserProfile(updatedData);
      setProfileData(response.user);
      updateUser(response.user);
      toast.success('Profile updated successfully!');
      setShowEditProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-2xl animate-pulse"></div>
            <div className="absolute inset-1 bg-white rounded-xl flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Profile</h3>
          <p className="text-gray-600">Preparing your amazing profile...</p>
        </div>
      </div>
    );
  }

  // Use profileData if available, otherwise fall back to user from auth context
  const currentUser = profileData || user;

  // Calculate trust score based on user data
  const calculateTrustScore = () => {
    let score = 50; // Base score
    
    const rating = currentUser.reputation?.overallRating || currentUser.reputation?.averageRating;
    const totalRatings = currentUser.reputation?.totalRatings || currentUser.reputation?.reviewCount;
    
    if (rating >= 4.5) score += 30;
    else if (rating >= 4.0) score += 20;
    else if (rating >= 3.5) score += 10;
    
    if (totalRatings >= 20) score += 15;
    else if (totalRatings >= 10) score += 10;
    else if (totalRatings >= 5) score += 5;
    
    if (currentUser.skillsOffered?.length >= 5) score += 5;
    
    return Math.min(score, 100);
  };

  const trustScore = calculateTrustScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 py-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Main Profile Card */}
          <Card className="mb-8 bg-white/70 backdrop-blur-xl border-white/20 shadow-2xl shadow-black/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            <CardContent className="p-0 relative">
              {/* Cover Background */}
              <div className="h-40 bg-gradient-to-r from-primary via-purple-500 to-blue-500 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-6 right-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEditProfile(true)}
                    className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              {/* Profile Content */}
              <div className="px-8 pb-8">
                {/* Profile Picture and Basic Info */}
                <div className="relative -mt-16 text-center mb-8">
                  <div className="relative inline-block">
                    <Avatar className="h-32 w-32 mx-auto mb-4 ring-6 ring-white shadow-2xl">
                      <AvatarImage src={currentUser.profilePhoto} />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-primary via-purple-500 to-blue-500 text-white">
                        {currentUser.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {currentUser.isVerified && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-3">
                    {currentUser.name || 'John Doe'}
                  </h1>
                  
                  <div className="flex items-center justify-center text-gray-600 mb-4">
                    <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-2xl">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-medium">{currentUser.location || 'Location not set'}</span>
                    </div>
                  </div>

                  {currentUser.bio && (
                    <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                      {currentUser.bio}
                    </p>
                  )}
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-6 w-6 ${
                                star <= (currentUser.reputation?.overallRating || currentUser.reputation?.averageRating || 4) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-gray-800">
                          {currentUser.reputation?.overallRating || currentUser.reputation?.averageRating || 4.0}
                        </span>
                        <span className="text-gray-600 font-medium">
                          ({currentUser.reputation?.totalRatings || currentUser.reputation?.reviewCount || 12} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Skills Taught', value: currentUser.skillsOffered?.length || 0, icon: Brain, color: 'from-blue-500 to-cyan-500' },
                      { label: 'Learning Goals', value: currentUser.skillsWanted?.length || 0, icon: Target, color: 'from-purple-500 to-pink-500' },
                      { label: 'Swaps Completed', value: currentUser.reputation?.completedSwaps || 0, icon: Users, color: 'from-green-500 to-emerald-500' },
                      { label: 'Trust Score', value: `${trustScore}%`, icon: Shield, color: 'from-yellow-500 to-orange-500' }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/70 transition-colors group">
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Score */}
                <div className="mb-8">
                  <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">Trust Score</h3>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-800">{trustScore}</div>
                        <div className="text-sm text-gray-600">out of 100</div>
                      </div>
                    </div>
                    <Progress value={trustScore} className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${trustScore}%` }}
                      />
                    </Progress>
                    <p className="text-sm text-gray-600 mt-3 font-medium">
                      Your trust score is based on ratings, completed swaps, and profile completeness.
                    </p>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Skills I Offer */}
                  <Card className="bg-white/50 backdrop-blur-sm border-white/20 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-800">Skills I Offer</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentUser.skillsOffered?.length > 0 ? (
                        currentUser.skillsOffered.slice(0, 5).map((skill) => (
                          <div key={skill.id} className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-colors group">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                                {skill.skillName}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">{skill.category}</div>
                              {skill.description && (
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{skill.description}</div>
                              )}
                            </div>
                            <Badge className={`ml-3 ${
                              skill.level === 'ADVANCED' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                              skill.level === 'INTERMEDIATE' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                              'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            }`}>
                              {skill.level}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Brain className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-gray-500 font-medium">No skills offered yet</p>
                          <p className="text-sm text-gray-400 mt-1">Add your skills to start teaching!</p>
                        </div>
                      )}
                      {currentUser.skillsOffered?.length > 5 && (
                        <div className="text-center pt-2">
                          <Badge variant="outline" className="text-gray-500">
                            +{currentUser.skillsOffered.length - 5} more skills
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Skills I Want to Learn */}
                  <Card className="bg-white/50 backdrop-blur-sm border-white/20 shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-800">Learning Goals</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentUser.skillsWanted?.length > 0 ? (
                        currentUser.skillsWanted.slice(0, 5).map((skill) => (
                          <div key={skill.id} className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-colors group">
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                                {skill.skillName}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">Target: {skill.targetLevel}</div>
                              {skill.description && (
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{skill.description}</div>
                              )}
                            </div>
                            <Badge className={`ml-3 ${
                              skill.priority === 'HIGH' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                              skill.priority === 'MEDIUM' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                              'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            }`}>
                              {skill.priority}
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-gray-500 font-medium">No learning goals set</p>
                          <p className="text-sm text-gray-400 mt-1">Set goals to find perfect teachers!</p>
                        </div>
                      )}
                      {currentUser.skillsWanted?.length > 5 && (
                        <div className="text-center pt-2">
                          <Badge variant="outline" className="text-gray-500">
                            +{currentUser.skillsWanted.length - 5} more goals
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Achievements & Badges */}
            <Card className="bg-white/50 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">Achievements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {currentUser.reputation?.badges?.length > 0 ? (
                    currentUser.reputation.badges.map((badge, index) => (
                      <div key={index} className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20 hover:bg-white/70 transition-colors">
                        <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                        <p className="text-sm font-semibold text-gray-800">{badge}</p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                        <Sparkles className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <p className="text-sm font-semibold text-gray-800">New Member</p>
                      </div>
                      {currentUser.isVerified && (
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                          <Zap className="h-8 w-8 mx-auto mb-2 text-green-500" />
                          <p className="text-sm font-semibold text-gray-800">Verified</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="bg-white/50 backdrop-blur-sm border-white/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">Account Info</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Member Since</span>
                  <span className="font-semibold text-gray-800">
                    {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Total Credits</span>
                  <span className="font-semibold text-gray-800">{currentUser.credits?.balance || 0}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Completed Swaps</span>
                  <span className="font-semibold text-gray-800">{currentUser.reputation?.completedSwaps || 0}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Account Status</span>
                  <Badge className={currentUser.isVerified ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' : 'bg-gray-200 text-gray-800'}>
                    {currentUser.isVerified ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal 
        isOpen={showEditProfile} 
        onClose={() => setShowEditProfile(false)} 
        user={currentUser}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default Profile;
