import { useState, useEffect } from 'react';
import { ModuleTaskbar } from './components/ModuleTaskbar';
import { WindowHeader } from './components/WindowHeader';
import { WindowFooter } from './components/WindowFooter';
import { Chat } from './pages/Chat';
import { Accounts } from './pages/Accounts';
import { LoginScreen } from './pages/Login';
import { Activity, Terminal, CreditCard, Play } from 'lucide-react';
// import { AnimatePresence, motion } from 'framer-motion';

// --- Sub-Views for Sidebar Modules ---

const LogsView = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Mock incoming logs
    const initialLogs = [
      '[INFO] System initialized successfully.',
      '[INFO] Connected to BunnyEra Cloud.',
      '[WARN] Rate limit approaching for API Key ending in ***89.',
    ];
    setLogs(initialLogs);

    const interval = setInterval(() => {
      const newLog = `[INFO] ${new Date().toLocaleTimeString()} - Heartbeat check passed.`;
      setLogs(prev => [...prev.slice(-19), newLog]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0d1117] p-6 text-green-400 font-mono text-sm overflow-hidden">
      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity size={18} /> 系统实时日志
        </h2>
        <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded border border-green-800">● Live</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-700">
        {logs.map((log, i) => (
          <div key={i} className="hover:bg-white/5 p-0.5 rounded px-2 break-all">
            <span className="opacity-50 mr-2">{i + 1}</span>
            {log}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
};

const VirtualCardView = () => {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <CreditCard className="text-bunny-blue" /> 虚拟卡管理
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card Preview */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-2xl h-56 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="flex justify-between items-start z-10">
            <span className="font-bold text-lg tracking-wider">BunnyEra Pay</span>
            <span className="text-sm opacity-80">Virtual Debit</span>
          </div>
          <div className="z-10">
            <div className="text-2xl font-mono tracking-widest mb-2">4892 **** **** 8829</div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs opacity-70">Card Holder</div>
                <div className="font-medium uppercase">Bunny User</div>
              </div>
              <div>
                <div className="text-xs opacity-70">Expires</div>
                <div className="font-medium">12/28</div>
              </div>
            </div>
          </div>
        </div>

        {/* Binding Form */}
        <div className="bg-bunny-card border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">绑定新卡片</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">卡号</label>
              <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-bunny-blue" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">有效期</label>
                <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-bunny-blue" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">CVV</label>
                <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-bunny-blue" placeholder="123" />
              </div>
            </div>
            <button className="w-full bg-bunny-blue hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors mt-2">
              立即绑定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScriptsView = () => {
  const scripts = [
    { id: 1, name: 'Instagram 自动关注脚本', status: 'idle', lastRun: '从未运行' },
    { id: 2, name: 'Facebook 群组发帖助手', status: 'running', lastRun: '10分钟前' },
    { id: 3, name: 'Shopify 竞品数据抓取', status: 'idle', lastRun: '昨天' },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Terminal className="text-green-500" /> 自动化脚本库
      </h2>

      <div className="grid gap-4">
        {scripts.map(script => (
          <div key={script.id} className="bg-bunny-card border border-gray-800 rounded-xl p-5 flex items-center justify-between hover:border-gray-700 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${script.status === 'running' ? 'bg-green-500/10 text-green-500' : 'bg-gray-800 text-gray-400'}`}>
                <Terminal size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white">{script.name}</h3>
                <p className="text-sm text-gray-500">上次运行: {script.lastRun}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {script.status === 'running' ? (
                <span className="flex items-center text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded border border-green-900/50">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  运行中
                </span>
              ) : (
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">空闲</span>
              )}
              <button className={`p-2 rounded-lg transition-colors ${script.status === 'running' ? 'text-red-400 hover:bg-red-900/20' : 'text-bunny-blue hover:bg-blue-900/20'}`}>
                <Play size={20} fill={script.status === 'running' ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [activeModule, setActiveModule] = useState('copy-template');

  const handleLogin = (method: string) => {
    console.log('Logged in via', method);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderSidebarContent = () => {
    switch (activeModule) {
      case 'copy-template':
        return <Chat key="copy" />; // Pass props to set initial mode if needed
      case 'desc-template':
        return <Chat key="desc" />;
      case 'echo-bot':
        return <Chat key="echo" />; // Or a specific EchoBot component
      case 'logs':
        return <LogsView />;
      case 'virtual-card':
        return <VirtualCardView />;
      case 'scripts':
        return <ScriptsView />;
      default:
        return <Chat />;
    }
  };

  const renderContent = () => {
    // Top Level Tabs
    switch (activeTab) {
      case 'chat':
        // In Chat tab, we show the Sidebar-driven content
        return renderSidebarContent();
      case 'tasks': return <div className="p-8 text-white flex items-center justify-center h-full text-lg text-gray-500">🚧 任务中心正在施工中...</div>;
      case 'accounts': return <Accounts />;
      case 'store': return <div className="p-8 text-white flex items-center justify-center h-full text-lg text-gray-500">🚧 商城入口正在施工中...</div>;
      case 'settings': return <div className="p-8 text-white flex items-center justify-center h-full text-lg text-gray-500">🚧 系统设置正在施工中...</div>;
      default: return renderSidebarContent();
    }
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col h-screen bg-bunny-dark overflow-hidden font-sans text-white">
      {/* Window Header (TopNav) */}
      <WindowHeader activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

      {/* Main Layout: Module Taskbar (Sidebar) + Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Module Taskbar - Only show when in Chat/AI tab */}
        {activeTab === 'chat' && (
          <ModuleTaskbar activeModule={activeModule} onModuleChange={setActiveModule} />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative bg-bunny-dark flex flex-col">
          <div className="flex-1 overflow-hidden relative">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Window Footer */}
      <WindowFooter />
    </div>
  );
}

export default App;
