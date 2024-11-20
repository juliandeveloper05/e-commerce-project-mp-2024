import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/authOptions';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import clientPromise from '../../auth/lib/db';

export async function POST(request: NextRequest) {
  console.log('Debug: Solicitud de carga de imagen recibida');

  const session = await getServerSession(authOptions);
  if (!session) {
    console.log('Debug: No se encontró sesión');
    return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      console.log('Debug: No se cargó ningún archivo de imagen');
      return NextResponse.json(
        { message: 'No se cargó ningún archivo de imagen' },
        { status: 400 },
      );
    }

    const buffer = await file.arrayBuffer();
    const filename = Date.now() + '-' + file.name.replaceAll(' ', '_');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, Buffer.from(buffer));
    console.log('Debug: Imagen guardada exitosamente:', filepath);

    const fileUrl = `/uploads/${filename}`;
    console.log('Debug: URL del archivo:', fileUrl);

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Buscar al usuario actual para obtener la imagen anterior
    const user = await usersCollection.findOne({ email: session.user.email });
    if (user && user.image && user.image.startsWith('/uploads/')) {
      // Si existe una imagen anterior, eliminarla
      const oldImagePath = path.join(process.cwd(), 'public', user.image);
      try {
        await unlink(oldImagePath);
        console.log('Debug: Imagen anterior eliminada:', oldImagePath);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }

    const result = await usersCollection.updateOne(
      { email: session.user.email },
      { $set: { image: fileUrl } },
    );

    if (result.modifiedCount === 1) {
      console.log('Debug: Imagen del usuario actualizada en la base de datos');
      return NextResponse.json({ imageUrl: fileUrl }, { status: 200 });
    } else {
      console.log(
        'Debug: Falló al actualizar la imagen del usuario en la base de datos',
      );
      return NextResponse.json(
        {
          message:
            'Falló al actualizar la imagen del usuario en la base de datos',
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Debug: Error al actualizar la imagen del usuario:', error);
    return NextResponse.json(
      { message: 'Error al actualizar la imagen del usuario' },
      { status: 500 },
    );
  }
}
