// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
    Image,
} from 'react-native';
import { spacing, typography } from '../theme';
import { useAuth } from '../context/AuthContext';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
// Required for expo-auth-session
WebBrowser.maybeCompleteAuthSession();

// Google OAuth Configuration
const googleConfig = {
  clientId: '364272743866-dbjls1noerhusrnll8bq0fvq1gj1827i.apps.googleusercontent.com',
  scopes: ['openid', 'profile', 'email'],
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  const { colors, isDarkMode } = useTheme();


  // Google OAuth setup
  const [googleRequest, googleResponse, googlePromptAsync] = AuthSession.useAuthRequest(
    {
      clientId: googleConfig.clientId,
      scopes: googleConfig.scopes,
      responseType: AuthSession.ResponseType.Token,
      redirectUri: AuthSession.makeRedirectUri({
        useProxy: true, // Use Expo's proxy for development
      }),
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    }
  );

  // Handle Google OAuth response
  useEffect(() => {
    if (googleResponse?.type === 'success') {
      handleGoogleSuccess(googleResponse.params.access_token);
    } else if (googleResponse?.type === 'error') {
      setGoogleLoading(false);
      Alert.alert('Google Sign-In Error', googleResponse.error?.message || 'Authentication failed');
    } else if (googleResponse?.type === 'cancel') {
      setGoogleLoading(false);
    }
  }, [googleResponse]);

  const handleGoogleSuccess = async (accessToken) => {
    try {
      // Fetch user info from Google
      const userInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
      );
      const userInfo = await userInfoResponse.json();

      console.log('Google User Info:', userInfo);

      // Create Google user object
      const googleUser = {
        id: `google_${userInfo.id}`,
        name: userInfo.name,
        email: userInfo.email,
        avatar: userInfo.picture,
        provider: 'Google',
        loginTime: new Date().toISOString(),
      };

      // Use AuthContext login with OAuth data
      const result = await login(userInfo.email, 'google_oauth', googleUser);
      
      if (result.success) {
        Alert.alert(
          'Google Sign-In Successful!', 
          `Welcome ${userInfo.name}!\n\nYou're now signed in with your Google account.`,
          [{ text: 'Continue' }]
        );
      } else {
        Alert.alert('Error', 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google OAuth Error:', error);
      Alert.alert('Error', 'Failed to get user information from Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.error);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@cicgroup.co.ke');
    setPassword('demo123');
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    googlePromptAsync().catch(() => {
      setGoogleLoading(false);
      Alert.alert('Error', 'Failed to open Google sign-in');
    });
  };

  // Quick demo with API (fallback)
  const handleQuickDemo = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const userData = await response.json();
      
      const demoUser = {
        id: `demo_${userData.id}`,
        name: userData.name,
        email: userData.email.toLowerCase(),
        provider: 'Demo API',
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=4CAF50&color=fff`,
        loginTime: new Date().toISOString(),
      };

      const result = await login(demoUser.email, 'demo123', demoUser);
      
      if (result.success) {
        Alert.alert('Demo Login Success!', `Welcome ${demoUser.name}!`);
      }
    } catch (error) {
      Alert.alert('Error', 'Demo API failed');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.screenPadding,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    color: colors.white,
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
  },
  logoSubtext: {
    color: colors.accent,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 2,
  },
  welcomeText: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  // OAuth Styles
  oauthContainer: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  demoApiButton: {
    backgroundColor: colors.success,
  },
  oauthIcon: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginRight: spacing.sm,
    width: 24,
    textAlign: 'center',
  },
  oauthButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  // Divider Styles
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray300,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },
  // Form Styles
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    backgroundColor: colors.gray400,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  demoButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  demoButtonDisabled: {
    backgroundColor: colors.gray300,
  },
  demoButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },

    logoImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
    },
    logoImage: {
        width: 120,
        height: 120,
        borderRadius: 20,
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
        // add padding space on top and bottom
        paddingVertical: spacing.lg,
    },
});

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >


      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo Area */}
       <View style={styles.logoImageContainer}>
            <Image 
              source={require('../../assets/cic-logo.png')} // Adjust path as needed
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        {/* OAuth Buttons */}
        <View style={styles.oauthContainer}>
          {/* Real Google OAuth */}
          <TouchableOpacity 
            style={[styles.oauthButton, styles.googleButton]}
            onPress={handleGoogleLogin}
            disabled={!googleRequest || googleLoading || isLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                <Text style={styles.oauthIcon}>G</Text>
                <Text style={styles.oauthButtonText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Quick Demo (No Setup Required) */}
          <TouchableOpacity 
            style={[styles.oauthButton, styles.demoApiButton]}
            onPress={handleQuickDemo}
            disabled={isLoading || googleLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                <Text style={styles.oauthIcon}>🚀</Text>
                <Text style={styles.oauthButtonText}>Quick Demo (API)</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Form Area */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!googleLoading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!googleLoading}
            />
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, (isLoading || googleLoading) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading || googleLoading}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Demo Login Button */}
          <TouchableOpacity 
            style={[styles.demoButton, (isLoading || googleLoading) && styles.demoButtonDisabled]}
            onPress={handleDemoLogin}
            disabled={isLoading || googleLoading}
          >
            <Text style={styles.demoButtonText}>Use Demo Account</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {googleRequest ? 'Real Google OAuth Ready! 🎉' : 'Setting up Google OAuth...'}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

