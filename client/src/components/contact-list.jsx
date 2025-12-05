import React from 'react'
import { useActionData } from 'react-router-dom'
import { useAppStore } from '@/store';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from '@/lib/utils';

const ContactList = ({contacts, isChannel =false}) => {

  const {selectedChatData, setSelectedChatData, setSelectedChatType, selectedChatType, setSelectedChatMessages} =useAppStore();

  const handleClick =(contact)=>{
    if(isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if(selectedChatData && selectedChatData._id!== contact._id){
        setSelectedChatMessages([]);
    }
  };
  return (
    <div className='mt-5'>
        {contacts.map((contact)=>(
            
            <div key={contact._id} className={`pl-10 py-2 transition-all duration-300 cursor-pointer
                 ${selectedChatData && selectedChatData._id===contact._id?
                 "bg-[#8417ff] hover:bg-[#8417ff]": "hover:bg-[#f1f1f111]"}`}
                 onClick={()=>handleClick(contact)}
                 >  
                 <div className='flex gap-5 items-center justify-start text-neutral-300'>
                    {
                        !isChannel &&  (<Avatar className="w-10 h-10 rounded-full overflow-hidden">
                                  {contact.image ? (
                                    <AvatarImage
                                      src={`${import.meta.env.VITE_SERVER_URL}/uploads/profiles/${contact.image}`}
                                      alt="Profile"
                                      className="w-full h-full object-cover bg-black"
                                    />
                                  ) : (
                                    <div
                                      className={`uppercase w-10 h-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                                        contact.color
                                      )}`}
                                    >
                                      {contact.firstname
                                        ? contact.firstname.split("").shift()
                                        : contact.email.split("").shift()}
                                    </div>
                                  )}
                                </Avatar>
                    )}
                    {
                      isChannel && <div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full'></div>
                    }
                      {
                        isChannel ? <span>{contact.name}</span>: <span>{`${contact.firstname} ${contact.ContactList}`}</span>
                      }
            </div>
        </div>
        ))}
    </div>
    );

}

export default ContactList;

// import React from "react";
// import { useAppStore } from "@/store";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { getColor } from "@/lib/utils";
// import { AvatarFallback } from "@/components/ui/avatar";

// const ContactList = ({ contacts, isChannel = false }) => {
//   const {
//     selectedChatData,
//     setSelectedChatData,
//     setSelectedChatType,
//     setSelectedChatMessages,
//   } = useAppStore();

//   const handleClick = (contact) => {
//     setSelectedChatType(isChannel ? "channel" : "contact");
//     if (selectedChatData && selectedChatData._id !== contact._id) {
//       setSelectedChatMessages([]);
//     }
//     setSelectedChatData(contact);
//   };

//   const baseURL = import.meta.env.VITE_SERVER_URL;

//   return (
//     <div className="mt-5">
//       {contacts.map((contact) => {
//         // 🔍 Debug
//        console.log(contact);

//         // ✅ Normalize image path
//         let imageUrl = contact.image;
//         if (imageUrl && !imageUrl.startsWith("http")) {
//           imageUrl = `${baseURL}${imageUrl}`;
//         }

//         return (
//           <div
//             key={contact._id}
//             className={`pl-10 py-2 transition-all duration-300 cursor-pointer
//               ${
//                 selectedChatData && selectedChatData._id === contact._id
//                   ? "bg-[#8417ff] hover:bg-[#8417ff]"
//                   : "hover:bg-[#f1f1f111]"
//               }`}
//             onClick={() => handleClick(contact)}
//           >
//             <div className="flex gap-5 items-center justify-start text-neutral-300">
//               {!isChannel && (
//                 <Avatar className="w-10 h-10 rounded-full overflow-hidden">
//                   {contact.image ? (
//                     <Avatar>
//   <AvatarImage src={`http://localhost:5173${contact.image}`} alt={contact.firstname} />
//   <AvatarFallback>{contact.firstname[0]}</AvatarFallback>
// </Avatar>

//                   ) : (
//                     <div
//                       className={`uppercase w-10 h-10 text-lg border-[1px] flex items-center justify-center text-white rounded-full ${getColor(
//                         contact.selectedcolor
//                       )}`}
//                     >
//                       {contact.firstname
//                         ? contact.firstname[0]
//                         : contact.email[0]}
//                     </div>
//                   )}
//                 </Avatar>
//               )}
//               <span className="text-lg capitalize">
//                 {contact.firstname} {contact.lastname}
//               </span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ContactList;

// import React from "react";
// import { useAppStore } from "@/store";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { getColor } from "@/lib/utils";

// const ContactList = ({ contacts, isChannel = false }) => {
//   const {
//     selectedChatData,
//     setSelectedChatData,
//     setSelectedChatType,
//     selectedChatType,
//     selectedChatMessages, //extra sir lkheni
//   } = useAppStore();

//   const handleClick = (contact) => {
//     setSelectedChatType(isChannel ? "channel" : "contact");
//     if (!selectedChatData || selectedChatData._id !== contact._id) {
//       setSelectedChatMessages([]);
//     }
//     setSelectedChatData(contact);
//   };

//   const baseURL = import.meta.env.VITE_SERVER_URL;

//   return (
//     <div className="mt-5">
//       {contacts.map((contact) => {
//         // Normalize image URL
//         let imageUrl = contact.image || "";
//         if (imageUrl && !imageUrl.startsWith("http")) {
//           imageUrl = `${baseURL}${imageUrl}`;
//         }

//         const isSelected = selectedChatData && selectedChatData._id === contact._id;

//         return (
//           <div
//             key={contact._id}
//             className={`pl-10 py-2 cursor-pointer transition-all duration-300 ${
//               isSelected ? "bg-[#8417ff] hover:bg-[#8417ff]" : "hover:bg-[#f1f1f111]"
//             }`}
//             onClick={() => handleClick(contact)}
//           >
//             <div className="flex gap-5 items-center">
//               {!isChannel && (
//                 <Avatar className="w-10 h-10 rounded-full overflow-hidden">
//                   {imageUrl ? (
//                     <AvatarImage src={imageUrl} alt={contact.firstname} />
//                   ) : (
//                     <AvatarFallback>
//                       {contact.firstname
//                         ? contact.firstname[0].toUpperCase()
//                         : contact.email[0].toUpperCase()}
//                     </AvatarFallback>
//                   )}
//                 </Avatar>
//               )}

//               <span className="text-lg capitalize">
//                 {contact.firstname} {contact.lastname}
//               </span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ContactList;
