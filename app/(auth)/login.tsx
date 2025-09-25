import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, TextInput, Button, Text } from 'react-native-paper';
import { useAuthStore } from '@/stores/auth.store';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLoginFormData, userLoginFormSchema } from './models/userLoginFormSchema.model';
import { userLoginFormDefaultValues } from './models/userLoginFormDefaultValues.model';
import { useLoginUser } from '@/queries/auth';
import { Toast } from 'toastify-react-native';

export default function LoginScreen() {
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<UserLoginFormData>({
    resolver: zodResolver(userLoginFormSchema),
    defaultValues: userLoginFormDefaultValues
  });

  const { mutateAsync: loginUserMutateAsync, isPending: isPendingLoginUserMutateAsync } = useLoginUser();

  const onSubmit = async (data: UserLoginFormData) => {
    try {
      const response = await loginUserMutateAsync(data);
      login(response.data);

      Toast.show({
        type: 'success',
        text1: 'Login successful!',
        position: 'bottom',
      });
    } catch (error) {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error.message as string)
          : 'An unexpected error occurred while logging in. Please try again later.';

      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'bottom',
      });
    }
  };

  return (
    <View style={styles.container}>
      {isPendingLoginUserMutateAsync ? (
        <ActivityIndicator animating size={80} />
      ) : (
        <>
          <View style={{ gap: 6, width: '100%', marginBottom: 20 }}>
            <Text variant="headlineLarge" style={{ marginBottom: 20, textAlign: 'center' }}>Welcome Back</Text>
            <Controller
              control={control}
              name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput 
                    label="Email" 
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    disabled={isPendingLoginUserMutateAsync}
                    error={!!errors.email}
                  />
                )}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            ) : null}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput 
                  label="Password" 
                  secureTextEntry 
                  style={styles.input}
                  value={value}
                  onChangeText={onChange}
                  disabled={isPendingLoginUserMutateAsync}
                  error={!!errors.password}
                />
              )}
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            ) : null}
          </View>
          <Button 
            mode="contained" 
            onPress={handleSubmit(onSubmit)} 
            style={styles.loginButton}
            loading={isPendingLoginUserMutateAsync}
            disabled={isPendingLoginUserMutateAsync}
          >
            LOGIN
          </Button>
        </>
      )}
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
  input: { 
    width: '100%', 
    marginBottom: 12 
  },
  loginButton: { 
    width: 180, 
    borderRadius: 10 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8
  }
});