import { Request, Response } from 'express'
import { index as healthCheckRule } from '@/rules/healthCheck/data.healthCheck'
export async function index(request: Request, response: Response){
  const dataHealthCheck = await healthCheckRule();

  return response.status(200).json({
    status: {
      general: { // ver testes que possam ser feitos.
        success: true,
      }, 
      database: dataHealthCheck,
    }
    
  });
}