import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, email, password, name } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "กรุณากรอก Username และ Password" },
        { status: 400 }
      );
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: "Username ต้องมีอย่างน้อย 3 ตัวอักษร" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password ต้องมีอย่างน้อย 6 ตัวอักษร" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username นี้ถูกใช้แล้ว" },
        { status: 409 }
      );
    }

    // Check if email already exists (if provided)
    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        return NextResponse.json(
          { error: "Email นี้ถูกใช้แล้ว" },
          { status: 409 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        username,
        email: email || null,
        password: hashedPassword,
        name: name || username,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "ไม่สามารถสมัครสมาชิกได้ในขณะนี้" },
      { status: 503 }
    );
  }
}
