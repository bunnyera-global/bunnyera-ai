// API base url from env or fallback
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001';

export const generateContent = async (
  type: 'copy' | 'desc' | 'imagePrompt', 
  payload: { title?: string; audience?: string; style?: string }
) => {
  try {
    // 尝试调用真实后端
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({
        topic: payload.title, // Map frontend 'title' to backend 'topic'
        platform: 'General',
        language: 'Chinese'
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    
    // 后端返回结构: { result: "...", message: "..." }
    // 我们需要适配前端结构: { content: "...", imagePrompt: "..." }
    return {
      content: data.result,
      imagePrompt: `High quality photography of ${payload.title}, professional lighting` // 后端暂未返回 prompt，前端自己拼接
    };

  } catch (error) {
    console.warn('AI API Call failed, falling back to mock:', error);
    
    // 降级：使用 Mock 数据
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (type === 'copy') {
      return {
        content: `【${payload.title || '新品'}】🔥 跨境爆款推荐！(离线模式)\n\n专为${payload.audience || '时尚达人'}打造，${payload.style || '简约'}风格设计，不仅提升生活品质，更是你的不二之选！✨\n\n👉 点击链接立即购买，限时优惠不容错过！ #跨境电商 #好物推荐\n(注意：后端连接失败，此为模拟数据)`,
        imagePrompt: `High quality product photography of ${payload.title}, ${payload.style} style, professional lighting, 4k resolution`
      };
    }
    
    return {
      content: "Generated content placeholder (Offline).",
      imagePrompt: "Placeholder image prompt"
    };
  }
};
