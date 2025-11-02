import axios from 'axios';

export const importPostalData = async (SQLClient) => {
  const url = 'https://www.odwb.be/api/explore/v2.1/catalog/datasets/code-postaux-belge/records?limit=10000';
  const response = await axios.get(url);
  const records = response.data.results;

  for (const record of records) {
    const { code_postal, localite } = record.record.fields;

    await SQLClient.query(
      `INSERT INTO Address (city, postal_code)
       VALUES ($1, $2)
       ON CONFLICT (city, postal_code) DO NOTHING`,
      [localite, code_postal]
    );
  }

  return 'Importation des villes et codes postaux réussie';
};

export const getAllCities = async (SQLClient) => {
  const { rows } = await SQLClient.query(
    `SELECT * FROM Address ORDER BY postal_code ASC`
  );
  return rows;
};

export const getAddressByPostalCode = async (SQLClient, { postalCode }) => {
  const { rows } = await SQLClient.query(
    `SELECT * FROM Address WHERE postal_code = $1`,
    [postalCode]
  );
  return rows;
};
