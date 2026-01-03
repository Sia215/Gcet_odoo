import { Router } from 'express';
import { markAttendance, getMyAttendanceMonth, getTodayAttendanceForAdmins } from '../controllers/attendanceController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

router.post('/mark', requireAuth, requireRole('EMPLOYEE', 'HR', 'ADMIN'), markAttendance);
router.get('/mine', requireAuth, requireRole('EMPLOYEE'), getMyAttendanceMonth);
router.get('/today', requireAuth, requireRole('HR', 'ADMIN'), getTodayAttendanceForAdmins);

export default router;
