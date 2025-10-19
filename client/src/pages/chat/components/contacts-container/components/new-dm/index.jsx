
//revised till 5 hr contacts click korle chat open hbe r close korle close hbe
// import React, { useState } from "react";
// import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
// import { FaPlus } from "react-icons/fa";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { apiClient } from "@/lib/apiclient";
// import { SEARCH_CONTACTS_ROUTE } from "@/utils/constants";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { getColor } from "@/lib/utils";
// import { useAppStore } from "@/store";

// const NewDM = () => {
//   const { setSelectedChat, setSelectChatData  } = useAppStore();
//   const [openNewContactModel, setOpenNewContactModel] = useState(false);
//   const [searchedContacts, setSearchedContacts] = useState([]);

//   const searchcontacts = async (SearchTerm) => {
//     try {
//       if (SearchTerm.length > 0) {
//         const response = await apiClient.post(
//           SEARCH_CONTACTS_ROUTE,
//           { searchTerm: SearchTerm },
//           { withCredentials: true }
//         );
//         if (response.status === 200 && response.data.contacts) {
//           setSearchedContacts(response.data.contacts);
//         } else {
//           setSearchedContacts([]);
//         }
//       } else {
//         setSearchedContacts([]);
//       }
//     } catch (error) {
//       console.log({ error });
//     }
//   };

//   const selectNewContacts = (contact) => {
//     setOpenNewContactModel(false);
//      setSelectChatType("contact");
//     setSelectedChat(contact); // ✅ single source of truth
//     setSearchedContacts([]);
//   };

//   return (
//     <>
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger>
//             <FaPlus
//               className="text-neutral-400 font-light text-opacity-90 text-start
//                 hover:text-neutral-100 cursor-pointer transition-all duration-300"
//               onClick={() => setOpenNewContactModel(true)}
//             />
//           </TooltipTrigger>
//           <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
//             Select New Contact
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
//         <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
//           <DialogHeader>
//             <DialogTitle>Please select a contact</DialogTitle>
//             <DialogDescription></DialogDescription>
//           </DialogHeader>

//           <div>
//             <Input
//               placeholder="Search Contacts"
//               className="rounded-lg p-6 bg-[#2c2e2b] border-none"
//               onChange={(e) => searchcontacts(e.target.value)}
//             />
//           </div>

//           <ScrollArea className="h-[250px]">
//             <div className="flex flex-col gap-5">
//               {searchedContacts.map((contact) => (
//                 <div
//                   key={contact._id}
//                   className="flex gap-3 items-center cursor-pointer"
//                   onClick={() => selectNewContacts(contact)}
//                 >
//                   <div className="w-12 h-12 relative">
//                     <Avatar className="w-12 h-12 rounded-full overflow-hidden">
//                       {contact.image ? (
//                         <AvatarImage
//                           src={`${import.meta.env.VITE_SERVER_URL}${contact.image}`}
//                           alt="Profile"
//                           className="w-full h-full object-cover bg-black"
//                         />
//                       ) : (
//                         <div
//                           className={`uppercase w-12 h-12 text-lg border flex items-center justify-center text-white rounded-full ${getColor(
//                             contact.selectedcolor
//                           )}`}
//                         >
//                           {contact.firstname
//                             ? contact.firstname.charAt(0)
//                             : contact.email.charAt(0)}
//                         </div>
//                       )}
//                     </Avatar>
//                   </div>
//                   <div className="flex flex-col">
//                     <span>
//                       {contact.firstname && contact.lastname
//                         ? `${contact.firstname} ${contact.lastname}`
//                         : contact.firstname || contact.email}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>

//           {searchedContacts.length <= 0 && (
//             <div className="flex flex-1 flex-col items-center mt-5 justify-center bg-[#1c1d25] h-full transition-all duration-1000">
//               <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-4 lg:text-2xl text-xl transition-all duration-300 text-center">
//                 <h3 className="poppins-medium-italic">
//                   <span className="text-purple-500"></span>Search new
//                   <span className="text-purple-500"> contacts..</span>
//                 </h3>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default NewDM;


import React, { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/apiclient";
import { SEARCH_CONTACTS_ROUTE } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";

const NewDM = () => {
  const { setSelectChatType, setSelectChatData } = useAppStore();
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (!searchTerm) return setSearchedContacts([]);
      const response = await apiClient.post(
        SEARCH_CONTACTS_ROUTE,
        { searchTerm },
        { withCredentials: true }
      );
      setSearchedContacts(response.data.contacts || []);
    } catch (err) {
      console.log("Error searching contacts:", err);
      setSearchedContacts([]);
    }
  };

  const selectContact = (contact) => {
    console.log("✅ Selected contact:", contact);
    setOpenNewContactModel(false);
    setSelectChatType("contact");
    setSelectChatData(contact);
    setSearchedContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            Select New Contact
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Select a contact</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Search Contacts"
            className="rounded-lg p-3 mt-2 mb-2 bg-[#2c2e2b] border-none"
            onChange={(e) => searchContacts(e.target.value)}
          />

          <ScrollArea className="h-[250px]">
            <div className="flex flex-col gap-3">
              {searchedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex gap-3 items-center cursor-pointer hover:bg-[#2a2b33] p-2 rounded"
                  onClick={() => selectContact(contact)}
                >
                  <Avatar className="w-12 h-12 rounded-full overflow-hidden">
                    {contact.image ? (
                      <AvatarImage
                        src={`${import.meta.env.VITE_SERVER_URL}${contact.image}`}
                        alt="Profile"
                        className="w-full h-full object-cover bg-black"
                      />
                    ) : (
                      <div
                        className={`uppercase w-12 h-12 text-lg flex items-center justify-center text-white rounded-full ${getColor(
                          contact.selectedcolor
                        )}`}
                      >
                        {contact.firstname
                          ? contact.firstname.charAt(0)
                          : contact.email.charAt(0)}
                      </div>
                    )}
                  </Avatar>
                  <span>
                    {contact.firstname
                      ? `${contact.firstname} ${contact.lastname || ""}`
                      : contact.email}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
