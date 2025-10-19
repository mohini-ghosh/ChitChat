// import React from 'react'
// import Lottie from 'lottie-react'
// import { animationDefaultOptions } from '@/lib/utils';

// const EmptyChatContainer = () => {
//   return (
//     <div className='flex flex-1 flex-col  md:flex  md:bg-[#1c1d25] items-center justify-center duration-1000 transition-all h-full'>
//       <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl 
//       transition-all duration-300 text-center'>
//          <h3 className='font-serif'>Hi <span className='text-purple-500'>!
//           </span>Welcome to <span className='text-purple-500'>Chitchat</span>Chat App <span className='text-purple-500'>.</span></h3>
//       </div>
//    </div>
//   )
// }

// export default EmptyChatContainer

//gpt
import React from 'react';
const EmptyChatContainer = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-[#1c1d25] h-full transition-all duration-1000">
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="poppins-medium-italic">
          Hi <span className="text-purple-500">!</span> Welcome to 
          <span className="text-purple-500"> Chitchat </span>..
          <span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
};


export default EmptyChatContainer;


