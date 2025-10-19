// import React from 'react';
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
// import { useAppStore } from '@/store';
// import { FiEdit2 } from 'react-icons/fi';
// import { TooltipProvider } from '@radix-ui/react-tooltip';
// import { useNavigate } from 'react-router-dom';
// import { getColor } from '@/lib/utils';
// import {IoPowerSharp} from "react-icons/io5";
// import { apiClient } from '@/lib/apiclient';
// import { LOGOUT_ROUTE } from '@/utils/constants';

// const ProfileInfo = () => {
//   const { userInfo, setUserInfo } = useAppStore();
//   const { firstname, lastname, image, selectedcolor } = userInfo;
//   const navigate = useNavigate();

//   const logOut= async()=>{
//     try{
//       const response =await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true});
//       if(response.status==200){
//         // localStorage.removeItem("userInfo");
//         navigate("/auth");
//         setUserInfo(null);
//       }
//     }catch(error){
//         console.log(error);
//     }
//   }

//   return (
//     <div className="absolute bottom-0 h-16 flex items-center justify-between px-4 w-full bg-[#2a2b33]">
//       {/* Left section: Avatar + Name */}
//       <div className="flex items-center gap-3">
//         {/* Avatar */}
//         <div className="w-12 h-12 relative">
//           <Avatar className="w-12 h-12 rounded-full overflow-hidden">
//             {image ? (
//               <AvatarImage
//                 src={`${import.meta.env.VITE_SERVER_URL}${image}`}
//                 alt="Profile"
//                 className="w-full h-full object-cover bg-black"
//               />
//             ) : (
//               <div
//                 className={`uppercase w-12 h-12 text-lg border flex items-center justify-center text-white rounded-full ${getColor(
//                   selectedcolor
//                 )}`}
//               >
//                 {firstname ? firstname.charAt(0) : userInfo.email.charAt(0)}
//               </div>
//             )}
//           </Avatar>
//         </div>

//         {/* User Name */}
//         <div className="text-white font-medium text-base">
//           {firstname && lastname ? `${firstname} ${lastname}` : firstname || ""}
//         </div>
//       </div>

//       {/* Right section: Action buttons */}
//       <div className="flex items-center gap-4">
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <FiEdit2
//                 onClick={() => navigate('/profile')}
//                 className="text-purple-500 text-xl cursor-pointer"
//               />
//             </TooltipTrigger>
//             <TooltipContent className="bg-[#1c1b1e] border-none text-white">
//               <p>Edit Profile</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//           <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <IoPowerSharp
//                 onClick={logOut}
//                 className="text-red-500 text-xl cursor-pointer"
//               />
//             </TooltipTrigger>
//             <TooltipContent className="bg-[#1c1b1e] border-none text-white">
//               <p>Logout</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;

// updated for clearing old user info and redirect auth after logout (atodin atai 6ilo vc r por chng)
// import React from 'react';
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
// import { useAppStore } from '@/store';
// import { FiEdit2 } from 'react-icons/fi';
// import { TooltipProvider } from '@radix-ui/react-tooltip';
// import { useNavigate } from 'react-router-dom';
// import { getColor } from '@/lib/utils';
// import { IoPowerSharp } from 'react-icons/io5';
// import { apiClient } from '@/lib/apiclient';
// import { LOGOUT_ROUTE } from '@/utils/constants';

// const ProfileInfo = () => {
//   const { userInfo, clearUserInfo, clearSelectedChat } = useAppStore();
//   const {image, selectedcolor } = userInfo;
//   //ishika 210 211 add const r bhetor fistlast na likhe
//   const firstname = userInfo.firstName;
//   const lastname = userInfo.lastName;
//   const navigate = useNavigate();

//   const logOut = async () => {
//     try {
//       const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
//       if (response.status === 200) {
//         clearUserInfo();       // ✅ safely removes from Zustand + localStorage
//         clearSelectedChat();   // ✅ also clear chats if needed
//         navigate("/auth");
//       }
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <div className="absolute bottom-0 h-16 flex items-center justify-between px-4 w-full bg-[#2a2b33]">
//       {/* Left section: Avatar + Name */}
//       <div className="flex items-center gap-3">
//         {/* Avatar */}
//         <div className="w-12 h-12 relative">
//           <Avatar className="w-12 h-12 rounded-full overflow-hidden">
//             {image ? (
//               <AvatarImage
//                 src={`${import.meta.env.VITE_SERVER_URL}${image}`}
//                 alt="Profile"
//                 className="w-full h-full object-cover bg-black"
//               />
//             ) : (
//               <div
//                 className={`uppercase w-12 h-12 text-lg border flex items-center justify-center text-white rounded-full ${getColor(
//                   selectedcolor
//                 )}`}
//               >
//                 {firstname ? firstname.charAt(0) : userInfo.email.charAt(0)}
//               </div>
//             )}
//           </Avatar>
//         </div>

//         {/* User Name */}
//         <div className="text-white font-medium text-base">
//           {firstname && lastname ? `${firstname} ${lastname}` : firstname || ""}
//         </div>
//       </div>

//       {/* Right section: Action buttons */}
//       <div className="flex items-center gap-4">
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <FiEdit2
//                 onClick={() => navigate('/profile')}
//                 className="text-purple-500 text-xl cursor-pointer"
//               />
//             </TooltipTrigger>
//             <TooltipContent className="bg-[#1c1b1e] border-none text-white">
//               <p>Edit Profile</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
        
//         <TooltipProvider>
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <IoPowerSharp
//                 onClick={logOut}
//                 className="text-red-500 text-xl cursor-pointer"
//               />
//             </TooltipTrigger>
//             <TooltipContent className="bg-[#1c1b1e] border-none text-white">
//               <p>Logout</p>
//             </TooltipContent>
//           </Tooltip>
//         </TooltipProvider>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useAppStore } from "@/store";
import { FiEdit2 } from "react-icons/fi";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useNavigate } from "react-router-dom";
import { getColor } from "@/lib/utils";
import { IoPowerSharp } from "react-icons/io5";
import { apiClient } from "@/lib/apiclient";
import { LOGOUT_ROUTE } from "@/utils/constants";

const ProfileInfo = () => {
  const { userInfo, clearUserInfo, clearSelectedChat } = useAppStore();
  const navigate = useNavigate();

  // normalize field names
  const firstName = userInfo.firstName || userInfo.firstname || "";
  const lastName = userInfo.lastName || userInfo.lastname || "";
  const image = userInfo.image;
  const selectedColor = userInfo.selectedcolor ?? userInfo.color ?? 0;

  const logOut = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
      if (response.status === 200) {
        clearUserInfo();
        clearSelectedChat();
        navigate("/auth");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-4 w-full bg-[#2a2b33]">
      {/* Left section: Avatar + Name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 relative">
          <Avatar className="w-12 h-12 rounded-full overflow-hidden">
            {image ? (
              <AvatarImage
                src={`${import.meta.env.VITE_SERVER_URL}${image}`}
                alt="Profile"
                className="w-full h-full object-cover bg-black"
              />
            ) : (
              <div
                className={`uppercase w-12 h-12 text-lg border flex items-center justify-center text-white rounded-full ${getColor(
                  selectedColor
                )}`}
              >
                {firstName
                  ? firstName.charAt(0)
                  : userInfo.email?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </Avatar>
        </div>

        {/* User Name */}
        <div className="text-white font-medium text-base truncate max-w-[150px]">
          {firstName || lastName ? `${firstName} ${lastName}`.trim() : ""}
        </div>
      </div>

      {/* Right section: Action buttons */}
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <FiEdit2
                onClick={() => navigate("/profile")}
                className="text-purple-500 text-xl cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IoPowerSharp
                onClick={logOut}
                className="text-red-500 text-xl cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
