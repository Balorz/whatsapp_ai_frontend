
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, Button } from 'react-native';

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome</ThemedText>
      <Link href="/(auth)/embedded-signup" asChild>
        <Button title="Embedded Signup" />
      </Link>
      <Link href="/(auth)/signup" asChild>
        <Button title="Signup" />
      </Link>
      <Link href="/(auth)/login" asChild>
        <Button title="Login" />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});
