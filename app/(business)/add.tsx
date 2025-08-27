
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { API_URL } from '@/constants/Api';
import { getToken } from '@/utils/AuthStorage';
import { Colors } from '@/constants/Colors'; // Import Colors

export default function AddBusinessScreen() {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [email, setEmail] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const router = useRouter();


  const handleAddBusiness = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Authentication Error', 'No token found. Please log in again.');
        router.replace('/(auth)/login');
        return;
      }

      const response = await fetch(`${API_URL}/business/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          business_name: businessName,
          business_type: businessType,
          email: email,
          owner_name: ownerName,
        }),
      });

      if (response.ok) {
        router.replace('/(tabs)/home');
      } else {
        const errorData = await response.json();
        Alert.alert('Add Business Failed', errorData.detail || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Add Business Error', 'An unexpected error occurred.');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Add Business</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />
      <TextInput
        style={styles.input}
        placeholder="Business Type"
        value={businessType}
        onChangeText={setBusinessType}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        value={ownerName}
        onChangeText={setOwnerName}
      />
      <Button title="Add Business" onPress={handleAddBusiness} color={Colors.light.tint} />
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
