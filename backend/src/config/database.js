const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error('Lỗi kết nối Database: ', err);
    else console.log('Kết nối Postges thành công lúc: ', res.rows[0].now);
});

module.exports = pool;