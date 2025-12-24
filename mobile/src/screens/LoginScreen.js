import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { loginEmail } from '../services/api';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginEmail(email, password);
      const { token, user, prompt } = response.data;
      
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('user', JSON.stringify(user));

      Alert.alert('登录成功', prompt, [
          { text: '好的', onPress: () => navigation.replace('Home') }
      ]);
    } catch (error) {
      Alert.alert('登录失败', error.response?.data?.error || '网络错误');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🐇</Text>
        <Text style={styles.title}>BunnyEra 登录</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="请输入邮箱"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="请输入密码"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>登录</Text>
        </TouchableOpacity>

        <Text style={styles.hint}>还没有账号？请联系管理员或使用网页版注册</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5', // 浅粉色
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#6A0DAD',
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: '#FF69B4', // 亮粉色
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
  }
});
