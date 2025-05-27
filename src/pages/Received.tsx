import { useEffect } from 'react';

const Received = () => {
  useEffect(() => {
    window.location.href = '/received.html';
  }, []);

  return (
    <div>
      Redirecting...
    </div>
  );
};

export default Received;
