import { useEffect, useRef } from 'react';

const Received = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Add an event listener to handle title changes
    const handleIframeLoad = () => {
      // This ensures the iframe contents are fully loaded
      if (iframeRef.current) {
        try {
          // Try to sync the title from the iframe to the parent page
          const iframeTitle = iframeRef.current.contentDocument?.title;
          if (iframeTitle) {
            document.title = iframeTitle;
          }
        } catch (e) {
          console.error('Error accessing iframe content:', e);
        }
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <iframe
        ref={iframeRef}
        src="/received.html"
        style={{
          border: 'none',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
        title="Received Page"
      />
    </div>
  );
};

export default Received;
