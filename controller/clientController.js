import { pool } from "../database/database.js";
import * as userModel from "../model/client.js";

export const createUser = async (req, res) => {
  try {
const photo = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  : null;   
 const newClient = await userModel.createUser(pool, {...req.body,photo });
    res.status(201).json({
      message: 'Client created', id: newClient.id});
  } catch (err) {
    res.status(400).send(err.message);
  }
};


export const getUserWithAddress = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'ID invalide' });

    const user = await userModel.getUserWithAddress(pool, id);
    if (!user) return res.status(404).json({ message: 'Client non trouvé' });

    res.json(user);
  } catch (err) {
    console.error('Erreur getUserWithAddress:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}


export const updateUser= async(req, res) => {
    try {
        await userModel.updateUser(pool, req.body);
        res.sendStatus(204)
    }catch(err){
        console.log(err); 
        res.sendStatus(500);
    }
}

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });

    const success = await userModel.deleteUser(pool, id);
    if (!success) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};




export const getUsers = async (req, res) => {
  try {
    const { name, role, page, limit } = req.query;

    if (role && role !== 'admin' && role !== 'user') {
      return res.status(400).json({ message: 'Le rôle doit être "admin" ou "user".' });
    }

    const users = await userModel.getUsers(pool, {
      name,
      role,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10
    });

    res.status(200).json(users);
  } catch (err) {
    console.error('Erreur récupération utilisateurs :', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};