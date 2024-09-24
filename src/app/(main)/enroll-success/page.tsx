import Link from 'next/link';
import { redirect } from 'next/navigation';

import { type PaymentIntent } from '@stripe/stripe-js';
import { Ban, CircleCheck, Loader } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { sendEmails } from '~/lib/email';
import { stripe } from '~/lib/stripe';
import { auth } from '~/server/auth';
import { getCourseDetails } from '~/server/queries/courses';
import { enrollForCourse } from '~/server/queries/enrollments';
import { getUserByEmail } from '~/server/queries/users';

type EnrollSuccessPageProps = {
  searchParams: {
    session_id: string;
    courseId: string;
  };
};

export default async function EnrollSuccessPage({
  searchParams: { session_id, courseId },
}: EnrollSuccessPageProps) {
  if (!session_id)
    throw new Error('Please provide a valid session id that starts with cs_');

  const userSession = await auth();

  if (!userSession?.user?.email) {
    redirect('/login');
  }

  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession?.user?.email);
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const paymentIntent = checkoutSession?.payment_intent as PaymentIntent;
  const paymentStatus = paymentIntent?.status;

  // Customer info
  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const courseName = course?.title;

  if (paymentStatus === 'succeeded') {
    // Update DB (Enrollment collection)
    const enrolled = await enrollForCourse(
      course?.id,
      loggedInUser?.id,
      'stripe'
    );

    console.log('🚀 ~ enrolled:', enrolled);

    // Send Emails to the instructor, student and the person who paid
    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = course?.instructor?.email;

    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New Enrollment for ${courseName}.`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${courseName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Success for ${courseName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${courseName}`,
      },
    ];

    const emailSentResponse = await sendEmails(emailsToSend);
    console.log('🚀 ~ emailSentResponse:', emailSentResponse);
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="flex max-w-[600px] flex-col items-center gap-6 text-center">
        {paymentStatus === 'succeeded' && (
          <>
            <CircleCheck className="h-32 w-32 rounded-full bg-success p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations, <strong>{customerName}</strong>! your Enrollment
              was Successful for <strong>{courseName}</strong> course.
            </h1>
            <div className="flex items-center gap-3">
              <Button asChild size="sm">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/courses/66549c99b2aaa1cc3461fc9a">
                  Play Course
                </Link>
              </Button>
            </div>
          </>
        )}
        {paymentStatus === 'processing' && (
          <>
            <Loader className="h-32 w-32 rounded-full bg-yellow-500 p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Your enrollment is being processed. Please wait a moment.
            </h1>
          </>
        )}
        {paymentStatus === 'canceled' && (
          <>
            <Ban className="h-32 w-32 rounded-full bg-red-600 p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Payment failed. Please try again.
            </h1>
          </>
        )}
      </div>
    </div>
  );
}
