import { ReactNode } from 'react';

import { Resend } from 'resend';

import { EmailTemplate } from '~/components/email-template';
import { env } from '~/env';

const resend = new Resend(env.RESEND_API_KEY);

type EmailInfo = {
  to: string;
  subject: string;
  message: string;
};

export const sendEmails = async (emailInfo: EmailInfo[]) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data.to && data.message && data.subject) {
        const to = data.to;
        const subject = data.subject;
        const message = data.message;

        // TODO: I have to add my verified domain email
        const sentInfo = await resend.emails.send({
          from: 'noreply@resend.dev',
          to: to,
          subject: subject,
          react: EmailTemplate({ message }) as ReactNode,
        });

        return sentInfo;
      } else {
        new Promise((reject) => {
          return reject(
            new Error(
              `Couldn't send email, please check the ${JSON.stringify(data)}.`
            )
          );
        });
      }
    })
  );

  return response;
};
