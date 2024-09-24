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
  {
    to: checkoutSession.customer_details?.email,
    subject: `Your Account is Used for Payment`,
    message: `Hi ${checkoutSession.customer_details?.name}, This is to inform you that your account has been used for payment for the course ${courseName}.`,
  },
];
