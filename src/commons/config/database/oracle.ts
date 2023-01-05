import oracledb from "oracledb";

const init = async () => {
    try {    
        console.log(`ORACLE: Trying to connect ...`);

        await oracledb.createPool({
            user: process.env.WRITE_USER,
            password: process.env.WRITE_PASSWORD /* mypw contains the hr schema password*/,
            connectString: process.env.WRITE_CONNECT_STRING,
            poolIncrement: 0,
            poolMax: 4,
            poolMin: 4,
        });

        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
        oracledb.autoCommit = true;
        
        console.log("ORACLE: Connect is successful");

    } catch (err) {
        console.log(`ORACLE: Err-> ${err}`);
    }
};

export { init };
