import {pool} from "../database/database.js";
import * as dashboardModel from "../model/dashboard.js";


export const getTotalPosts = async (req, res) => {
    try {
        const total = await dashboardModel.getTotalPosts(pool);
        res.status(200).json({ total_posts: total });
    } catch (err) {
        console.error("Erreur Posts:", err);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

export const getTotalReservations = async (req, res) => {
    try {
        const total = await dashboardModel.getTotalReservations(pool);
        res.status(200).json({ total_reservations: total });
    } catch (err) {
        console.error("Erreur Réservations:", err);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

export const getTotalConfirmedReservations = async (req, res) => {
    try {
        const total = await dashboardModel.getTotalConfirmedReservations(pool);
        res.status(200).json({ total_withdrawals: total });
    } catch (err) {
        console.error("Erreur Retraits:", err);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

export const getTotalUsers = async (req, res) => {
    try {
        const total = await dashboardModel.getTotalUsers(pool);
        res.status(200).json({ total_users: total });
    } catch (err) {
        console.error("Erreur Utilisateurs:", err);
        res.status(500).json({ message: "Erreur serveur." });
    }
};