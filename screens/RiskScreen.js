import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function RiskScreen() {
  const groups = [
    { system: 'Cardio', items: [{ name: 'Heart Disease', level: 'medium' }, { name: 'Hypertension', level: 'medium' }] },
    { system: 'Metabolic', items: [{ name: 'Type 2 Diabetes', level: 'low' }] },
    { system: 'Respiratory', items: [{ name: 'Asthma', level: 'low' }] }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <Text style={styles.title}>Risk-o-meter Report</Text>
        {groups.map(g => (
          <View key={g.system} style={{ marginBottom: 18 }}>
            <Text style={styles.groupTitle}>{g.system}</Text>
            {g.items.map(it => (
              <View key={it.name} style={[styles.riskCard, { borderLeftColor: it.level === 'high' ? '#FF4C4C' : it.level === 'medium' ? '#FFA500' : '#4CAF50' }]}>
                <Text style={styles.riskName}>{it.name}</Text>
                <Text style={styles.riskLevel}>{it.level.charAt(0).toUpperCase() + it.level.slice(1)}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FB' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 12, color: '#222' },
  groupTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },

  riskCard: { backgroundColor: '#fff', padding: 14, borderRadius: 14, marginBottom: 10, borderLeftWidth: 6, elevation: 2 },
  riskName: { fontSize: 16, fontWeight: '700' },
  riskLevel: { marginTop: 6, fontWeight: '700' }
});
