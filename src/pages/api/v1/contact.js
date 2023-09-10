import { MongoClient } from 'mongodb';
async function handler(req, res) {
    const uri = process.env.MONGO_URI;

    try {
        const client = await MongoClient.connect(uri);
        const db = client.db('mydb');

        if (req.method === 'POST') {
            const { title, subject, email, message } = req.body;

            if (!title || !subject || !email.includes('@') || !message) {
                res.status(422).json({ message: 'Invalid Data' });
                return;
            }
            const status = await db.collection('contact').insertOne({
                title,
                email,
                subject,
                message
            });

            res.status(201).json({ message: 'Message submitted successfully.', ...status });
        } else {
            res.status(500).json({ message: 'Route not valid' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default handler;