import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={{marginBottom: 20}}>Welcome Back</Text>
      <View style={{ gap: 6, width: '100%', marginBottom: 20 }}>
        <TextInput label="Email" style={styles.input} />
        <TextInput label="Password" secureTextEntry style={styles.input} />
      </View>
      <Button mode="contained" onPress={() => console.log('Login')} style={styles.loginButton}>
        LOGIN
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  input: { width: '100%', marginBottom: 12 },
  loginButton: { width: 180, borderRadius: 10 },
});