import { Router } from 'express';

import { index as healthCheckController } from '@/controllers/health.check';
import { index as getAttendance } from '@/controllers/patient/attendance.patient'

const routes = Router();

routes.get(`/health-check`, healthCheckController)

// attendances
routes.post(`/clinic/attendance`, getAttendance);

export default routes;
