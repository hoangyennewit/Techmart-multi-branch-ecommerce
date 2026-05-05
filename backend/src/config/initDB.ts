import { QueryTypes } from 'sequelize';
import sequelize from './database';
import * as fs from 'fs';
import * as path from 'path';

export const initializeDatabase = async () => {
    try {
        // Check if tables already exist
        const tables: any[] = await sequelize.query(
            `SELECT tablename FROM pg_tables WHERE schemaname = 'public'`,
            { type: QueryTypes.SELECT }
        );

        if (tables.length > 0) {
            console.log(`Database already initialized (${tables.length} tables found). Skipping init.sql.`);
            return;
        }

        console.log('No tables found. Running init.sql to seed database...');
        
        // Try multiple paths for init.sql
        const possiblePaths = [
            path.join(__dirname, '../../sql/init.sql'),
            path.join(__dirname, '../../../sql/init.sql'),
            path.join(process.cwd(), 'sql/init.sql'),
        ];

        let sqlContent = '';
        for (const sqlPath of possiblePaths) {
            if (fs.existsSync(sqlPath)) {
                sqlContent = fs.readFileSync(sqlPath, 'utf-8');
                console.log(`Found init.sql at: ${sqlPath}`);
                break;
            }
        }

        if (!sqlContent) {
            console.log('init.sql not found. Skipping database initialization.');
            return;
        }

        await sequelize.query(sqlContent);
        console.log('Database initialized successfully with init.sql!');
    } catch (error) {
        console.error('Error initializing database:', error);
        // Don't crash the server if init fails - tables might partially exist
    }
};
