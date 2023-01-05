require("dotenv").config();

import oracledb from "oracledb";

export async function index() {

  try {

    const consult = `SELECT 1 from TASY.WIGS_VI_ATENDIMENTO A where A.NR_ATENDIMENTO = 4414786`;
    const conn = await oracledb.getConnection();
    const query = await conn.execute(consult
    ).then(async (data) => {
      await conn.close();
      if (data.rows && data.rows.length > 0){
        return {
          success: true,
        };
      }  
      return null;

    }).catch(async (e) => {
      console.error(e);
      await conn.close();
      return {
        success: false,
        error: e,
      };
    });

    return query;

  }catch(e) {
    console.error(e);
    return {
      success: false,
      error: e,
    };
  }
}

