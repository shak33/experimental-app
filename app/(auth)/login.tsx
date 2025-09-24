import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useAuthStore } from '@/stores/auth.store';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const onLoginPress = () => {
    login(email, true);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={{marginBottom: 20}}>Welcome Back</Text>
      <View style={{ gap: 6, width: '100%', marginBottom: 20 }}>
        <TextInput 
          label="Email" 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput 
          label="Password" 
          secureTextEntry 
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button mode="contained" onPress={onLoginPress} style={styles.loginButton}>
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