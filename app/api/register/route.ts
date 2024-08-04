import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
})

export async function POST(req: NextRequest) {
    const body = await req.json();

    const validaiton = schema.safeParse(body);

    if (!validaiton.success)
        return NextResponse.json({ error: validaiton.error.errors }, { status: 400 });

    const user = await prisma.user.findUnique({
        where: { email: body.email }
    });

    if (user)
        return NextResponse.json({ error: "User already exist." }, { status: 400 });

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            hashedPassword
        }
    });

    return NextResponse.json({ email: newUser.email }, { status: 201 });
}