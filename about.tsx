import { View, Text, StyleSheet, Pressable } from 'react-native';
import pallete from './colors';
import { Dimensions } from 'react-native';
import * as Linking from 'expo-linking';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
function Social({ href, icon }: { href: string; icon: string; }) {
    
    return (
      <Pressable 
        onPress={() => setTimeout(() => { Linking.openURL(href) }, 1000)}
        style={({ pressed }) => [styles.social, pressed && { opacity: 0.8 }]}
      >
        <View style={styles.social}>
            <FontAwesome6 name={icon} size={Dimensions.get("window").width / 10} color={pallete.background} />
        </View>
      </Pressable>
    );
} 
export default function About() {
  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={{ color: pallete.text }}>Made with </Text>
            <Text style={{ color: pallete.accent }}>{"</>"}</Text>
            <Text style={{ color: pallete.text }}> by </Text>
            <Text style={{ color: pallete.accent }}>Kush Dhingra</Text>
        </View>
        <View style={styles.socialContainer}>
            <Social href="https://github.com/kushdhingra" icon='github' />
            <Social href="https://youtube.com/@kushdhingra" icon='youtube' />
            <Social href="https://www.linkedin.com/in/kush-dhingra-/" icon='linkedin-in' />
            <Social href="https://x.com/thekushdhingra" icon='x-twitter' />
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallete.background,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10 * Dimensions.get('window').scale
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10 * Dimensions.get('window').scale,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    gap: 5,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  social: {
    backgroundColor: pallete.accent,
    color: pallete.background,
    width: 60 * Dimensions.get('window').width / 375,
    height: 60 * Dimensions.get('window').width / 375,
    borderRadius: 15 * Dimensions.get('window').width / 375,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    overflow: "hidden"
  }
});