import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 64) / 2;

export default function DashboardScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState([
    { id: 'g1', title: 'Steps', current: 6000, target: 10000 },
    { id: 'g2', title: 'Water', current: 5, target: 8 },
    { id: 'g3', title: 'Sleep', current: 7, target: 8 }
  ]);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem('profile');
      setProfile(raw ? JSON.parse(raw) : null);
    })();
  }, []);

  const widgetData = [
    { key: 'w1', iconLib: Ionicons, icon: 'bed-outline', label: 'Sleep', value: '7h', gradient: ['#8A2BE2', '#6A5ACD'] },
    { key: 'w2', iconLib: MaterialCommunityIcons, icon: 'water', label: 'Water', value: '5/8', gradient: ['#00BFFF', '#1E90FF'] },
    { key: 'w3', iconLib: MaterialCommunityIcons, icon: 'walk', label: 'Steps', value: '6,000', gradient: ['#32CD32', '#3CB371'] },
    { key: 'w4', iconLib: FontAwesome5, icon: 'fire', label: 'Calories', value: '500 kcal', gradient: ['#FF7F50', '#FF6347'] }
  ];
  const handleLogout=()=>{
    Alert.alert('Logout','Are you sure you want to logout?',
        [
            {
              text: 'Yes',
              onPress: async() => {
                try {
                    await AsyncStorage.removeItem('profile');
                    navigation.replace('Welcome');
                  } catch (error) {
                    console.error('Error logging out:', error);
                  }
              },
            },
            {
              text: 'No',
              onPress: () => {
                //Do nothings
              },
            },
          ]
      )
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 18 }}>
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>Hi, {profile?.name || 'Friend'}</Text>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={[styles.logoutBtn,{marginRight:10}]} onPress={() => handleLogout()}>
          <AntDesign name="logout" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.progressBtn} onPress={() => navigation.navigate('Progress')}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>Progress</Text>
          </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Wellness Widgets</Text>
        <View style={styles.widgetGrid}>
          {widgetData.map(w => {
            const Icon = w.iconLib;
            return (
              <LinearGradient key={w.key} colors={w.gradient} style={styles.widgetCard}>
                <Icon name={w.icon} size={26} color="#fff" />
                <Text style={styles.widgetLabel}>{w.label}</Text>
                <Text style={styles.widgetValue}>{w.value}</Text>
              </LinearGradient>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Goals</Text>
        <View>
          {goals.map(g => {
            const pct = Math.round((g.current / g.target) * 100);
            return (
              <View key={g.id} style={styles.goalCard}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.goalTitle}>{g.title}</Text>
                  <Text style={styles.goalPct}>{pct}%</Text>
                </View>
                <Text style={styles.goalSub}>{`${g.current} / ${g.target}`}</Text>
                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, { width: `${pct}%` }]} />
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ marginTop: 22 }}>
          <Text style={styles.sectionTitle}>Risk-o-meter</Text>
          <View style={styles.riskPreview}>
            <Text style={styles.riskLabel}>Cardio — Heart Disease</Text>
            <Text style={[styles.riskLevel, { color: '#FFA500' }]}>Medium</Text>
          </View>
          <View style={styles.riskPreview}>
            <Text style={styles.riskLabel}>Metabolic — Type 2 Diabetes</Text>
            <Text style={[styles.riskLevel, { color: '#4CAF50' }]}>Low</Text>
          </View>

          <TouchableOpacity style={styles.viewRiskBtn} onPress={() => navigation.navigate('Risk')}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>View Full Risk Report</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FB' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#222' },
  progressBtn: { backgroundColor: '#6A5ACD', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  logoutBtn: { backgroundColor: '#6A5ACD', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  sectionTitle: { marginTop: 8, fontSize: 20, fontWeight: '800', color: '#222' },

  widgetGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 12 },
  widgetCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.9,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    justifyContent: 'space-between',
    elevation: 4
  },
  widgetLabel: { color: '#fff', fontWeight: '700', marginTop: 6 },
  widgetValue: { color: '#fff', fontSize: 18, fontWeight: '800' },

  goalCard: { backgroundColor: '#fff', padding: 14, borderRadius: 14, marginTop: 12, elevation: 3 },
  goalTitle: { fontSize: 18, fontWeight: '700' },
  goalPct: { fontSize: 18, fontWeight: '800', color: '#6A5ACD' },
  goalSub: { color: '#666', marginTop: 6 },
  progressBg: { height: 12, backgroundColor: '#eee', borderRadius: 8, overflow: 'hidden', marginTop: 10 },
  progressFill: { height: 12, backgroundColor: '#6A5ACD' },

  riskPreview: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 2 },
  riskLabel: { fontWeight: '700' },
  riskLevel: { fontWeight: '800' },

  viewRiskBtn: { marginTop: 12, backgroundColor: '#8A2BE2', paddingVertical: 12, borderRadius: 14, alignItems: 'center' }
});
