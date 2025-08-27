import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, TextInput, Button, FlatList, Text, ActivityIndicator, Alert } from 'react-native';
import { API_URL } from '@/constants/Api';
import { getToken } from '@/utils/AuthStorage';
import { Colors } from '@/constants/Colors';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    if (!id) return;

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Authentication Error', 'No token found. Please log in again.');
        return;
      }

      const response = await fetch(`${API_URL}/conversations/${id}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Messages data received:', data); // Debugging
        if (data && Array.isArray(data.messages)) {
          setMessages(data.messages.reverse()); // Reverse to show latest at bottom
        } else if (Array.isArray(data)) {
          setMessages(data.reverse());
        } else {
          console.warn('Unexpected API response format for messages:', data);
          setMessages([]);
        }
      } else {
        const errorData = await response.json();
        Alert.alert('Failed to fetch messages', errorData.detail || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Fetch Messages Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 3000); // Poll every 3 seconds
    return () => clearInterval(intervalId);
  }, [fetchMessages]);

  const handleSend = async () => {
    if (!message.trim() || !id) return;

    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Authentication Error', 'No token found. Please log in again.');
        return;
      }

      const payload = {
        conversation_id: id,
        content: { text: message.trim() },
        // Add other necessary fields like sender_id, recipient_id if needed by backend
      };

      const response = await fetch(`${API_URL}/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage('');
        fetchMessages(); // Refresh messages after sending
      } else {
        const errorData = await response.json();
        Alert.alert('Failed to send message', errorData.detail || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Send Message Error', 'An unexpected error occurred.');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <ThemedView style={[styles.messageContainer, item.direction === 'outbound' ? styles.myMessage : styles.otherMessage]}>
      <ThemedText style={{ color: Colors.light.text }}>{item.content?.text}</ThemedText>
    </ThemedView>
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
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || item._id}
        inverted
      />
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={Colors.light.text + '80'}
        />
        <Button title="Send" onPress={handleSend} color={Colors.light.tint} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: Colors.light.tint + '30',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: Colors.light.background,
    alignSelf: 'flex-start',
    borderColor: Colors.light.tint + '30',
    borderWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.light.tint + '30',
    backgroundColor: Colors.light.background,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: Colors.light.tint,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    paddingHorizontal: 8,
    color: Colors.light.text,
  },
});