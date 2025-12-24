import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // 3秒后跳转到登录页
      setTimeout(() => {
        navigation.replace('Login');
      }, 3000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* 模拟 Bunny Logo */}
        <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>🐇</Text>
        </View>
        <Text style={styles.title}>BunnyEra Assistant</Text>
        
        <View style={styles.messageBox}>
            <Text style={styles.message}>欢迎来到 BunnyEra Assistant 🐇</Text>
            <Text style={styles.message}>我是蹦蹦跳跳的小兔子尹楠～</Text>
            <Text style={styles.message}>每天签到都有小礼物 🎁</Text>
            <Text style={styles.message}>让我帮你轻松搞定跨境电商的烦恼吧！</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC0CB', // 粉色背景
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  logoText: {
    fontSize: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  messageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6A0DAD', // 紫色文字
    marginBottom: 5,
    textAlign: 'center',
  }
});
