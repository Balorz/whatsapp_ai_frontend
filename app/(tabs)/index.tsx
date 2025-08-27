import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors'; // Import Colors

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.background }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: Colors.light.text }}>Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ color: Colors.light.text }}>Step 1: Try it</ThemedText>
        <ThemedText style={{ color: Colors.light.text }}>
          Edit <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ color: Colors.light.text }}>Step 2: Explore</ThemedText>
        <ThemedText style={{ color: Colors.light.text }}>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ color: Colors.light.text }}>Step 3: Get a fresh start</ThemedText>
        <ThemedText style={{ color: Colors.light.text }}>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
