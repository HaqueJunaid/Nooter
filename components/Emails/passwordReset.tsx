import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';

interface PasswordResetEmailProps {
    userEmail: string,
    resetLink: string,
    companyName: string
}

const PasswordResetEmail = ({userEmail, resetLink, companyName}: PasswordResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0">
                Password Reset Request
              </Heading>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px]">
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetLink}
                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border"
              >
                Reset Your Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                If the button above doesn't work, copy and paste this link into your browser:
              </Text>
              <Link
                href={resetLink}
                className="text-blue-600 text-[14px] break-all underline"
              >
                {resetLink}
              </Link>
            </Section>

            {/* Security Notice */}
            <Section className="bg-yellow-50 border-l-[4px] border-yellow-400 p-[16px] mb-[32px]">
              <Text className="text-[14px] text-yellow-800 leading-[20px] m-0">
                <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged. For additional security, consider enabling two-factor authentication on your account.
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                Need help? Contact our support team at{' '}
                <Link href="mailto:support@company.com" className="text-blue-600 underline">
                  support@company.com
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0 mb-[8px]">
                This email was sent by {companyName}
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0 mb-[8px]">
                123 Business Street, Suite 100, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0">
                © 2024 {companyName}. All rights reserved. |{' '}
                <Link href="#" className="text-gray-500 underline">
                  Privacy Policy
                </Link>{' '}
                |{' '}
                <Link href="#" className="text-gray-500 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  userEmail: "junaid132boss@gmail.com",
  resetLink: "https://yourapp.com/reset-password?token=abc123xyz789",
  companyName: "Your Company",
};

export default PasswordResetEmail;