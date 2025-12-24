import React from 'react';
import { Plus, Instagram, Facebook, Twitter, MoreHorizontal, CheckCircle2, AlertCircle } from 'lucide-react';

const mockAccounts = [
  { id: 1, platform: 'Instagram', name: '@bunny_fashion', status: 'active', followers: '12.5k', lastPost: '2小时前' },
  { id: 2, platform: 'Facebook', name: 'BunnyEra Official', status: 'active', followers: '8.2k', lastPost: '1天前' },
  { id: 3, platform: 'Twitter', name: '@bunny_global', status: 'warning', followers: '3.1k', lastPost: '5天前' },
];

export const Accounts: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto bg-bunny-dark">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">账号矩阵管理</h1>
          <p className="text-gray-400">一站式管理所有海外社媒账号</p>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 bg-bunny-blue text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 font-medium">
          <Plus size={20} />
          <span>绑定新账号</span>
        </button>
      </div>

      <div className="bg-bunny-card border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-800/50 text-gray-400 text-sm">
              <tr>
                <th className="px-8 py-5 font-medium">平台 / 账号</th>
                <th className="px-6 py-5 font-medium">状态</th>
                <th className="px-6 py-5 font-medium">粉丝数</th>
                <th className="px-6 py-5 font-medium">最近发布</th>
                <th className="px-6 py-5 font-medium text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-800/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                        account.platform === 'Instagram' ? 'bg-gradient-to-tr from-yellow-500 to-purple-600' :
                        account.platform === 'Facebook' ? 'bg-blue-600' : 'bg-sky-500'
                      }`}>
                        {account.platform === 'Instagram' && <Instagram size={24} className="text-white" />}
                        {account.platform === 'Facebook' && <Facebook size={24} className="text-white" />}
                        {account.platform === 'Twitter' && <Twitter size={24} className="text-white" />}
                      </div>
                      <div>
                        <div className="font-bold text-white text-base">{account.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{account.platform}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      account.status === 'active' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {account.status === 'active' ? <CheckCircle2 size={12} className="mr-1.5" /> : <AlertCircle size={12} className="mr-1.5" />}
                      {account.status === 'active' ? '运行中' : '需验证'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-300 font-mono text-lg">{account.followers}</td>
                  <td className="px-6 py-5 text-gray-400 text-sm">{account.lastPost}</td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-gray-500 hover:text-white p-2.5 hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-bunny-card border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
            <h3 className="font-bold text-lg text-white mb-6">自动化发布计划</h3>
            <div className="text-center py-10 text-gray-500 text-sm border-2 border-dashed border-gray-800 rounded-xl hover:border-bunny-blue/50 hover:bg-gray-800/20 transition-all cursor-pointer">
                <p>暂无待发布任务</p>
                <button className="text-bunny-blue mt-3 font-medium hover:underline">创建新任务</button>
            </div>
         </div>
         <div className="bg-bunny-card border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
            <h3 className="font-bold text-lg text-white mb-6">账号健康度概览</h3>
            <div className="flex items-center justify-center h-40">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="#1f2937" strokeWidth="8" fill="transparent" />
                        <circle cx="64" cy="64" r="60" stroke="#4ade80" strokeWidth="8" fill="transparent" strokeDasharray="377" strokeDashoffset="10" strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-4xl font-bold text-white">98<span className="text-xl">%</span></span>
                        <span className="text-xs text-gray-400 mt-1">综合评分</span>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};
