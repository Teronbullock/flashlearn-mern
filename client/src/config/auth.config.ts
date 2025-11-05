export const AUTH_CONFIG = {
  TOKEN_REFRESH_INTERVAL: 1000 * 60 * 10,
  LOCAL_STORAGE_KEY: 'flashlearn_userData',
  ROUTES: {
    DASHBOARD: (userSlug: string) => `/${userSlug}/dashboard`,
    HOME: '/'
  }
};