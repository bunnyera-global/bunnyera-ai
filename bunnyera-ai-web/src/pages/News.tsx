import React, { useState } from 'react';
import { ExternalLink, Filter, Loader2 } from 'lucide-react';

const mockNews = [
  { id: 1, title: '亚马逊发布 2025 年物流新政', summary: '针对 FBA 配送费用进行了新一轮调整，利好轻小商品卖家。', source: 'Amazon Official', date: '2小时前', tag: '政策', platform: 'Amazon' },
  { id: 2, title: 'TikTok Shop 东南亚GMV增长迅猛', summary: '最新数据显示，越南和泰国市场表现最为亮眼，直播带货成主流。', source: 'E-commerce News', date: '5小时前', tag: '市场', platform: 'TikTok' },
  { id: 3, title: 'Shopify 推出 AI 自动建站功能', summary: '商家只需输入品类和风格，即可生成完整的独立站布局。', source: 'TechCrunch', date: '1天前', tag: '工具', platform: 'Shopify' },
];

export const News: React.FC = () => {
  const [summarizing, setSummarizing] = useState<number | null>(null);

  const handleSummarize = (id: number) => {
    setSummarizing(id);
    setTimeout(() => setSummarizing(null), 2000);
  };

  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto bg-bunny-dark">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">跨境资讯</h1>
          <p className="text-gray-400">实时掌握全球电商动态</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-bunny-card border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-bunny-blue transition-colors">
          <Filter size={16} />
          <span>筛选视图</span>
        </button>
      </div>

      <div className="grid gap-6 max-w-5xl">
        {mockNews.map((news) => (
          <div key={news.id} className="bg-bunny-card border border-gray-800 rounded-2xl p-6 hover:border-bunny-blue/50 hover:shadow-lg hover:shadow-bunny-blue/5 transition-all group cursor-pointer relative overflow-hidden">
            {/* Platform Badge (Mock) */}
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-4xl font-black text-gray-500">{news.platform}</span>
            </div>

            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    news.tag === '政策' ? 'bg-red-500/10 text-red-400' :
                    news.tag === '市场' ? 'bg-green-500/10 text-green-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {news.tag}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">{news.source} • {news.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-bunny-blue transition-colors pr-8">
                  {news.title}
                </h3>
                <p className="text-gray-400 max-w-3xl leading-relaxed">
                  {news.summary}
                </p>
              </div>
              <ExternalLink className="text-gray-600 group-hover:text-bunny-blue opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" size={20} />
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
               <button 
                onClick={(e) => { e.stopPropagation(); handleSummarize(news.id); }}
                className="text-sm text-bunny-blue font-medium hover:text-blue-400 flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-bunny-blue/10 transition-colors"
                disabled={summarizing === news.id}
               >
                 {summarizing === news.id ? (
                   <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>AI 正在生成摘要...</span>
                   </>
                 ) : (
                   <>
                    <span>✨ AI 生成深度摘要</span>
                   </>
                 )}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
