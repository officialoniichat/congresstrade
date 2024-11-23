import ReactPixel from 'react-facebook-pixel';

// Define types for the events and data
type StandardEventType = 
  | 'Purchase'
  | 'CompleteRegistration'
  | 'Lead'
  | 'Subscribe'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Kontakt'
  | 'Suchen'
  | 'ViewContent';

type EventData = {
  currency?: string;
  value?: number;
};

// Define type for window extensions
declare global {
  interface Window {
    fbPixel: typeof ReactPixel;
    trackMetaConversion: typeof trackMetaConversion;
  }
}

// Create empty advanced matching object
const advancedMatching = {} as ReactPixel.AdvancedMatching;

const options: ReactPixel.Options = {
  autoConfig: true,
  debug: false
};

// Initialize the pixel
ReactPixel.init('901385342089350', advancedMatching, options);

// Standard Meta Pixel events mapping
const STANDARD_EVENTS: Record<string, StandardEventType> = {
  'Kontakt': 'Kontakt',
  'Suchen': 'Suchen',
  'Purchase': 'Purchase',
  'signup': 'CompleteRegistration',
  'Lead': 'Lead',
  'Subscribe': 'Subscribe',
  'InitiateCheckout': 'InitiateCheckout',
  'AddPaymentInfo': 'AddPaymentInfo',
  'ViewContent': 'ViewContent',
};

const trackMetaConversion = async (
  eventType: string, 
  conversionValue: number | null = null
) => {
  try {
    const standardEvent = STANDARD_EVENTS[eventType as keyof typeof STANDARD_EVENTS];
    
    let eventData: EventData = {};
    if (conversionValue !== null) {
      eventData = {
        currency: 'USD',
        value: Number(conversionValue)
      };
    }

    if (standardEvent) {
      // Standard-Event tracken
      ReactPixel.track(standardEvent, eventData);
    } else {
      // Benutzerdefiniertes Event tracken
      ReactPixel.trackCustom(eventType, eventData);
    }
    
    console.log(`Meta Pixel: Tracked ${eventType}`, eventData);
    
    return {
      success: true,
      message: `Successfully tracked ${eventType} event`
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Meta Pixel Error: ${errorMessage}`);
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Make pixel and tracking method globally available
window.fbPixel = ReactPixel;
window.trackMetaConversion = trackMetaConversion;

export default ReactPixel;
export { trackMetaConversion };