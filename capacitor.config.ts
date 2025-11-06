import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sos.emergency',
  appName: 'SOS Alert',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  android: {
    // Auto-add required permissions to AndroidManifest.xml
    permissions: [
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'SEND_SMS'
    ]
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,           // 3 seconds
      launchAutoHide: true,
      backgroundColor: '#DC2626',         // Red background
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    // Optional: Haptics (already used via @capacitor/haptics)
    // Optional: Geolocation (built-in)
  },
  // Enable offline PWA support
  includePlugins: [
    '@capacitor/app',
    '@capacitor/haptics',
    '@capacitor/geolocation',
    '@capacitor/splash-screen'
  ]
};

export default config;