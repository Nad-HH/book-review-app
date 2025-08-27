import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req: request, secret });

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No autorizado" },
        { status: 401 }
      );
    }

    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error al obtener las reseñas",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req: request, secret });

  if (!token) {
    return NextResponse.json(
      { success: false, error: "No autorizado" },
      { status: 401 }
    );
  }
  const body = await request.json();
  const { user, book_title, rating, review, mood } = body;
  try {
    if (!user || !book_title || !rating || !review || !mood) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const newReview = await prisma.review.create({
      data: {
        user: { connect: { id: Number(user) } },
        book_title,
        rating: Number(rating),
        review,
        mood,
      },
    });
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al crear la reseña", details: (error as Error).message },
      { status: 500 }
    );
  }
}
