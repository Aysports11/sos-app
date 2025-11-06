import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sos.emergency',
  appName: 'SOS',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: { launchShowDuration: 2000, backgroundColor: '#DC2626' },
  },
};

export default config;