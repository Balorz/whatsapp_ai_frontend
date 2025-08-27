
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function EmbeddedSignupScreen() {
  const router = useRouter();

  // TODO: Replace with the actual embedded signup URL from the backend
  const embeddedSignupUrl = 'https://your-embedded-signup-url.com';

  const handleWebViewMessage = (event: any) => {
    if (event.nativeEvent.data === 'signup-complete') {
      router.replace('/(business)/add');
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <WebView
        source={{ uri: embeddedSignupUrl }}
        onMessage={handleWebViewMessage}
      />
    </ThemedView>
  );
}
