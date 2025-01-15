import { StyleSheet, Text, View, Pressable } from 'react-native';
import pallete from './colors';
import { Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/commonjs/src/types';
import * as math from 'mathjs';
import { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import IonIcons from '@expo/vector-icons/Ionicons';

const Button = ({ label, onPress, customStyle = {} }: { label: string; onPress: () => void; customStyle?: any }) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ color: "#00000023" }}
    style={({ pressed }) => [
      styles.button,
      customStyle,
      pressed && { opacity: 0.8 },
    ]}
  >
    <Text style={customStyle.color === pallete.background ? [styles.buttonText, { color: pallete.background }]: [styles.buttonText, { color: pallete.text }]}>
      {label === "back" ? <IonIcons name="backspace-outline" size={Dimensions.get("window").width / 10} color={pallete.background}  /> : label}
    </Text>
  </Pressable>
);

// add backspace symbol
const buttonRows = [
  ['%', '÷', 'back', 'AC'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function Main({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const [result, setResult] = useState<string>("0");
  useEffect(() => {
    const symbols = ["+", "-", "×", "÷", "%"];
    
    // Check if the last two characters are the same symbol
    if (
      symbols.includes(result.slice(-1)) && 
      result.slice(-1) === result.slice(-2, -1)
    ) {
      setResult(result.slice(0, -1)); // Remove the last symbol
    }
    if (result === "") {
      setResult("0");
    }
    if (symbols.includes(result.slice(0, 1))) {
      setResult(result.slice(1));
    }
  }, [result]);  
  const calculate = () => {
    try {
      const equation = result.replace(/×/g, "*").replace(/÷/g, "/");
      setResult(math.evaluate(equation).toString());
    } catch (error) {
      setResult("Error");
    }
  };
  const handleInfo = () => {
    navigation.navigate("About");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.infoButton} onPress={handleInfo}>
          <Text style={styles.infoText}>
            <Entypo
              name="info-with-circle"
              size={Dimensions.get("window").width / 10}
              color={pallete.text}
            />
          </Text>
        </Pressable>
      </View>
      <View style={styles.resultOuterContainer}>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            {result.length > 7 ? `...${result.slice(-6)}` : result}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {buttonRows.map((row, index) => (
          <View key={index} style={styles.buttonRow}>
            {row.map((label) => (
              <Button
                key={label}
                label={label}
                onPress={() => {
                  if (label === "AC") {
                    setResult("0");
                  } else if (label === "=") {
                    calculate();
                  } else if (label === "back") {
                    setResult(result.slice(0, -1));
                  } else {
                    setResult(result === "0" ? label : result + label);
                  }
                }}
                customStyle={
                  label === "0"
                    ? { width: Dimensions.get("window").width / 2.1 }
                    : ["+", "-", "×", "÷", "%", "=", "AC", "back"].includes(label)
                    ? {
                        backgroundColor: pallete.accent,
                        color: pallete.background,
                      }
                    : {}
                }
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallete.background,
  },
  headerContainer: {
    width: '100%',
    height: '16%',
    color: pallete.text,
    paddingVertical: 25 * Dimensions.get('window').width / 375,
    alignItems: 'flex-end',
  },

  resultOuterContainer: {
    width: '100%',
    height: '16%',
    color: pallete.text,
    padding: 20 * Dimensions.get('window').width / 375,
  },
  result: {
    fontSize: 80 * Dimensions.get('window').width / 375,
    color: pallete.text,
  },
  resultContainer: {
    alignItems: 'flex-end',
  },
  buttonContainer: {
    width: '100%',
    height: '68%',
    gap: 20,
    justifyContent: 'flex-end',
  },
  button: {
    fontSize: 40 * Dimensions.get('window').width / 375,
    padding: 18 * Dimensions.get('window').width / 375,
    width: Dimensions.get('window').width / 4.1,
    color: pallete.text,
    backgroundColor: pallete.surface,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  infoButton: {
    fontSize: 40 * Dimensions.get('window').width / 375,
    padding: 18 * Dimensions.get('window').width / 375,
    width: Dimensions.get('window').width / 6,
    height: Dimensions.get('window').width / 6,
    color: pallete.text,
    justifyContent: 'center',
    marginTop: 20 * Dimensions.get('window').width / 375,
    alignItems: 'center',
    overflow: 'hidden',
  },
  infoText: {
    fontSize: 40 * Dimensions.get('window').width / 375,
    width: Dimensions.get('window').width / 6,
    height: Dimensions.get('window').width / 6,
  },
  buttonText: {
    fontSize: 40 * Dimensions.get('window').width / 375,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 1,
    width: '100%',
  },
});
