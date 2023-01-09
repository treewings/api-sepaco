require("dotenv").config();

import oracledb from "oracledb";
import { ISelect, IReturn } from '@/commons/interfaces/IAttendance'
import debug from 'debug'

export async function index(data: ISelect) {
  const log = debug('api:rule:attendance')
  try {

    const { id } = data

    if (!id) return false

    const sqlMv = `
    SELECT 
    'TESTE' CD_PACIENTE,
    'DESC' NM_PACIENTE,
    'DESC' DT_NASCIMENTO,
    'DESC' TELEFONE,
    'TESTE' TP_ATENDIMENTO,
    'TESTE' DT_ATENDIMENTO,
    'TESTE' HR_ATENDIMENTO,
    '1' CD_ORI_ATE,
    'DESC' DS_ORI_ATE,
    'DESC' TP_ORIGEM,
    '1' CD_SETOR,
    'DESC' DS_SETOR,
    '1' CD_UNID_INT,
    'DESC' DS_UNID_INT,
    'TESTE' CD_CONVENIO,
    'DESC' NM_CONVENIO,
    'TESTE' CD_LEITO,
    'DESC' DS_LEITO,
    'DESC' DS_RESUMO_LEITO,
    'O 'TP_OCUPACAO
    from DBAMV.atendime where cd_atendimento = :attendanceId`;

    const sqlTasy = `
    SELECT
    to_char(P.CD_PESSOA_FISICA) CD_PACIENTE,
    P.nm_pessoa_fisica NM_PACIENTE,
    To_Char(To_date(P.dt_nascimento), 'YYYY-MM-DD') DT_NASCIMENTO,
    NULL TELEFONE,
    'I' TP_ATENDIMENTO,
    To_Char(A.DT_ENTRADA, 'YYYY-MM-DD HH24:MI:SS') DT_ATENDIMENTO,
    To_Char(A.DT_ENTRADA, 'YYYY-MM-DD HH24:MI:SS') HR_ATENDIMENTO,
    NULL CD_ORI_ATE,
    NULL DS_ORI_ATE,
    NULL TP_ORIGEM,
    S.CD_SETOR CD_SETOR,
    S.DS_SETOR DS_SETOR,
    NULL CD_UNID_INT,
    NULL DS_UNID_INT,
    A.CD_CONVENIO CD_CONVENIO,                                                                                           
    A.DS_CONVENIO NM_CONVENIO,
    A.CD_LEITO,
    'DS_LEITO' DS_LEITO,
    'DS_RESUMO_LEITO' DS_RESUMO_LEITO,
    'O' TP_OCUPACAO
     FROM TASY.WIGS_VI_ATENDIMENTO A
     INNER JOIN TASY.WINGS_VI_PACIENTE P ON P.CD_PESSOA_FISICA = A.CD_PESSOA_FISICA
     INNER JOIN TASY.WINGS_VI_SETOR S ON A.CD_SETOR_ATENDIMENTO = S.CD_SETOR
     WHERE  A.NR_ATENDIMENTO = :attendanceId
   AND A.DT_ALTA IS NULL
    `
    log(`attendance_id: ${id}`)
    
    const conn = await oracledb.getConnection();

    const sql = process.env.DBTYPE === 'MV' ? sqlMv : sqlTasy

    const ret = await conn.execute(sql, {
      attendanceId: {
        val: id
      },
    }
    ).then(async (data: any) => {
      await conn.close();
      log(`end for execution, connection close`)
      if (data.rows){
        let rData: IReturn = data.rows[0]

        log(`lines found, return for attendance controller`)

        return {
          paciente: {
            cd_paciente: rData.CD_PACIENTE,
            nm_paciente: rData.NM_PACIENTE,
            dt_nascimento: rData.DT_NASCIMENTO, //"1974-12-13 02:00:00",
            sn_vip: false,
            telefone: rData.TELEFONE
          },
          atendimento: {
            tp_atendimento: rData.TP_ATENDIMENTO,
            dt_atendimento: rData.DT_ATENDIMENTO, //"2022-07-29",
            hr_atendimento: rData.HR_ATENDIMENTO, //"00:39:39",
            dt_alta: null,
            hr_alta: null,
            origem: {
              cd_ori_ate: rData.CD_ORI_ATE,
              ds_ori_ate: rData.DS_ORI_ATE,
              tp_origem: rData.TP_ORIGEM, //"U"
            },
            setor: {
              cd_setor: rData.CD_SETOR,
              ds_setor: rData.DS_SETOR
            },
            unidade_internacao: {
              cd_unid_int: rData.CD_UNID_INT,
              ds_unid_int: rData.DS_UNID_INT
            },
            convenio: {
              cd_convenio: rData.CD_CONVENIO,
              nm_convenio: rData.NM_CONVENIO
            },
            leito: {
              cd_leito: rData.CD_LEITO,
              ds_leito: rData.DS_LEITO,
              ds_resumo_leito: rData.DS_RESUMO_LEITO,
              tp_ocupacao: rData.TP_OCUPACAO
            }
          }
        }

      }

      return null;
      
    }).catch(async (e) => {
      console.error(e);
      await conn.close();
      return null;
    });

    return ret;

  }catch(e) {
    console.error(e);
    return null;
  }
}

