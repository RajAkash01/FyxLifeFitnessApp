import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#8A2BE2', '#6A5ACD']} style={styles.gradient}>
        <View style={styles.inner}>
          <Ionicons name="fitness" size={100} color="#fff" />
          <Text style={styles.title}>Welcome to Fyxlife 🌱</Text>
          <Text style={styles.subtitle}>Small steps. Lifelong change.</Text>

          <TouchableOpacity
            style={styles.getStartedBtn}
            onPress={() => navigation.replace('UserInfo')}
            activeOpacity={0.85}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inner: { alignItems: 'center', paddingHorizontal: 24 },
  title: { fontSize: 32, fontWeight: '800', color: '#fff', marginTop: 20, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#f0eefe', marginTop: 8, textAlign: 'center' },
  getStartedBtn: {
    marginTop: 36,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 34,
    borderRadius: 20
  },
  getStartedText: { color: '#6A5ACD', fontWeight: '700', fontSize: 16 }
});
