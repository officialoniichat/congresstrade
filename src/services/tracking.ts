import { logger } from '../utils/logger';
import { META_PIXEL_ID } from '../config/metaPixel';

declare global {
  interface Window {
    fbq: any;
  }
}

// Event Types
export type TrackingEvent = 
  | 'PageView'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Schedule';

// Event Parameters
interface EventParams {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  status?: string;
}

class TrackingService {
  private readonly pixelId = META_PIXEL_ID;

  public trackEvent(event: TrackingEvent, params?: EventParams) {
    try {
      if (window.fbq) {
        window.fbq('track', event, params);
        logger.info(`Tracked event: ${event}`, params);
      }
    } catch (error) {
      logger.error(`Failed to track event ${event}:`, error);
    }
  }

  public trackConsultationRequest(data: {
    name: string;
    email?: string;
    phone: string;
    preferred_date: string;
    preferred_time: string;
  }) {
    // Track lead generation
    this.trackEvent('Lead', {
      content_category: 'Consultation',
      content_name: 'Consultation Request',
      status: 'submitted'
    });

    // Track scheduling
    this.trackEvent('Schedule', {
      content_category: 'Consultation',
      content_name: `${data.preferred_date} ${data.preferred_time}`
    });

    // Track contact form submission
    this.trackEvent('Contact', {
      content_category: 'Consultation',
      content_name: data.name,
      status: 'submitted'
    });
  }

  public trackArticleView(article: {
    title: string;
    slug: string;
  }) {
    this.trackEvent('PageView', {
      content_type: 'article',
      content_name: article.title,
      content_category: 'Investment Strategy'
    });
  }
}

export const tracking = new TrackingService();