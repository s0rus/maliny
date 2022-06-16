// import { useEffect, useState } from 'react';

// const useWindowSize = () => {
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const handleResize = () => {
//         setWindowSize({
//           width: window.innerWidth,
//           height: window.innerHeight,
//         });
//       };

//       window && window.addEventListener('resize', handleResize);

//       return () => window.removeEventListener('resize', handleResize);
//     }
//   }, []);

//   return windowSize;
// };

// export default useWindowSize;
