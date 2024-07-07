import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '../../auth/lib/db';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { name } = body;

  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { email: session.user.email },
      { $set: { name: name } },
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({
        message: 'Name updated successfully',
        name: name,
      });
    } else {
      return NextResponse.json(
        { message: 'User not found or name not changed' },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Error updating user' },
      { status: 500 },
    );
  }
}
