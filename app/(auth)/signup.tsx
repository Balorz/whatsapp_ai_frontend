import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { API_URL } from '@/constants/Api';
import { Colors } from '@/constants/Colors'; // Import Colors
import { saveToken } from '@/utils/AuthStorage';

export default function SignupScreen() {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [phoneNumberId, setPhoneNumberId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_URL}/signup/tenant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          whatsapp_number: whatsappNumber,
          phone_number_id: phoneNumberId,
          access_token: accessToken,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup response data:', data); // Added log
        console.log('Access Token:', data.access_token); // Added log
        await saveToken(data.access_token); // Assuming the token is in data.access_token
        router.replace('/(business)/add');
      } else {
        const errorData = await response.json();
        Alert.alert('Signup Failed', errorData.detail || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Signup Error', 'An unexpected error occurred.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Signup</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Whatsapp Number"
        value={whatsappNumber}
        onChangeText={setWhatsappNumber}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number ID"
        value={phoneNumberId}
        onChangeText={setPhoneNumberId}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Access Token"
        value={accessToken}
        onChangeText={setAccessToken}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={handleSignup} color={Colors.light.tint} />
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
