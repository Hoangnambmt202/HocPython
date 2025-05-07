import { useEffect, useRef } from 'react';
import H5PStandalone from 'h5p-standalone';

export default function H5PPlayer({ h5pUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!h5pUrl || !containerRef.current) return;

    new H5PStandalone.H5P(containerRef.current, {
      h5pJsonPath: h5pUrl, // ví dụ: /h5p/lesson123
      frameJs: 'https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.3/dist/frame.bundle.js',
      frameCss: 'https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.3/dist/styles/h5p.css',
    });
  }, [h5pUrl]);

  return <div ref={containerRef}></div>;
}
