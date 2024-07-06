import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import clientPromise from '../../api/auth/lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filter: (part) =>
      part.name === 'image' && (part.mimetype?.includes('image') || false),
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Error uploading image' });
    }

    const fileArray = files.image as formidable.File[];
    if (!fileArray || fileArray.length === 0) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const file = fileArray[0];
    const fileName = file.newFilename;
    const filePath = `/uploads/${fileName}`;

    try {
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection('users');

      await usersCollection.updateOne(
        { email: session.user?.email },
        { $set: { image: filePath } },
      );

      res.status(200).json({ imageUrl: filePath });
    } catch (error) {
      console.error('Error updating user image:', error);
      res.status(500).json({ message: 'Error updating user image' });
    }
  });
}
