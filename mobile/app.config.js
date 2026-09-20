const appEnv = process.env.EXPO_PUBLIC_APP_ENV || process.env.APP_ENV || 'development';
const defaultApiUrl = ['production', 'staging'].includes(appEnv)
  ? 'https://www.ampratorshipping.com'
  : 'http://localhost:3000';
const apiUrl = process.env.EXPO_PUBLIC_API_URL || defaultApiUrl;

module.exports = {
  expo: {
    name: 'Amprator Shipping',
    slug: 'amprator-shipping',
    version: '1.0.0',
    scheme: 'amprator',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    runtimeVersion: {
      policy: 'appVersion',
    },
    updates: {
      url: 'https://u.expo.dev/f9cccaeb-b579-4f07-a757-5244f0ccf045',
      enabled: true,
      fallbackToCacheTimeout: 0,
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0A0A0A',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.amprator.shipping',
      infoPlist: {
        UIBackgroundModes: ['remote-notification', 'remote-notification'],
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#0A0A0A',
      },
      package: 'com.amprator.shipping',
      permissions: [
        'CAMERA',
        'READ_EXTERNAL_STORAGE',
        'WRITE_EXTERNAL_STORAGE',
        'NOTIFICATIONS',
      ],
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          color: '#D4AF37',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: 'f9cccaeb-b579-4f07-a757-5244f0ccf045',
      },
    },
    owner: 'ampratorshipping',
    extra: {
      eas: {
        projectId: 'f9cccaeb-b579-4f07-a757-5244f0ccf045',
      },
      apiUrl,
      appEnv,
    },
  },
};