import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { sequelize, User, Ticket } from '../models/index.js';
// Initialize environment variables
dotenv.config();
const seedDatabase = async () => {
    try {
        // Sync all tables
        await sequelize.sync({ force: true });
        console.log('Database tables have been reset');
        // Seed users
        const users = await User.bulkCreate([
            {
                username: 'admin',
                password: await bcrypt.hash('password123', 10)
            },
            {
                username: 'user1',
                password: await bcrypt.hash('password123', 10)
            }
        ]);
        console.log(`${users.length} users seeded successfully`);
        // Seed tickets with the correct field names
        const tickets = await Ticket.bulkCreate([
            {
                name: 'Fix login bug',
                description: 'Users are unable to login on mobile devices',
                status: 'todo',
                assignedUserId: users[0].id
            },
            {
                name: 'Add dark mode',
                description: 'Implement dark mode theme for the application',
                status: 'in-progress',
                assignedUserId: users[0].id
            },
            {
                name: 'Update documentation',
                description: 'Update API documentation with new endpoints',
                status: 'done',
                assignedUserId: users[1].id
            }
        ]);
        console.log(`${tickets.length} tickets seeded successfully`);
        console.log('Database seeding completed successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
// Execute the seed function
seedDatabase();
