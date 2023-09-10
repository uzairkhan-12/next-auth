import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
async function handler(req, res) {
    const uri = process.env.MONGO_URI;
    const options = {};

    try {
        const client = await MongoClient.connect(uri, options);
        const db = client.db('mydb');

        if (req.method === 'POST') {
            const { email, name, password } = req.body;

            if (!email || !name || !email.includes('@') || !password) {
                res.status(422).json({ message: 'Invalid Data' });
                return;
            }

            const checkExisting = await db.collection('users').findOne({ email: email });

            if (checkExisting) {
                res.status(422).json({ message: 'User already exists' });
                return;
            }

            const status = await db.collection('users').insertOne({
                email,
                name,
                password: await hash(password, 12),
            });

            res.status(201).json({ message: 'User created', ...status });
        } else {
            res.status(500).json({ message: 'Route not valid' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default handler;