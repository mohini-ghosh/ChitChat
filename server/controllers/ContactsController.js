// import User from "../models/UserModel.js"

// export const searchContacts = async (req, res, next) => {
//   try {
//      const {searchTerm} =  req.body;
//      if(searchTerm=== undefined || searchTerm=== null){
//         return res.status(400).send("SearchTerm is required.")
//      }

//      const sanitizedSearchTerm = searchTerm.replace(/[,*+?^${}()|[\]\\]/g,"\\$&");
//      const regex = new RegExp(sanitizedSearchTerm, "i");
//      const contacts= await User.find({
//         $and: [{ id: {$ne: req.userId}}, 
//             {$or:[{firstName:regex}, {lastName:regex}, {email:regex}]]}
//      });

//     return res.status(200).json({contacts});
//     res.status(200).json({ message: "Logout succesfull" });
//   } catch (error) {
//     console.error("Server error in removeProfileImage:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


//ata last 6ilo
// import mongoose from "mongoose";
// import User from "../models/UserModel.js";

// export const searchContacts = async (req, res, next) => {
//   try {
//     const { searchTerm } = req.body;

//     if (!searchTerm || searchTerm.trim() === "") {
//       return res.status(400).json({ message: "SearchTerm is required." });
//     }

//     // Escape special regex characters
//     const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const regex = new RegExp(sanitizedSearchTerm, "i");

//     const contacts = await User.find({
//       $and: [
//         { _id: { $ne: req.userId } }, // ✅ use _id, not id
//         {
//           $or: [
//             { firstname: regex },
//             { lastname: regex },
//             { email: regex },
//           ],
//         },
//       ],
//     });

//     return res.status(200).json({ contacts });
//   } catch (error) {
//     console.error("Server error in searchContacts:", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ****** sir 
// export const getContactsforDM = async (req, res, next) => {
//   try {
//     let {userId} = req;

//     userId =new mongoose.Types.ObjectId(userId);
//     const contacts = await Message.aggregate([
//       {
//         $match:{
//           $or:[{sender:userId}, {recipient:userId}],
//         },
//       },
//     {  $sort:{timestamp:-1}, //sort contact acc to timestamp
//   },
//     {
//       $group:{
//         _id:{
//           $cond:{
//             if:{$eq:["$sender", userId]},
//             then: "$recipient",
//             else: "$sender",
//         }, //if sender is user, group by receiver
//       },
//       lastMessageTime:{$first:"$timestamp"},
//     },
//   },
//   {
//    $lookup:{
//     from:"users",
//     localField:"_id",
//     foreignField:"_id",
//     as:"contactInfo",
//   },
// },
// {
//   $unwind:"$contactInfo",
// },
// {
//   $project:{
//     _id:1,
//     lastMessageTime:1,
//     email:"$contactInfo.email",
//     firstname:"$contactInfo.firstname",
//     lastname:"$contactInfo.lastname",
//     image:"$contactInfo.image",
//     color:"$contactInfo.color",
//   },
// },
//  {
//   $sort:{lastMessageTime:-1},
//  }
// ]);

//     return res.status(200).json({ contacts });
//     return res.status(200).send("Logout succesfull");
//   } catch (error) {
//     console.log({error});
//  // res.status(500).json({ message: "Internal server error" });
//   }
// };

//  export const getContactsforDM = async (req, res) => {
//    try {
//      const userId = req.userId;
//      const contacts = await User.find({ _id: { $ne: userId } }).select([
//        "_id",
//        "firstname",
//        "lastname",
//        "email",
//        "image",
//        "color",
//        "profileSetup",
//      ]);

//      // ✅ Normalize image URLs
//      const formattedContacts = contacts.map((contact) => {
//        let imageUrl = contact.image;
//        if (imageUrl && !imageUrl.startsWith("http")) {
//          imageUrl = `${process.env.ORIGIN}${imageUrl}`;
//        }

//        return {
//          ...contact._doc,
//          image: imageUrl,
//        };
//      });

//      return res.status(200).json({ contacts: formattedContacts });
//    } catch (error) {
//      console.error("Error in getContactsforDM:", error);
//      return res.status(500).json({ error: "Server error" });
//    }
//  };

//github
import User from "../models/UserModel.js";
export const searchContacts = async (req, res, next) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ message: "SearchTerm is required." });
    }

    // Escape special regex characters
    const sanitizedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(sanitizedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } }, // ✅ use _id, not id
        {
          $or: [
            { firstname: regex },
            { lastname: regex },
            { email: regex },
          ],
        },
      ],
    });

    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Server error in searchContacts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};