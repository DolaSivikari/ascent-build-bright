// Type-safe analytics wrapper for GTM dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export type AnalyticsEvent = 
  | 'cta_get_fast_quote_click'
  | 'cta_see_packages_click'
  | 'package_cta_click'
  | 'phone_click'
  | 'quote_form_submit'
  | 'photo_upload'
  | 'homepage_variant';

interface BaseEventParams {
  variant?: 'A' | 'B' | 'C';
}

interface PackageEventParams extends BaseEventParams {
  package: 'starter' | 'refresh' | 'weekend' | 'custom';
}

interface PhoneEventParams extends BaseEventParams {
  location: 'header' | 'hero' | 'packages' | 'footer';
}

interface FormSubmitParams extends BaseEventParams {
  success: boolean;
  submission_id?: string;
  error_message?: string;
}

interface PhotoUploadParams extends BaseEventParams {
  file_count: number;
  total_bytes: number;
}

interface VariantParams {
  variant: 'A' | 'B' | 'C';
}

export const trackEvent = (
  eventName: AnalyticsEvent,
  params?: BaseEventParams | PackageEventParams | PhoneEventParams | FormSubmitParams | PhotoUploadParams | VariantParams
) => {
  if (typeof window === 'undefined' || !window.dataLayer) {
    console.warn('GTM dataLayer not available');
    return;
  }

  // Get current variant from sessionStorage
  const currentVariant = sessionStorage.getItem('ab_test_variant') as 'A' | 'B' | 'C' | null;
  
  const eventData = {
    event: eventName,
    ...params,
    variant: params?.variant || currentVariant,
    timestamp: new Date().toISOString()
  };

  window.dataLayer.push(eventData);
  
  // Console log in dev mode
  if (import.meta.env.DEV) {
    console.log('📊 Analytics Event:', eventData);
  }
};

// Variant management
export const setVariant = (variant: 'A' | 'B' | 'C') => {
  sessionStorage.setItem('ab_test_variant', variant);
  trackEvent('homepage_variant', { variant });
};

export const getVariant = (): 'A' | 'B' | 'C' | null => {
  return sessionStorage.getItem('ab_test_variant') as 'A' | 'B' | 'C' | null;
};
