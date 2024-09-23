import { type NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import UserModel from '~/server/models/user';
import dbConnect from '~/server/services/db-connect';

export const POST = async (request: NextRequest) => {
  try {
    // Parse the request body and validate it
    const { firstName, lastName, email, password, userRole } =
      await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !userRole) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required',
        },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is already taken.',
        },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user object
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: userRole,
    };

    // Attempt to create the user in the database
    await UserModel.create(newUser);

    return NextResponse.json(
      {
        success: true,
        message: 'User has been created',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    // Handle specific error cases
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON format',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
};
