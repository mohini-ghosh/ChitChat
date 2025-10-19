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
