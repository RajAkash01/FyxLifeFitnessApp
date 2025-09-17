import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProgressScreen() {
  const plan = { daily: 3, weekly: 21, monthly: 90 };
  const done = { daily: 2, weekly: 15, monthly: 60 };

  const metrics = [
    { label: 'Today', done: done.daily, plan: plan.daily },
    { label: 'This Week', done: done.weekly, plan: plan.weekly },
    { label: 'This Month', done: done.monthly, plan: plan.monthly }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={styles.title}>Progress Overview</Text>
        {metrics.map(m => {
          const pct = m.plan === 0 ? 0 : Math.round((m.done / m.plan) * 100);
          return (
            <View style={styles.card} key={m.label}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.label}>{m.label}</Text>
                <Text style={styles.pct}>{pct}%</Text>
              </View>
              <Text style={styles.sub}>{`${m.done} of ${m.plan} goals`}</Text>
              <View style={styles.progressBg}><View style={[styles.progressFill, { width: `${pct}%`}]} /></View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FB' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 16, color: '#222' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 14, marginBottom: 14, elevation: 3 },
  label: { fontSize: 18, fontWeight: '700' },
  pct: { fontWeight: '800', color: '#6A5ACD' },
  sub: { color: '#666', marginTop: 6 },
  progressBg: { height: 14, backgroundColor: '#eee', borderRadius: 8, overflow: 'hidden', marginTop: 10 },
  progressFill: { height: 14, backgroundColor: '#6A5ACD' }
});
