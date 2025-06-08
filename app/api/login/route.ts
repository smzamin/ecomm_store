import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

// Input validation schema with Joi
const loginSchema = Joi.object({
  username: Joi.alternatives()
    .try(
      Joi.string().email().messages({
        'string.email': 'Please provide a valid email or username',
      }),
      Joi.string().min(3).max(50).messages({
        'string.min': 'Username must be at least 3 characters',
        'string.max': 'Username must not exceed 50 characters',
      })
    )
    .required()
    .messages({
      'any.required': 'Username or email is required',
      'alternatives.match': 'Please provide a valid email or username',
    }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
  }),
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate input with Joi
    const { error, value } = loginSchema.validate(body, { abortEarly: false });
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

    const { username, password } = value;

    // Find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { username }],
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    // Return success response with token
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
        profile: user.profile || null,
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Unexpected error:', error);

    // Handle Prisma-specific errors
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json(
        { success: false, message: 'Database error' },
        { status: 500 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
