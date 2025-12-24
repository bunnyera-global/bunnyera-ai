import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { checkIn, getPoints, generateCopy } from '../services/api';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen({ navigation }) {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPoints = async () => {
    try {
      const res = await getPoints();
      setPoints(res.data.points);
    } catch (error) {
      console.log('获取积分失败');
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      const res = await checkIn();
      Alert.alert('签到结果', res.data.prompt);
      fetchPoints();
    } catch (error) {
      Alert.alert('哎呀', error.response?.data?.message || '签到失败了');
    }
    setLoading(false);
  };

  const handleGenerateCopy = async () => {
      Alert.alert('AI 文案生成', '即将为你生成一条跨境电商文案...', [
          { text: '取消', style: 'cancel'},
          { text: '生成', onPress: async () => {
              try {
                  const res = await generateCopy('夏季凉鞋', 'Instagram');
                  Alert.alert('生成成功 🐰', res.data.result);
              } catch (e) {
                  Alert.alert('错误', '生成失败');
              }
          }}
      ]);
  };

  const handleLogout = async () => {
      await SecureStore.deleteItemAsync('token');
      navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Hi, 跨境卖家 🐰</Text>
        <View style={styles.pointsCard}>
            <Text style={styles.pointsLabel}>当前积分</Text>
            <Text style={styles.pointsValue}>{points}</Text>
            <Text style={styles.pointsHint}>✨ 积分可兑换好礼</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={handleCheckIn} disabled={loading}>
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardTitle}>每日签到</Text>
            <Text style={styles.cardDesc}>领取今日好运</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleGenerateCopy}>
            <Text style={styles.cardIcon}>✍️</Text>
            <Text style={styles.cardTitle}>AI 文案</Text>
            <Text style={styles.cardDesc}>自动生成推广语</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
            <Text style={styles.cardIcon}>💬</Text>
            <Text style={styles.cardTitle}>客服助手</Text>
            <Text style={styles.cardDesc}>联系小兔子尹楠</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
            <Text style={styles.cardIcon}>📦</Text>
            <Text style={styles.cardTitle}>物流查询</Text>
            <Text style={styles.cardDesc}>追踪包裹状态</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6A0DAD', // 紫色背景
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  welcome: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    opacity: 0.9,
  },
  pointsCard: {
    alignItems: 'center',
  },
  pointsLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  pointsValue: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  pointsHint: {
    color: '#FFC0CB',
    marginTop: 5,
  },
  grid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: -30,
  },
  card: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDesc: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  logoutBtn: {
      margin: 20,
      alignItems: 'center',
  },
  logoutText: {
      color: '#999',
  }
});
