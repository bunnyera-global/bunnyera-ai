# BunnyEra Assistant Mobile App

这是一个基于 React Native (Expo) 构建的移动端应用。

## 目录结构

- `App.js`: 应用入口与路由配置
- `app.json`: Expo 应用配置 (Logo, 启动图, Android/iOS 设置)
- `src/screens/`: 页面文件 (Splash, Login, Home)
- `src/services/`: API 服务文件
- `src/components/`: 可复用组件

## 快速开始

1. **进入目录**
   ```bash
   cd mobile
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动应用**
   ```bash
   npx expo start
   ```
   - 按 `a` 在 Android 模拟器运行
   - 按 `i` 在 iOS 模拟器运行
   - 使用 Expo Go App 扫描二维码在真机运行

## 品牌化配置

- 修改 `app.json` 中的 `backgroundColor` 和 `image` 路径来自定义启动页。
- 替换 `assets/` 目录下的 `icon.png` 和 `splash.png` 为 BunnyEra 的品牌素材。

## 构建 APK (Android)

1. 安装 EAS CLI:
   ```bash
   npm install -g eas-cli
   ```

2. 登录 Expo 账号:
   ```bash
   eas login
   ```

3. 配置构建:
   ```bash
   eas build:configure
   ```

4. 构建 APK:
   ```bash
   eas build -p android --profile preview
   ```

构建完成后，你会获得一个下载链接，下载并安装到 Android 手机即可。
