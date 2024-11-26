// Simple analytics tracking
const trackEvent = (eventName: string, data?: Record<string, any>) => {
  try {
    console.log(`[Analytics] ${eventName}`, data);
    // Here you could add your own analytics implementation
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

export const trackConversion = (type: string, value?: number) => {
  trackEvent('conversion', { type, value });
};