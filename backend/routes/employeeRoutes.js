import { Router } from 'express';
import { createEmployee, listEmployees } from '../controllers/employeeController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Only HR or ADMIN can create/list employees
router.post('/', requireAuth, requireRole('HR', 'ADMIN'), createEmployee);
router.get('/', requireAuth, requireRole('HR', 'ADMIN'), listEmployees);

export default router;
