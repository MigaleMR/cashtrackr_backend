import request from 'supertest'
import express from 'express'
import authRouter from '../../routes/authRouter'
import budgetRouter from '../../routes/budgetRouter'

// Mock the rate limiter
jest.mock('../../config/limiter', () => ({
  limiter: (req: any, res: any, next: any) => next()
}));

// Mock the database connection
jest.mock('../../config/db', () => ({
  db: {
    authenticate: jest.fn().mockResolvedValue(true),
    sync: jest.fn().mockResolvedValue(true)
  }
}));

// Mock all models
jest.mock('../../models/User')
jest.mock('../../models/Budget')
jest.mock('../../models/Expense')

// Mock utilities
jest.mock('../../utils/auth')
jest.mock('../../utils/jwt')
jest.mock('../../utils/token')
jest.mock('../../emails/AuthEmail')

// Create a minimal express app for testing
const app = express()
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/budgets', budgetRouter)

describe('API Integration Tests', () => {
    it('should respond to basic auth route', async () => {
        const response = await request(app)
            .post('/api/auth/create-account')
            .send({})

        // Should return validation errors for empty request
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
    })

    it('should respond to budget route with unauthorized', async () => {
        const response = await request(app)
            .get('/api/budgets')

        // Should return unauthorized without JWT
        expect(response.status).toBe(401)
    })
})
