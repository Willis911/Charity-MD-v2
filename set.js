const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUR4NkI5RWhqV3RLWGtTQTJuV0kzaGtSZm1qckl3OWh5STJoR1VUZ2FFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGVXQUxXdU9BcGRJUyszUGh3UlBkSjJkU2FHNCtYN3NoRkl4TVZtdmFoYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTU5sUGZGRCsydkg0aExnSS9xODhsRTdsVC96Sk9Tc1RzTkNML0w1UTJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4REh2NTYrcllsSGtIR01OS1M0TGJzSy9LcVF2enV1NmQ0dU8zUmpZL0VnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitPamNqVmc5SmtUOEVCSlkzZTdpa2pRSVlUZ1pJTnppaW1HUFREZ0MwVzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InArWXQyYnN6T3NkM3VDQUNuVVVIYTFrQnlLMWk0QUxFbE51QXFqck1OaFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid04vNzhkMCtWRFNRNTVQSHQxVi9YTmIxZXBBcktiYXdoVm5oMUhjSU8xRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFBLOHpkbWxndUk2RWNIZUVseC9adTV1cmVmaDNxeHJGSVJtNDFreitHVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndLdUxwRnJaRW5qUm1haWhCMlRid1gxUEdtRWQ1SUg2aFpZSGJRWGtlWnFEZVdQVWJDcXVpcWlaSktNSE92OHNZZVRqODZkOGR5cDV0SDZMcndLZmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU4LCJhZHZTZWNyZXRLZXkiOiI2QXpXbzllbUt5TzFRWWNtR20wVU1mbzUwM2luY09zS3dqbzE1NnZwNmdzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc4NjI3Mzk0NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFREE4RDE1N0M0RjlCNEJCMERCMkI0MTIwRTdENkExQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI5MTQ1NzYxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNUW9NUlgxYVJvNldLRjRhQUc3UUxBIiwicGhvbmVJZCI6ImYwYzIzNjBlLTU2YTEtNGVmYi1iOWMyLTdjOGYyYmUyMmRmMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvcVFYME4zd01BR1pUYjd1cmF4MFE5NU12ZjA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidy93YTBsSXkzTENFRkE1RVBRQThIZDFVK1hFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldFR1ZWQ045IiwibWUiOnsiaWQiOiIyNTQ3ODYyNzM5NDU6NzVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pPa3R0TUNFSkhYd3JnR0dBa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlVlbHlxNGpYUHVHVlorbDVBY0JUd29YWk55OVZ2NUd3VGE5YkFUZ2xVV2M9IiwiYWNjb3VudFNpZ25hdHVyZSI6InVndzNhSFYwdnFnNnNtWW5jaGhyRndDeWRRc2d6Q29sUHgzNFU3S3l6NHZKN2FBak1RNGNPR3pMc0ZReUJrSjcvQ0xIQmIxYXVHejZ1MVNMaThTU0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJxZ3V4Q3VWVzE3WkZHSGVMd2gxKzVWdDlrVFQrWkdKTHgxMnNtR1dGTy9kM25jcXZwMEZSWUNHcE5UQlNQck1xKzVwNUp4bHlnaDlMU2x1Y29nSE1odz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc4NjI3Mzk0NTo3NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWSHBjcXVJMXo3aGxXZnBlUUhBVThLRjJUY3ZWYitSc0Uydld3RTRKVkZuIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5MTQ1NzU4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUF1cCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐂𝐚𝐬𝐞𝐲𝐫𝐡𝐨𝐝𝐞𝐬",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254786273945",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/ggIBWn4.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
