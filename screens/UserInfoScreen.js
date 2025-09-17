import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function UserInfoScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');

  const saveProfile = async () => {
    const profile = { name, age, phone, gender, activity };
    await AsyncStorage.setItem('profile', JSON.stringify(profile));
    navigation.replace('Confirmation', { name: name || 'Friend' });
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ padding: 18 ,marginTop:30}}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Akash Raj" />

        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="number-pad" placeholder="30" />

        <Text style={styles.label}>Phone</Text>
        <TextInput style={styles.input} value={phone} maxLength={10} onChangeText={setPhone} keyboardType="phone-pad" placeholder="123-456-7890" />

        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Male / Female / Other" />

        <Text style={styles.label}>Activity Level</Text>
        <TextInput style={styles.input} value={activity} onChangeText={setActivity} placeholder="Low / Moderate / High" />

        <TouchableOpacity style={styles.saveBtn} onPress={saveProfile} activeOpacity={0.85}>
          <Text style={styles.saveText}>Save & Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FB' },
  label: { fontSize: 15, fontWeight: '700', marginTop: 14, color: '#222' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 8
  },
  saveBtn: {
    marginTop: 28,
    backgroundColor: '#6A5ACD',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center'
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 }
});
