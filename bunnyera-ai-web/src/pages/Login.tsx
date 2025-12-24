import React, { useState } from 'react';
import { Mail, Shield, User, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (method: 'email' | 'matrix' | 'guest') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [method, setMethod] = useState<'email' | 'matrix'>('email');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (!email) return;
    setLoading(true);
    // Mock sending code
    setTimeout(() => {
      setLoading(false);
      setStep('code');
    }, 1500);
  };

  const handleLogin = () => {
    setLoading(true);
    // Mock login verification
    setTimeout(() => {
      setLoading(false);
      try {
        const token = 'dev-token';
        localStorage.setItem('token', token);
      } catch {}
      onLogin(method);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bunny-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-tr from-bunny-blue to-cyan-400 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-bunny-blue/20 mb-6">
             <span className="text-4xl">🐰</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">BunnyEra AI</h1>
          <p className="text-gray-400">Login to access your workspace</p>
        </div>

        <div className="bg-bunny-card border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Method Toggle */}
          <div className="flex bg-gray-800/50 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setMethod('email')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                method === 'email' ? 'bg-bunny-blue text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              邮箱验证
            </button>
            <button 
              onClick={() => setMethod('matrix')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                method === 'matrix' ? 'bg-bunny-blue text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Matrix 账号
            </button>
          </div>

          <div className="space-y-6">
            {method === 'email' ? (
              <>
                {step === 'email' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">邮箱地址</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@bunnyera.org"
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-bunny-blue focus:ring-1 focus:ring-bunny-blue transition-all outline-none"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleSendCode}
                      disabled={!email || loading}
                      className="w-full bg-bunny-blue hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span>发送中...</span>
                      ) : (
                        <>
                          <span>发送验证码</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">输入验证码</label>
                      <div className="relative">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input 
                          type="text" 
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="123456"
                          className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-bunny-blue focus:ring-1 focus:ring-bunny-blue transition-all outline-none tracking-widest text-center text-lg"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2 text-center">验证码已发送至 {email}</p>
                    </div>
                    <button 
                      onClick={handleLogin}
                      disabled={!code || loading}
                      className="w-full bg-bunny-blue hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                      {loading ? '登录中...' : '确认登录'}
                    </button>
                    <button 
                      onClick={() => setStep('email')}
                      className="w-full text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      返回修改邮箱
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Matrix ID</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="text" 
                      placeholder="@user:bunnyera.matrix"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:border-bunny-blue focus:ring-1 focus:ring-bunny-blue transition-all outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">密码</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:border-bunny-blue focus:ring-1 focus:ring-bunny-blue transition-all outline-none"
                  />
                </div>
                <button 
                  onClick={() => onLogin('matrix')}
                  className="w-full bg-bunny-blue hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                >
                  Matrix 登录
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-4">
          <button 
            onClick={() => onLogin('guest')}
            className="text-gray-500 hover:text-white text-sm transition-colors flex items-center space-x-2"
          >
            <span>游客模式试用 (不保存记录)</span>
            <ArrowRight size={14} />
          </button>
          
          <div className="flex items-center space-x-6 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400">注册新账号</a>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <a href="#" className="hover:text-gray-400">忘记密码</a>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <a href="#" className="hover:text-gray-400">隐私政策</a>
          </div>
        </div>
      </div>
    </div>
  );
};
