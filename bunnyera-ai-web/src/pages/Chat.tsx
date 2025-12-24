import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Copy, Image as ImageIcon, Download, Save, RotateCcw, Trash2, Clock, MoreHorizontal } from 'lucide-react';
import { generateContent } from '../services/ai';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  type?: 'text' | 'card';
  metadata?: any;
  timestamp: string;
}

interface HistoryItem {
  id: string;
  title: string;
  date: string;
}

const mockHistory: HistoryItem[] = [
  { id: '1', title: '夏季运动鞋文案', date: '今天' },
  { id: '2', title: 'Instagram 推广策略', date: '昨天' },
  { id: '3', title: 'Shopify 选品分析', date: '3天前' },
];

export const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      text: '你好！我是 BunnyEra AI 助手 🐰\n我可以帮你生成电商文案、商品描述，或者提供选品建议。请告诉我你想卖什么？',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Simple logic to detect intent (mock)
      const isCopyRequest = input.includes('文案') || input.includes('推广');
      const type = isCopyRequest ? 'copy' : 'desc';
      
      const result = await generateContent(type, { title: input });
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: result.content,
        type: 'card',
        metadata: { imagePrompt: result.imagePrompt },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        text: '聊天记录已清空。我们可以重新开始了！🐰',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="flex h-full relative">
      {/* History Sidebar (Collapsible) */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full border-r border-gray-800 bg-bunny-darker overflow-hidden flex flex-col absolute z-10 md:relative"
          >
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center">
                <Clock size={16} className="mr-2 text-bunny-blue" />
                历史记录
              </h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-white">
                <RotateCcw size={16} className="rotate-180" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {mockHistory.map(item => (
                <button key={item.id} className="w-full text-left p-3 rounded-lg hover:bg-gray-800 text-sm text-gray-300 transition-colors mb-1 group flex justify-between items-center">
                  <span className="truncate">{item.title}</span>
                  <span className="text-xs text-gray-600 group-hover:text-gray-400">{item.date}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col flex-1 h-full min-w-0 bg-bunny-dark">
        {/* Header */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-bunny-dark/80 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center space-x-3">
            {!showHistory && (
              <button onClick={() => setShowHistory(true)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Clock size={20} />
              </button>
            )}
            <div>
              <h2 className="text-lg font-bold text-white flex items-center">
                BunnyEra AI 助手
                <span className="ml-2 text-xl">🐰</span>
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="更多选项">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  <div
                    className={`rounded-2xl p-5 shadow-lg ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-bunny-blue to-blue-600 text-white rounded-br-none'
                        : 'bg-bunny-card border border-gray-800 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.text}</div>
                    
                    {/* Content Card Actions */}
                    {msg.type === 'card' && (
                      <div className="mt-4 pt-4 border-t border-gray-700/50 flex flex-wrap gap-2">
                         <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700 text-xs text-gray-300 hover:text-bunny-blue transition-colors">
                           <Copy size={14} />
                           <span>复制</span>
                         </button>
                         <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700 text-xs text-gray-300 hover:text-bunny-blue transition-colors">
                           <Save size={14} />
                           <span>保存</span>
                         </button>
                         <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700 text-xs text-gray-300 hover:text-bunny-blue transition-colors">
                           <Download size={14} />
                           <span>下载图片</span>
                         </button>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 mt-1 px-1">{msg.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {loading && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="flex justify-start"
             >
              <div className="bg-bunny-card border border-gray-800 rounded-2xl rounded-bl-none p-4 flex items-center space-x-2">
                <span className="text-xs text-gray-400 mr-2">AI 正在思考...</span>
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-bunny-blue rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-bunny-blue rounded-full animate-bounce delay-75" />
                  <div className="w-1.5 h-1.5 bg-bunny-blue rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 pt-2 bg-bunny-dark">
          <div className="max-w-4xl mx-auto">
            {/* Quick Actions */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
              <button 
                onClick={() => setInput('生成 Instagram 推广文案：')}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700 text-xs text-gray-300 hover:border-bunny-blue hover:text-bunny-blue transition-colors whitespace-nowrap"
              >
                <Sparkles size={12} />
                <span>推广文案模板</span>
              </button>
              <button 
                onClick={() => setInput('生成亚马逊商品描述：')}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700 text-xs text-gray-300 hover:border-bunny-blue hover:text-bunny-blue transition-colors whitespace-nowrap"
              >
                <ImageIcon size={12} />
                <span>商品描述模板</span>
              </button>
            </div>

            <div className="bg-bunny-card border border-gray-700 rounded-2xl p-2 flex flex-col shadow-2xl focus-within:border-bunny-blue focus-within:ring-1 focus-within:ring-bunny-blue/30 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="输入商品名称，例如：'夏季透气运动鞋'，或 '生成 Instagram 推广文案'..."
                className="w-full bg-transparent text-white placeholder-gray-500 p-3 min-h-[60px] max-h-[200px] resize-none focus:outline-none text-sm md:text-base"
              />
              <div className="flex items-center justify-between px-2 pb-1 pt-2 border-t border-gray-800/50">
                <div className="flex space-x-1">
                   <button 
                    onClick={clearChat}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-800/50 tooltip" 
                    title="清空对话"
                   >
                     <Trash2 size={18} />
                   </button>
                </div>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className={`px-4 py-2 rounded-xl flex items-center space-x-2 transition-all ${
                    input.trim() 
                      ? 'bg-bunny-blue text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 transform hover:-translate-y-0.5' 
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className="text-sm font-medium">发送</span>
                  <Send size={16} />
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-3">
              BunnyEra AI 生成的内容仅供参考，请根据实际情况调整。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
