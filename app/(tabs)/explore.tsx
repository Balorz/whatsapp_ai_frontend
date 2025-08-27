import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors'; // Import Colors

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.light.background, dark: Colors.dark.background }}
      headerImage={
        <IconSymbol
          size={310}
          color={Colors.light.icon} // Use themed icon color
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ color: Colors.light.text }}>Explore</ThemedText>
      </ThemedView>
      <ThemedText style={{ color: Colors.light.text }}>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText style={{ color: Colors.light.text }}>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText style={{ color: Colors.light.text }}>
          The layout file in <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link" style={{ color: Colors.light.tint }}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText style={{ color: Colors.light.text }}>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText style={{ color: Colors.light.text }}>
          For static images, you can use the <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link" style={{ color: Colors.light.tint }}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText style={{ color: Colors.light.text }}>
          Open <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono', color: Colors.light.text }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link" style={{ color: Colors.light.tint }}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText style={{ color: Colors.light.text }}>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link" style={{ color: Colors.light.tint }}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText style={{ color: Colors.light.text }}>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText style={{ color: Colors.light.text }}>
              The <ThemedText type="defaultSemiBold" style={{ color: Colors.light.text }}>components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: Colors.light.icon, // Use themed icon color
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
