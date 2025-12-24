import { FileText, Image as ImageIcon, CreditCard, Terminal, Activity, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModuleTaskbarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const moduleItems = [
  { id: 'copy-template', icon: FileText, label: '推广文案模板' },
  { id: 'desc-template', icon: ImageIcon, label: '商品描述模板' },
  { id: 'virtual-card', icon: CreditCard, label: '虚拟卡绑定' },
  { id: 'scripts', icon: Terminal, label: '账号注册脚本' },
  { id: 'logs', icon: Activity, label: '日志查看器' },
  { id: 'echo-bot', icon: MessageCircle, label: 'EchoBot 验证' },
];

export const ModuleTaskbar: React.FC<ModuleTaskbarProps> = ({ activeModule, onModuleChange }) => {
  return (
    <div className="w-60 bg-bunny-darker h-full flex flex-col border-r border-gray-800 flex-shrink-0 z-10 pt-4">
      <div className="px-6 mb-4">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Workspace Tools</h3>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {moduleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onModuleChange(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative text-sm ${
              activeModule === item.id 
                ? 'text-white bg-gray-800' 
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}
          >
            {activeModule === item.id && (
              <motion.div
                layoutId="activeModule"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-bunny-blue rounded-r-full"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <item.icon size={18} className={`relative z-10 ${activeModule === item.id ? 'text-bunny-blue' : 'text-gray-500 group-hover:text-gray-300'}`} />
            <span className="font-medium relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* System Status Mock */}
      <div className="p-4 mt-auto border-t border-gray-800 bg-gray-900/30">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>System Status</span>
            <span className="text-green-400">● Online</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-bunny-blue h-full w-3/4 rounded-full"></div>
        </div>
        <div className="flex justify-between text-[10px] text-gray-600 mt-1">
            <span>CPU: 12%</span>
            <span>Mem: 450MB</span>
        </div>
      </div>
    </div>
  );
};
