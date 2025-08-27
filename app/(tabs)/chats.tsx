import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useEffect, useState, useCallback } from 'react';
import { API_URL } from '@/constants/Api';
import { getToken } from '@/utils/AuthStorage';

export default function ChatsScreen() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchConversations = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Authentication Error', 'No token found. Please log in again.');
        router.replace('/(auth)/login');
        return;
      }

      const response = await fetch(`${API_URL}/conversations/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Conversations data received:', data); // Added for debugging
        if (data && Array.isArray(data.conversations)) {
          setConversations(data.conversations);
        } else if (Array.isArray(data)) {
          setConversations(data);
        } else {
          console.warn('Unexpected API response format for conversations:', data);
          setConversations([]);
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Failed to fetch conversations', errorData.detail || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Fetch Conversations Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchConversations(); // Initial fetch

    const intervalId = setInterval(fetchConversations, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [fetchConversations]);

  const renderItem = ({ item }: { item: any }) => (
    <Link href={`/(chat)/${item.id}`} asChild>
      <TouchableOpacity style={styles.itemContainer}>
        <ThemedText type="subtitle" style={{ color: Colors.light.text }}>{item.contact_info?.wa_phone_hash || item.contact_id}</ThemedText>
        <ThemedText style={{ color: Colors.light.text }}>{item.last_message?.content?.text || 'No messages yet'}</ThemedText>
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id || item._id}
        />
      ) : (
        <ThemedText style={{ color: Colors.light.text, textAlign: 'center', marginTop: 20 }}>No conversations found.</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.tint + '30', // A lighter shade of tint
    backgroundColor: Colors.light.background,
  },
});
