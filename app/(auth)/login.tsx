
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { API_URL } from '@/constants/Api';
import { saveToken } from '@/utils/AuthStorage';
import { Colors } from '@/constants/Colors'; // Import Colors

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phoneNumber, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login response data:', data); // Added log
        console.log('Access Token:', data.access_token); // Added log
        await saveToken(data.access_token); // Assuming the token is in data.access_token
        router.replace('/(tabs)');
      } else {
        const errorData = await response.json();
        Alert.alert('Login Failed', errorData.detail || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Login Error', 'An unexpected error occurred.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} color={Colors.light.tint} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: Colors.light.tint,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.light.text,
  },
});
