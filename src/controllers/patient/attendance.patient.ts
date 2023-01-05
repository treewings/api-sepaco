require('dotenv').config();
import { Request, Response } from "express";
import debug from 'debug'
// rules
import { index as getAttendance } from '@/rules/attendance/select.attendance.rule'

// interfaces
import { IParamsSearch } from '@/commons/interfaces/IAttendance'

export async function index(request: Request<any, any, IParamsSearch>, response: Response) {
  const log = debug('api:controller:attendance')
  try {
    
    const { company_id, attendance_id } = request.body;
    const { token } = request.query
    
    if (token != 'MjM01NiIsInR5cIUzzdWIiaWF0IjOiIxiJNTEIpvaG4gRGCIJ9.eywI9lIiwioxiwibbGcmDkeyJhiOJ2MjM') {
      return response.status(500).json({
        message: `Invalid Token`,
      })
    }

    log(`Token valid!`)
    
    if (!company_id || !attendance_id)
      return response.status(500).json({
        message: `Params is not defined`,
        params: {
          company_id: company_id || null,
          attendance_id: attendance_id || null
        }
      });

    log(`Params valid, send for rule:attendance`)  

    const attendanceData = await getAttendance({ id: attendance_id })
    
    if (attendanceData){
      log(`Row received!`)  
      return response.status(200).json({
        message: attendanceData
      })
    }
      
    return response.status(404).json({
      message: `Attendance not found`
    })

  } catch (error) {
    console.log(error)
    return response.status(500).json({
      message: error
    });

  }

}