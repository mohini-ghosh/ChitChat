// import { useAppStore } from '@/store'
// import React, { useEffect, useRef  } from 'react'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {IoArrowBack} from 'react-icons/io5'
// import { Avatar, AvatarImage,  AvatarFallback } from '@/components/ui/avatar';
// import { colors, getColor } from '@/lib/utils';
// import { FaPlus, FaTrash } from 'react-icons/fa';
// import {Input} from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { apiClient } from '@/lib/apiclient';
// import { UPDATE_PROFILE_ROUTE, ADD_PROFILE_IMAGE_ROUTE } from '@/utils/constants';
// // import { GET_USER_INFO } from '@/utils/constants';

// const Profile = () => {
//   const navigate= useNavigate();
//   const {userInfo, setUserInfo}=useAppStore();
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [image, setImage] = useState("");
//   const [hovered, setHovered] = useState(false);
//   const [selectedcolor, setSelectedcolor] = useState(0);
//   const fileInputRef = useRef(null);

//   useEffect(()=>{
//     if(userInfo.profileSetup){
//       setFirstname(userInfo.firstname);
//       setLastname(userInfo.lastname);
//       setSelectedcolor(userInfo.color);
//     }

//   }, [userInfo]);

//   //checks if fistname and lastname are present or not .if not return
//   const validateProfile=()=>{
//     if(!firstname){
//       toast.error("First name is required");
//         return false;
//     } 
//     if(!lastname){
//       toast.error("Last name is required");
//         return false;
//     }
//     return true;
//   };

//   const saveChanges= async()=>{
//     if(validateProfile()){
//       try{
//         const response = await apiClient.post(UPDATE_PROFILE_ROUTE,{
//           firstname, lastname, color: selectedcolor }, {withCredentials:true});
//           if(response.status===200 && response.data){
//             toast.success("Profile updated successfully");
             
//             const updatedUser = response.data.user || response.data;
//             //gpt
//              setUserInfo({
//             ...userInfo,
//             ...updatedUser,
//             profileSetup: true,
//           });
//            navigate("/chat");
//           }
//         }catch(error){
//           console.error({error});
//           toast.error("Failed to update profile");
//           // return;
//         }
//     }
//   };


//   const handleNavigate=()=>{
//     if(userInfo.profileSetup)navigate("/chat");
//     else toast.error("Please set up your profile first");
//   }

//   const handleFileInputClick = () => {
//     fileInputRef.current.click();
//   };
//   const handleImageChange = async(event) => {
//     const file = event.target.files[0];
//     console.log({file});
//     if (file) {
//       const formData = new FormData();
//       formData.append("profile-image", file);
//       // const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData,{withCredentials:true});
//       // if(response.status===200 && response.data.image){
//       //   setUserInfo({
//       //     ...userInfo,
//       //     image: response.data.image
//       //   });
//       //     toast.success("Profile image updated");
//       //   // setImage(response.data.image); //gpt
//       // }

      
//       // const reader = new FileReader();
//       // reader.onload = () => {
//       //   setImage(reader.result);
//       // };
//       // reader.readAsDataURL(file);
      
//     }
//   };

// const handleDeleteImage = async () => {
//   try {
//     const response = await apiClient.delete(ADD_PROFILE_IMAGE_ROUTE, { withCredentials: true });
//     if (response.status === 200) {
//       setUserInfo({
//         ...userInfo,
//         image: null
//       });
//       setImage(""); // reset local state
//       toast.success("Profile image deleted");
//     }
//   } catch (error) {
//     console.error(error);
//     toast.error("Failed to delete profile image");
//   }
// };

//   return (
//     <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
//        <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
//        <div onClick={handleNavigate}>
//         <IoArrowBack className=' text-4xl lg:text-6xl text-white/90 cursor-pointer'  />
//        </div>
//        <div className="grid grid-cols-2">
//         <div
//           className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
//           onMouseEnter={()=>setHovered(true)}
//           onMouseLeave={()=>setHovered(false)}
//          >
//           <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
//             {
//               image? (
//               <AvatarImage
//                 src={image} alt="Profile" 
//                 className='w-full h-full object-cover bg-black'
//                 />
//                ): (
//               <div className= {`uppercase w-32 h-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center text-white rounded-full ${getColor(selectedcolor)}`}> 
//               {firstname ? firstname.split("").shift() : userInfo.email.split("").shift()}
//               </div>
//             )}
//           </Avatar>
//           {
//             hovered && (
//               <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full ring-fuchsia-50'
//                 onClick={image ? handleDeleteImage : handleFileInputClick}
//                 >
//                 {
//                   image ? (
//                   <FaTrash className='text-white text-3xl cursor-pointer'/> 
//                   ): (<FaPlus className='text-white text-3xl cursor-pointer'/>
//                   )}
//                   </div>
//                 )}
//                 <input type= "file" ref={fileInputRef} className='hidden' onChange={handleImageChange} name="profile-image" accept=".png, .jpg, .jpeg, .svg, .webp "/>
//          </div>
//          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
//              <div className='w-full'>
//               <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
//              </div>

//               <div className='w-full'>
//               <Input placeholder="First Name" type="text" onChange={(e)=>setFirstname(e.target.value)} value={firstname} className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
//              </div>

//               <div className='w-full'>
//               <Input placeholder="Last Name" type="text" onChange={(e)=>setLastname(e.target.value)} value={lastname} className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
//              </div>

//              <div className='w-full flex gap-5'>
//               {
//                 colors.map((color, index)=>(
//                   <div 
//                     key={index}
//                     className={`w-8 h-8 rounded-full cursor-pointer  transition-all duration-300 ${color} ${selectedcolor===index ? "outline outline-white/50 outline-1":""}`}
//                     onClick={()=>setSelectedcolor(index)}
//                     ></div>
//                 ))
//               }
//              </div>
//          </div>
//        </div>
//       <div className="w-full">
//           <Button 
//             className="h-16 w-full bg-[#4f46e5] text-white hover:bg-[#3730a3] transition-all duration-300"
//             onClick={saveChanges}
//             >
//               Save Changes
//             </Button>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Profile;


// (atodin atai 6ilo vc r por chng)
// import { useAppStore } from '@/store'
// import React, { useEffect, useRef } from 'react'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IoArrowBack } from 'react-icons/io5'
// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import { colors, getColor } from '@/lib/utils';
// import { FaPlus, FaTrash } from 'react-icons/fa';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { apiClient } from '@/lib/apiclient';
// import { UPDATE_PROFILE_ROUTE, ADD_PROFILE_IMAGE_ROUTE } from '@/utils/constants';
// import { REMOVE_PROFILE_IMAGE_ROUTE } from '@/utils/constants'; // add this in constants.js

// const Profile = () => {
//   const navigate = useNavigate();
//   const { userInfo, setUserInfo } = useAppStore();
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [image, setImage] = useState("");
//   const [hovered, setHovered] = useState(false);
//   const [selectedcolor, setSelectedcolor] = useState(0);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     if (userInfo.profileSetup) {
//       setFirstname(userInfo.firstName);
//       setLastname(userInfo.lastName);
//       setSelectedcolor(userInfo.color);
//       setImage(userInfo.image); // keep image from DB

//     }
//     // console.log("User Info:", userInfo);
//   }, [userInfo]);

//   const validateProfile = () => {
//     if (!firstname) {
//       toast.error("First name is required");
//       return false;
//     }
//     if (!lastname) {
//       toast.error("Last name is required");
//       return false;
//     }
//     return true;
//   };

//   const saveChanges = async () => {
//     if (validateProfile()) {
//       try {
//         const response = await apiClient.post(
//           UPDATE_PROFILE_ROUTE,
//           { firstname, lastname, color: selectedcolor},
//           { withCredentials: true}
//         );

//         if (response.status === 200 && response.data) {
//           toast.success("Profile updated successfully");

//           const updatedUser = response.data.user || response.data;

//           setUserInfo({
//             ...userInfo,
//             ...updatedUser,
//             profileSetup: true,
//           });

//           navigate("/chat");
//         }
//       } catch (error) {
//         console.error({ error });
//         toast.error("Failed to update profile");
//       }
//     }
//   };

//   const handleNavigate = () => {
//     if (userInfo.profileSetup) navigate("/chat");
//     else toast.error("Please set up your profile first");
//   };

//   const handleFileInputClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("profile-image", file);

//       try {
//         const response = await apiClient.post(
//           ADD_PROFILE_IMAGE_ROUTE,
//           formData,
//           {
//             withCredentials: true,
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         if (response.status === 200 && response.data.image) {
//           setUserInfo({
//             ...userInfo,
//             image: response.data.image,
//           });
//           setImage(response.data.image);
//           toast.success("Profile image updated");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to upload image");
//       }
//     }
//   };

//   const handleDeleteImage = async () => {
//     try {
//       const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         setUserInfo({
//           ...userInfo,
//           image: null,
//         });
//         setImage("");
//         toast.success("Profile image deleted");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to delete profile image");
//     }
//   };

//   return (
//     <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
//       <div className="flex flex-col gap-10 w-[80vw] md:w-max">
//         <div onClick={handleNavigate}>
//           <IoArrowBack className=" text-4xl lg:text-6xl text-white/90 cursor-pointer" />
//         </div>
//         <div className="grid grid-cols-2">
//           <div
//             className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//           >
//             <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
//               {image ? (
//                 <>
//                    <AvatarImage
//                   src={`${import.meta.env.VITE_SERVER_URL}${image}`} // full backend URL
//                   alt="Profile"
//                   className="w-full h-full object-cover bg-black"
//                 />
                
//                 </>
                
//               ) : (
//                 <div
//                   className={`uppercase w-32 h-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center text-white rounded-full ${getColor(
//                     selectedcolor
//                   )}`}
//                 >
//                   {firstname}
                
//                 </div>
//               )}
//             </Avatar>
//             {hovered && (
//               <div
//                 className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full ring-fuchsia-50"
//                 onClick={image ? handleDeleteImage : handleFileInputClick}
//               >
//                 {image ? (
//                   <FaTrash className="text-white text-3xl cursor-pointer" />
//                 ) : (
//                   <FaPlus className="text-white text-3xl cursor-pointer" />
//                 )}
//               </div>
//             )}
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               onChange={handleImageChange}
//               name="profile-image"
//               accept=".png, .jpg, .jpeg, .svg, .webp"
//             />
//           </div>

//           <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
//             <div className="w-full">
//               <Input
//                 placeholder="Email"
//                 type="email"
//                 disabled
//                 value={userInfo.email}
//                 className="rounded-lg p-6 bg-[#2c2e3b] border-none"
//               />
//             </div>

//             <div className="w-full">
//               <Input
//                 placeholder="First Name"
//                 type="text"
//                 onChange={(e) => setFirstname(e.target.value)}
//                 value={firstname}
//                 className="rounded-lg p-6 bg-[#2c2e3b] border-none"
//               />
//             </div>

//             <div className="w-full">
//               <Input
//                 placeholder="Last Name"
//                 type="text"
//                 onChange={(e) => setLastname(e.target.value)}
//                 value={lastname}
//                 className="rounded-lg p-6 bg-[#2c2e3b] border-none"
//               />
//             </div>

//             <div className="w-full flex gap-5">
//               {colors.map((color, index) => (
//                 <div
//                   key={index}
//                   className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${color} ${
//                     selectedcolor === index
//                       ? "outline outline-white/50 outline-1"
//                       : ""
//                   }`}
//                   onClick={() => setSelectedcolor(index)}
//                 ></div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="w-full">
//           <Button
//             className="h-16 w-full bg-[#4f46e5] text-white hover:bg-[#3730a3] transition-all duration-300"
//             onClick={saveChanges}
//           >
//             Save Changes
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useAppStore } from "@/store";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiclient";
import {
  UPDATE_PROFILE_ROUTE,
  ADD_PROFILE_IMAGE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
} from "@/utils/constants";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || userInfo.firstname || "");
      setLastName(userInfo.lastName || userInfo.lastname || "");
      setSelectedColor(userInfo.color ?? userInfo.selectedcolor ?? 0);
      setImage(userInfo.image || "");
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (!validateProfile()) return;

    try {
      const response = await apiClient.post(
        UPDATE_PROFILE_ROUTE,
        { firstName, lastName, color: selectedColor },
        { withCredentials: true }
      );

      if (response.status === 200 && response.data) {
        toast.success("Profile updated successfully");
        const updatedUser = response.data.user || response.data;

        // Normalize field names for consistency
        setUserInfo({
          ...userInfo,
          firstName: updatedUser.firstName || firstName,
          lastName: updatedUser.lastName || lastName,
          color: updatedUser.color ?? selectedColor,
          image: updatedUser.image ?? image,
          profileSetup: true,
        });

        navigate("/chat");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleNavigate = () => {
    navigate("/chat");
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile-image", file);

    try {
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        setImage(response.data.image);
        toast.success("Profile image updated");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    }
  };

  const handleDeleteImage = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        setImage("");
        toast.success("Profile image deleted");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete profile image");
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Profile Image */}
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={`${import.meta.env.VITE_SERVER_URL}${image}`}
                  alt="Profile"
                  className="w-full h-full object-cover bg-black"
                />
              ) : (
                <div
                  className={`uppercase w-32 h-32 md:w-48 md:h-48 text-5xl border flex items-center justify-center text-white rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName ? firstName.charAt(0) : ""}
                </div>
              )}
            </Avatar>

            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full"
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5 text-white justify-center w-full">
            <Input
              placeholder="Email"
              type="email"
              disabled
              value={userInfo.email}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
            <Input
              placeholder="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />
            <Input
              placeholder="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
            />

            <div className="w-full flex gap-4 flex-wrap">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-300 ${color} ${
                    selectedColor === index
                      ? "outline outline-white/50 outline-1"
                      : ""
                  }`}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <Button
          className="h-16 w-full bg-[#4f46e5] text-white hover:bg-[#3730a3] transition-all duration-300"
          onClick={saveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Profile;
