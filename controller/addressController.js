import { pool } from '../database/database.js';
import * as addressModel from '../model/addressDB.js';


export const importPostalData = async (req, res) => {
  let client;
  let status = 500;
  let errorMessage = 'Échec de l\'importation des données.';

  try {
    client = await pool.connect();
    await client.query('BEGIN');

    const totalCount = await addressModel.importPostalData(client);
    await client.query('COMMIT');

    const message = `Importation réussie de ${totalCount} villes et codes postaux.`;
    res.status(200).send(message);
  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error(' Erreur importPostalData:', err.message);

    if (err.message.includes('API externe')) {
      status = 503;
      errorMessage = err.message;
    }

    res.status(status).send(errorMessage);
  } finally {
    if (client) client.release();
  }
};


export const getAllCities = async (req, res) => {
  try {
    const cities = await addressModel.getAllCities(pool);
    res.send(cities);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

