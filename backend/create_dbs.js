const { Client } = require('pg');

const config = {
  host: process.env.DB_HOST || 'techmart-staging-db.clg262q24q1a.ap-southeast-1.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: process.env.DB_PASSWORD || '20112005',
  database: 'techmart_db', // Default database created by RDS
  ssl: {
    rejectUnauthorized: false // Required for RDS SSL connection
  }
};

async function createDatabases() {
  const client = new Client(config);
  
  try {
    console.log('Connecting to PostgreSQL RDS...');
    await client.connect();
    console.log('Connected successfully!');

    // Create staging database
    try {
      console.log('Creating database: techmart_db_staging...');
      await client.query('CREATE DATABASE techmart_db_staging;');
      console.log('Database techmart_db_staging created successfully!');
    } catch (err) {
      if (err.code === '42P04') {
        console.log('Database techmart_db_staging already exists.');
      } else {
        throw err;
      }
    }

    // Create production database
    try {
      console.log('Creating database: techmart_db_production...');
      await client.query('CREATE DATABASE techmart_db_production;');
      console.log('Database techmart_db_production created successfully!');
    } catch (err) {
      if (err.code === '42P04') {
        console.log('Database techmart_db_production already exists.');
      } else {
        throw err;
      }
    }

  } catch (error) {
    console.error('An error occurred:', error.message);
    
    // Try to connect with user 'admin' if 'postgres' fails
    if (config.user === 'postgres' && (error.message.includes('password authentication failed') || error.message.includes('does not exist'))) {
      console.log('Retrying with username "admin"...');
      config.user = 'admin';
      config.database = 'postgres'; // Some setups use default 'postgres' database
      await createDatabases();
    }
  } finally {
    try {
      await client.end();
    } catch (e) {}
  }
}

createDatabases();
