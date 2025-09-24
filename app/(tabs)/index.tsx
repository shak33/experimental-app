import { StyleSheet, View } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useAuthStore } from '@/stores/auth.store';

export default function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  console.log('isAuthenticated', isAuthenticated);

  const onLogoutPress = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={{marginBottom: 20}}>
        Welcome Back, {user?.email}
      </Text>
      <Card style={styles.userCard}>
        <Card.Content>
          <Text variant="titleMedium" style={{marginBottom: 10}}>Dane użytkownika:</Text>
          <Text variant="bodyMedium">Email: {user?.email}</Text>
          <Text variant="bodyMedium">Nick: {user?.username}</Text>
          <Text variant="bodySmall" style={{marginTop: 10, opacity: 0.7}}>
            Token: {user?.token?.substring(0, 20)}...
          </Text>
          <Text variant="bodySmall" style={{opacity: 0.7}}>
            is isAuthenticated {isAuthenticated ? 'true' : 'false'}
          </Text>
          <Button mode="contained" onPress={onLogoutPress} style={styles.button}>
            Logout
          </Button>
        </Card.Content>
      </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  userCard: {
    width: '100%',
    marginBottom: 20,
  },
  button: { marginTop: 20 },
});
