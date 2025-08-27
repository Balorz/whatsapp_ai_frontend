
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { API_URL } from '@/constants/Api';
import { getToken } from '@/utils/AuthStorage';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors'; // Import Colors

export default function HomeScreen() {
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = await getToken();
        if (!token) {
          Alert.alert('Authentication Error', 'No token found. Please log in again.');
          router.replace('/(auth)/login');
          return;
        }

        const response = await fetch(`${API_URL}/business/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Business data received:', data); // Added for debugging
          setBusiness(data);
        } else {
          const errorData = await response.json();
          Alert.alert('Failed to fetch business', errorData.detail || 'Something went wrong');
        }
      } catch (error) {
        Alert.alert('Fetch Business Error', 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {business ? (
        <>
          <ThemedText type="title" style={{ color: Colors.light.text }}>{business.business_name}</ThemedText>
          <ThemedText style={{ color: Colors.light.text }}>{business.business_type}</ThemedText>
        </>
      ) : (
        <ThemedText style={{ color: Colors.light.text }}>No business found.</ThemedText>
      )}
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
});
