import { Html, Head, Body, Container, Section, Text, Button, Hr, Tailwind } from '@react-email/components';

const EmailVerification = ({url}: {url: string}) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white max-w-[600px] mx-auto p-[40px] rounded-[8px] shadow-sm">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Text className="text-gray-900 text-[28px] font-bold m-0 mb-[16px]">
                Verify Your Email Address
              </Text>
              <Text className="text-gray-600 text-[16px] m-0">
                Please confirm your email address to complete your registration
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-gray-700 text-[16px] leading-[24px] m-0 mb-[16px]">
                Hi there,
              </Text>
              <Text className="text-gray-700 text-[16px] leading-[24px] m-0 mb-[24px]">
                Thank you for signing up! To complete your registration and start using our services, 
                please verify your email address by clicking the button below.
              </Text>

              {/* Verification Button */}
              <Section className="text-center my-[32px]">
                <Button 
                  href={url}
                  className="bg-blue-500 text-white px-[32px] py-[14px] rounded-[6px] text-[16px] font-semibold no-underline box-border"
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-gray-600 text-[14px] leading-[20px] mt-[24px] m-0 text-center">
                If the button above doesn't work, copy and paste this link into your browser:
              </Text>
              <Text className="text-blue-500 text-[14px] break-all mt-[8px] m-0 text-center">
                https://yourwebsite.com/verify-email?token=abc123xyz
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-yellow-50 p-[16px] rounded-[6px] mb-[32px]">
              <Text className="text-yellow-800 text-[14px] m-0 font-medium">
                🔒 Security Notice: This verification link will expire in 24 hours. 
                If you didn't create an account, please ignore this email.
              </Text>
            </Section>

            {/* Footer */}
            <Hr className="border-gray-200 my-[24px]" />
            <Section className="text-center">
              <Text className="text-gray-600 text-[14px] m-0 mb-[8px]">
                Best regards,<br />
                The Team
              </Text>
              <Text className="text-gray-400 text-[12px] mt-[16px] m-0">
                123 Business Street, Suite 100<br />
                Business City, BC 12345<br />
                © 2025 Your Company Name. All rights reserved.
              </Text>
              <Text className="text-gray-400 text-[12px] mt-[8px] m-0">
                <Button href="#" className="text-gray-600 no-underline text-[12px]">
                  Unsubscribe
                </Button>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerification;