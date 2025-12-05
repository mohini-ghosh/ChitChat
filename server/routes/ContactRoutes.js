import { Router } from 'express'
import { verifyToken } from '../middlewares/AuthMiddleware.js';
import { searchContacts } from '../controllers/ContactsController.js';
// import { getContactsforDM } from '../controllers/ContactsController.js';

const contactsRoutes = Router();
contactsRoutes.post("/search", verifyToken, searchContacts);
// contactsRoutes.get("/get-contact-for-dm", verifyToken, getContactsforDM);

export default contactsRoutes;