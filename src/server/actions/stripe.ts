'use server';

import { headers } from 'next/headers';

import { stripe } from '~/lib/stripe';
import { type Currency, formatAmountForStripe } from '~/lib/stripe-helpers';

import { getCourseDetails } from '../queries/courses';

const CURRENCY: Currency = 'USD';

export async function createCheckoutSession(data: FormData) {
  const courseId = data.get('courseId') as string | null;

  if (!courseId) {
    throw new Error('Missing required course information.');
  }

  const course = await getCourseDetails(courseId);

  if (!course) throw new Error('Course not found!');

  const courseName: string = course.title;
  const coursePrice: number = course.price;

  const ui_mode = 'hosted';
  const origin = headers().get('origin');

  const checkoutSession = await stripe.checkout.sessions.create({
    ui_mode,
    mode: 'payment',
    submit_type: 'auto',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: CURRENCY,
          product_data: {
            name: courseName,
          },
          unit_amount: formatAmountForStripe(coursePrice, CURRENCY),
        },
      },
    ],

    ...(ui_mode === 'hosted' && {
      success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,

      cancel_url: `${origin}/courses`,
    }),
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(data: FormData) {
  const courseId = data.get('courseId') as string | null;

  if (!courseId) {
    throw new Error('Missing required course information.');
  }

  const course = await getCourseDetails(courseId);

  if (!course) throw new Error('Course not found!');

  const coursePrice: number = course.price;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: formatAmountForStripe(coursePrice, CURRENCY),
    automatic_payment_methods: { enabled: true },
    currency: CURRENCY,
  });

  return { client_secret: paymentIntent.client_secret };
}
