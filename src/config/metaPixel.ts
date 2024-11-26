// Meta Pixel Configuration
export const META_PIXEL_ID = '901385342089350'; // Your actual Meta Pixel ID

export function initializeMetaPixel() {
  try {
    // Initialize Meta Pixel code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');

    return true;
  } catch (error) {
    console.error('Failed to initialize Meta Pixel:', error);
    return false;
  }
}