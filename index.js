const {
    execute
} = require('@getvim/execute');
const dotenv = require('dotenv');
var cron = require('node-cron');
const nodeCmd = require('node-cmd');

dotenv.config();

const DBPASSWORD = "root"
const DBUSERNAME = "postgres"
const DBNAME = "interplex"

function backup() {
    console.log("working....")
    const date = new Date();
    const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
    var cmd=`pg_dump -U postgres --no-password -p 5433 -h 127.0.0.1 interplex > database-backup-${currentDate}.pgsql`;
    var cmd2=`pg_dump -U ${DBUSERNAME} -d ${DBNAME} -f database-backup-${currentDate}.pgsql`;
    // nodeCmd.run(`SET PGPASSWORD=${DBPASSWORD}`, (err, data, stderr) => console.log(data));
    // SET PGPASSWORD=root pg_dump -d interplex -f database-backup-d.pgsql
    nodeCmd.run(cmd, (err, data, stderr) => 
    console.log(data));
    // pg_dump --dbname=postgresql://postgres:root@127.0.0.1:5433/interplex
}
// 0 0 20 1/1 * ? *
cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    backup()   
});