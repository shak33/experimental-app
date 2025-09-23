import { StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { ThemedView } from '@/components/themed-view';

export default function RegisterScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text variant="headlineLarge" style={{marginBottom: 20}}>Create an account</Text>
      <ThemedView style={{ gap: 6, width: '100%', marginBottom: 20 }}>
        <TextInput label="Email" style={styles.input} />
        <TextInput label="Password" secureTextEntry style={styles.input} />
      </ThemedView>

      <Button mode="contained" onPress={() => console.log('Register')}>
        Sign Up
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: { width: '100%', marginBottom: 12 }
});