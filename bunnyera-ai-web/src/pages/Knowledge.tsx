import React, { useState } from 'react';
import { Search, Book, ChevronRight, FileText, Loader2 } from 'lucide-react';

const categories = [
  { id: 'ops', title: '店铺运营', count: 12, color: 'bg-blue-500' },
  { id: 'marketing', title: '市场营销', count: 8, color: 'bg-purple-500' },
  { id: 'compliance', title: '平台合规', count: 5, color: 'bg-red-500' },
  { id: 'logistics', title: '物流仓储', count: 9, color: 'bg-orange-500' },
];

const mockArticles = [
  { id: 1, title: '新手卖家如何从零开始做亚马逊？', category: '店铺运营', readTime: '15 min' },
  { id: 2, title: 'Facebook 广告投放全攻略 2025版', category: '市场营销', readTime: '20 min' },
  { id: 3, title: '欧美外观专利申请流程详解', category: '平台合规', readTime: '10 min' },
];

export const Knowledge: React.FC = () => {
  const [generating, setGenerating] = useState(false);

  const handleGenerateSOP = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto bg-bunny-dark">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">跨境知识库</h1>
        <p className="text-gray-400 mb-8 text-lg">沉淀行业经验，助力品牌出海</p>
        
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-bunny-blue transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="搜索知识库，例如：'FBA 发货流程'..." 
            className="w-full bg-bunny-card border border-gray-700 rounded-2xl py-5 pl-14 pr-36 text-white placeholder-gray-500 focus:outline-none focus:border-bunny-blue focus:ring-1 focus:ring-bunny-blue transition-all shadow-xl"
          />
          <button 
            onClick={handleGenerateSOP}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-bunny-blue hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center space-x-2"
            disabled={generating}
          >
            {generating ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
            <span>{generating ? '生成中...' : '生成 SOP'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-bunny-card border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/80 transition-all cursor-pointer text-center group hover:-translate-y-1">
            <div className={`w-12 h-12 ${cat.color} rounded-xl mx-auto mb-4 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity shadow-lg shadow-${cat.color.split('-')[1]}-500/20`}>
                <Book size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-200 mb-1 group-hover:text-white">{cat.title}</h3>
            <span className="text-sm text-gray-500">{cat.count} 篇文章</span>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <span className="w-1 h-6 bg-bunny-blue rounded-full mr-3"></span>
          推荐阅读
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.map((article) => (
            <div key={article.id} className="bg-bunny-card border border-gray-800 rounded-2xl p-6 hover:shadow-2xl hover:shadow-black/50 hover:border-gray-700 transition-all cursor-pointer group flex flex-col justify-between h-56">
              <div>
                <span className="text-xs text-bunny-blue font-bold tracking-wide px-2.5 py-1 bg-bunny-blue/10 rounded-lg mb-4 inline-block">
                  {article.category}
                </span>
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-white leading-snug">
                  {article.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4 border-t border-gray-800 pt-4">
                <span>{article.readTime} 阅读</span>
                <div className="flex items-center text-bunny-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="mr-1 font-medium">阅读全文</span>
                    <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
