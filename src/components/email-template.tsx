interface EmailTemplateProps {
  message: string;
}

export function EmailTemplate({ message }: EmailTemplateProps) {
  return <div>{message}</div>;
}
