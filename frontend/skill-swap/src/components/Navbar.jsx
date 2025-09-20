import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Avatar, AvatarFallback, AvatarImage, Badge, Input } from './ui-consolidated';
import { 
  NotificationsModal, 
  ChatModal, 
  SettingsModal, 
  EditProfileModal 
} from './FeatureSections';
import { 
  Search, 
  Bell, 
  MessageCircle, 
  Home,
  Users,
  User,
  TrendingUp,
  LogOut,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Modal states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Don't show navbar on landing page or if user is not authenticated
  if (location.pathname === '/' || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-lg shadow-black/5">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate('/social')}
            >
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                <TrendingUp className="w-6 h-6 text-white relative z-10" />
                <div className="absolute -inset-1 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                  SkillSwap
                </span>
                <span className="text-xs text-gray-500 -mt-1">Connect & Learn</span>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-2">
              <Button 
                variant={isActive('/social') ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => navigate('/social')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive('/social') 
                    ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
                    : 'hover:bg-white/50 hover:backdrop-blur-sm hover:shadow-md'
                }`}
              >
                <Home className="h-4 w-4" />
                <span className="font-medium">Social</span>
              </Button>
              
              <Button 
                variant={isActive('/discovery') ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => navigate('/discovery')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive('/discovery') 
                    ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
                    : 'hover:bg-white/50 hover:backdrop-blur-sm hover:shadow-md'
                }`}
              >
                <Search className="h-4 w-4" />
                <span className="font-medium">Discovery</span>
              </Button>
              
              <Button 
                variant={isActive('/dashboard') ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive('/dashboard') 
                    ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
                    : 'hover:bg-white/50 hover:backdrop-blur-sm hover:shadow-md'
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="font-medium">Dashboard</span>
              </Button>
              
              <Button 
                variant={isActive('/profile') ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => navigate('/profile')}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive('/profile') 
                    ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]' 
                    : 'hover:bg-white/50 hover:backdrop-blur-sm hover:shadow-md'
                }`}
              >
                <User className="h-4 w-4" />
                <span className="font-medium">Profile</span>
              </Button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-primary transition-colors duration-300" />
              <Input 
                placeholder="Search skills, people, posts..." 
                className="pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border-white/20 rounded-2xl focus:bg-white/70 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder:text-gray-400 hover:bg-white/60"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Sparkles className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors duration-300" />
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:bg-white/50 hover:backdrop-blur-sm rounded-xl p-2.5 transition-all duration-300 hover:shadow-md group"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors duration-300" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white border-2 border-white shadow-lg animate-pulse">
                3
              </Badge>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-white/50 hover:backdrop-blur-sm rounded-xl p-2.5 transition-all duration-300 hover:shadow-md group"
              onClick={() => setShowChat(true)}
            >
              <MessageCircle className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors duration-300" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-white/50 hover:backdrop-blur-sm rounded-xl p-2.5 transition-all duration-300 hover:shadow-md group"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors duration-300" />
            </Button>
            
            {/* User Avatar */}
            <div className="relative group">
              <Avatar 
                className="h-10 w-10 cursor-pointer ring-2 ring-white/20 hover:ring-primary/30 transition-all duration-300 group-hover:scale-105" 
                onClick={() => navigate('/profile')}
              >
                <AvatarImage src={user?.profile?.profilePhoto} />
                <AvatarFallback className="bg-gradient-to-br from-primary via-purple-500 to-blue-500 text-white font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              {user?.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2.5 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 hover:shadow-md group"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden mt-4 flex items-center justify-center space-x-1 bg-white/30 backdrop-blur-sm rounded-2xl p-2">
          <Button 
            variant={isActive('/social') ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => navigate('/social')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive('/social') 
                ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-md' 
                : 'hover:bg-white/50'
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="text-sm">Social</span>
          </Button>
          
          <Button 
            variant={isActive('/discovery') ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => navigate('/discovery')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive('/discovery') 
                ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-md' 
                : 'hover:bg-white/50'
            }`}
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">Discover</span>
          </Button>
          
          <Button 
            variant={isActive('/dashboard') ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => navigate('/dashboard')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive('/dashboard') 
                ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-md' 
                : 'hover:bg-white/50'
            }`}
          >
            <Users className="h-4 w-4" />
            <span className="text-sm">Dashboard</span>
          </Button>
          
          <Button 
            variant={isActive('/profile') ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => navigate('/profile')}
            className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all duration-300 ${
              isActive('/profile') 
                ? 'bg-gradient-to-r from-primary via-purple-500 to-blue-500 text-white shadow-md' 
                : 'hover:bg-white/50'
            }`}
          >
            <User className="h-4 w-4" />
            <span className="text-sm">Profile</span>
          </Button>
        </nav>
      </div>
      
      {/* Modals */}
      <NotificationsModal 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      <ChatModal 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
      />
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
      <EditProfileModal 
        isOpen={showEditProfile} 
        onClose={() => setShowEditProfile(false)} 
      />
    </header>
  );
};

export default Navbar;
