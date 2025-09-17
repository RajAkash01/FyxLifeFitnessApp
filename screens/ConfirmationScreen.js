import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ConfirmationScreen({ route, navigation }) {
  const name = route.params?.name || 'Friend';

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(1500)} style={styles.box}>
        <Ionicons name="checkmark-circle-outline" size={80} color="#6A5ACD" />
        <Text style={styles.title}>Hi {name}, your profile is ready 🎉</Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Dashboard')} activeOpacity={0.85}>
          <Text style={styles.btnText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FB', justifyContent: 'center', alignItems: 'center' },
  box: { backgroundColor: '#fff', padding: 26, borderRadius: 18, alignItems: 'center', elevation: 3,margin:25 },
  title: { marginTop: 16, fontSize: 20, fontWeight: '800', color: '#222', textAlign: 'center' },
  btn: { marginTop: 20, backgroundColor: '#6A5ACD', paddingVertical: 12, paddingHorizontal: 34, borderRadius: 14 },
  btnText: { color: '#fff', fontWeight: '700' }
});
