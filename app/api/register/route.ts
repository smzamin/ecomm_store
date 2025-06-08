import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username must not exceed 50 characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
  }),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { error, value } = registerSchema.validate(body, { abortEarly: false });
  if (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed',
        errors: error.details.map((err) => err.message),
      },
      { status: 400 }
    );
  }

  const { username, email, password, confirmPassword } = value;

  if (password !== confirmPassword) {
    NextResponse.json({ success: false, message: 'Passwords do not match' });
    return;
  }

  try {
    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    // Start a Prisma transaction
    const result = await prisma.$transaction(async (tx) => {
      const existingUser = await tx.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        throw new Error(
          existingUser.email === email
            ? 'Email already exists'
            : 'Username already exists'
        );
      }

      // Create the user
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      // Create a related profile (example of a transactional operation)
      const profile = await tx.profile.create({
        data: {
          bio: `Welcome, ${username}!`,
          user: {
            connect: { id: user.id },
          },
        },
      });

      return { user, profile };
    });
    const token = jwt.sign(
      {
        email: result.user.email,
        username: result.user.username,
      },
      process.env.JWT_SECRET as string, // Ensure JWT_SECRET is defined in .env
      {
        expiresIn: '1h', // Token expires in 1 hour
      }
    );
    // Return success response
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          username: result.user.username,
          email: result.user.email,
          profile: {
            bio: result.profile.bio,
            imageUrl: result.profile.imageUrl,
            name: result.profile.name,
          },
          token,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle validation errors
    if (error) {
      return NextResponse.json(
        {
          message: 'User already registered!',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle other errors (e.g., duplicate user, database errors)
    return NextResponse.json(
      {
        message: error.message || 'Registration failed',
      },
      { status: 500 }
    );
  }
}
