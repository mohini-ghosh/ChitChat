// import React from 'react'
// // import Title from '@/components/ui/title'

// const ContactsContainer = () => {

//   return (
//     <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r border-[#2f303b]  h-full w-full'>
//       <div className="pt-3">
//         <Logo/>
//       </div>

//       <div className="my-5">
//         <div className='flex items-center justify-between pr-10'>
//            <Title text="Direct Messages" />
//         </div>
//       </div>

//       <div className="my-5">
//         <div className='flex items-center justify-between pr-10'>
//            <Title text="Channels" />
//         </div>
//       </div>      
//     </div>
//   )
// }

// export default ContactsContainer


// const Logo = () => {
//   return (
//     <div className="flex p-5  justify-start items-center gap-2">
//       <svg
//         id="logo-38"
//         width="78"
//         height="32"
//         viewBox="0 0 78 32"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         {" "}
//         <path
//           d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z"
//           className="ccustom"
//           fill="#8338ec"
//         ></path>{" "}
//         <path
//           d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z"
//           className="ccompli1"
//           fill="#975aed"
//         ></path>{" "}
//         <path
//           d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z"
//           className="ccompli2"
//           fill="#a16ee8"
//         ></path>{" "}
//       </svg>
//       <span className="text-3xl font-semibold ">ChitChat</span>
//     </div>
//   );
// };

// const Title =({text}) =>{
//   return(
//     <h6 className=' uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm'>{text}</h6>
//   )
// }



//revised till 5 hr contacts click korle chat open hbe r close korle close hbe  (final ate ki6u koirni ami)
// import React, { useEffect } from 'react'
// import ProfileInfo from './components/profile-info'
// import NewDM from './components/new-dm'
// import { apiClient } from '@/lib/apiclient';
// import { GET_DM_CONTACTS_ROUTE } from '@/utils/constants';
// import { useAppStore } from '@/store';
// import ContactList from '@/components/contact-list';

// const ContactsContainer = () => {
//   const {setDirectMessagesContacts, directMessagesContacts} =useAppStore(); //2 nov 
//   useEffect(() => {
//    const getContacts =async() => {
//      const response = await apiClient.get(GET_DM_CONTACTS_ROUTE, {
//        withCredentials: true,
//    });
//    if(response.data.getContacts){
//      setDirectMessagesContacts(response.data.getContacts); //2nov
//    }
//   };
//   getContacts();
//   }, []);

//   return (
//     <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r border-[#2f303b] h-full w-full">
//       <div className="pt-3">
//         <Logo />
//       </div>

//       <div className="my-5">
//         <div className="flex items-center justify-between pr-10">
//           <Title text="Direct Messages" />
//           <NewDM/>
//         </div>
//         <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
//           <ContactList contacts={directMessagesContacts}/>
//         </div>
//       </div>

//       <div className="my-5">
//         <div className="flex items-center justify-between pr-10">
//           <Title text="Channels" />
//         </div>
//       </div>
//       <ProfileInfo/>
//     </div>
//   )
// }

// export default ContactsContainer

// const Logo = () => {
//   return (
//     <div className="flex p-5 justify-start items-center gap-2">
//       <svg
//         id="logo-38"
//         width="78"
//         height="32"
//         viewBox="0 0 78 32"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" fill="#8338ec"></path>
//         <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" fill="#975aed"></path>
//         <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" fill="#a16ee8"></path>
//       </svg>
//       <span className="text-3xl font-semibold">ChitChat</span>
//     </div>
//   )
// }

// const Title = ({ text }) => {
//   return (
//     <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
//       {text}
//     </h6>
//   )
// }

//10 ta obdhi atai 6ilo
// import React, { useEffect } from 'react';
// import ProfileInfo from './components/profile-info';
// import NewDM from './components/new-dm';
// import { apiClient } from '@/lib/apiclient';
// import { GET_DM_CONTACTS_ROUTE } from '@/utils/constants';
// import { useAppStore } from '@/store';
// import ContactList from '@/components/contact-list';

// const ContactsContainer = () => {
//   const { setDirectMessagesContacts, directMessagesContacts } = useAppStore(); // 2 nov

//   useEffect(() => {
//     const getContacts = async () => {
//       const response = await apiClient.get(GET_DM_CONTACTS_ROUTE, {
//         withCredentials: true,
//       });
//       if (response.data.getContacts) {
//         console.log(response.data.getContacts); // 2 nov
//       }
//     };
//     getContacts();
//   }, []);

//   return (
//     <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r border-[#2f303b] h-full w-full">
//       <div className="pt-3">
//         <Logo />
//       </div>

//       <div className="my-5">
//         <div className="flex items-center justify-between pr-10">
//           <Title text="Direct Messages" />
//           <NewDM />
//         </div>

//         <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
//           <ContactList contacts={directMessagesContacts} />
//         </div>
//       </div>

//       <div className="my-5">
//         <div className="flex items-center justify-between pr-10">
//           <Title text="Channels" />
//         </div>
//       </div>

//       <ProfileInfo />
//     </div>
//   );
// };

// export default ContactsContainer;

// const Logo = () => {
//   return (
//     <div className="flex p-5 justify-start items-center gap-2">
//       <svg
//         id="logo-38"
//         width="78"
//         height="32"
//         viewBox="0 0 78 32"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" fill="#8338ec"></path>
//         <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" fill="#975aed"></path>
//         <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" fill="#a16ee8"></path>
//       </svg>
//       <span className="text-3xl font-semibold">ChitChat</span>
//     </div>
//   );
// };

// const Title = ({ text }) => {
//   return (
//     <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
//       {text}
//     </h6>
//   );
// };


//github thke
import React from 'react';
import ProfileInfo from './components/profile-info';
import NewDM from './components/new-dm';
import { useAppStore } from '@/store';

const ContactsContainer = () => {
  const { selectedChatData } = useAppStore();

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r border-[#2f303b] h-full w-full">
      <div className="pt-3">
        <Logo />
      </div>

      <div className="my-5 px-5">
        <div className="flex items-center justify-between">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
      </div>

      <div className="my-5 px-5">
        <div className="flex items-center justify-between">
          <Title text="Channels" />
        </div>
      </div>

      <ProfileInfo />

      {/* Optional: show selected chat info */}
      {/* {selectedChatData && (
        <div className="p-5 mt-5 bg-[#2a2b33] text-white rounded">
          <h4>Selected Chat:</h4>
          <p>{selectedChatData.firstname || selectedChatData.email}</p>
        </div>
      )} */}
    </div>
  );
};

export default ContactsContainer;

const Logo = () => (
  <div className="flex p-5 justify-start items-center gap-2">
    <svg
      id="logo-38"
      width="78"
      height="32"
      viewBox="0 0 78 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" fill="#8338ec"></path>
      <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" fill="#975aed"></path>
      <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" fill="#a16ee8"></path>
    </svg>
    <span className="text-3xl font-semibold">ChitChat</span>
  </div>
);

const Title = ({ text }) => (
  <h6 className="uppercase tracking-widest text-neutral-400 pl-2 font-light text-opacity-90 text-sm">
    {text}
  </h6>
);
