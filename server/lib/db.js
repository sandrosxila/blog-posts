import mysql from 'mysql';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'Password.123',
    database: 'blog_posts'
});

connection.connect((error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log('connected!!!');
    }
});

export default connection;

