import React from 'react';
import { Settings, Bell, LogOut, ShoppingBag, Layers, MessageSquare, CreditCard, Users } from 'lucide-react';

interface WindowHeaderProps {
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'chat', icon: MessageSquare, label: 'AI 助手' },
  { id: 'tasks', icon: Layers, label: '任务中心' },
  { id: 'accounts', icon: Users, label: '账号管理' },
  { id: 'store', icon: ShoppingBag, label: '商城入口' },
  { id: 'settings', icon: Settings, label: '系统设置' },
];

export const WindowHeader: React.FC<WindowHeaderProps> = ({ onLogout, activeTab, onTabChange }) => {
  return (
    <div className="h-16 bg-bunny-darker border-b border-gray-800 flex items-center justify-between px-6 select-none app-region-drag">
      {/* Left: Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-bunny-blue to-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-bunny-blue/20">
           <span className="text-white font-bold text-sm">B</span>
        </div>
        <span className="text-lg font-bold text-white tracking-tight">BunnyEra AI</span>
      </div>

      {/* Center: Navigation */}
      <nav className="flex items-center space-x-1 bg-gray-800/50 p-1 rounded-xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === item.id 
                ? 'bg-gray-700 text-white shadow-md' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Right: User Profile & Actions */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-bunny-darker"></span>
        </button>
        
        <div className="h-6 w-px bg-gray-800"></div>

        <div className="flex items-center space-x-3 group cursor-pointer relative">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-white">BunnyUser</div>
            <div className="text-xs text-bunny-blue">Pro Plan</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border border-gray-700 shadow-inner"></div>
          
          {/* Dropdown (Mock) */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-bunny-card border border-gray-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 z-50">
             <div className="p-2 space-y-1">
               <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white flex items-center">
                 <CreditCard size={14} className="mr-2" />
                 虚拟卡管理
               </button>
               <button 
                onClick={onLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 flex items-center"
               >
                 <LogOut size={14} className="mr-2" />
                 退出登录
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
