import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Button from "@/components/html/Button";
import { Ol, Li } from "@/components/html/List";

const ConsultationPage = () => {
 return (
  <Section>
   <Container type="content">
    <Heading level={1} marginBottom={1}>
     Transform Your Leadership:
     <br />
     Book Your Consultation Today
    </Heading>
    <Paragraph marginBottom={2}>
     This focused conversation is designed to help you define priorities,
     uncover opportunities, and explore how a tailored approach can drive
     meaningful results.
    </Paragraph>
    <Button.Group>
     <Button label="Begin Questionnaire" type="primary" href="/questionnaire" />
    </Button.Group>
    <Heading level={2} marginTop={6} marginBottom={2}>
     About the Initial Consultation
    </Heading>
    <Paragraph marginBottom={1}>
     The initial consultation is an invaluable first step toward gaining
     clarity, understanding your unique challenges, and determining if we’re the
     right fit to work together. This focused conversation allows us to explore
     your goals and current situation in depth, ensuring we can identify
     opportunities to create meaningful impact.
    </Paragraph>
    <Paragraph marginBottom={1}>
     To make the most of our time together, I ask that you complete a short
     questionnaire beforehand. Your thoughtful responses will guide our
     discussion, helping us maximize the value of the session and ensure a
     productive, tailored experience.
    </Paragraph>
    <Ol>
     <Li>
      <Heading level={3}>Confidentiality and Trust</Heading>
      <Paragraph>
       This consultation is a safe, judgment-free space to share your leadership
       challenges, goals, and vision. Your privacy is my priority, and I use
       approaches that ensure all conversations are handled with discretion,
       backed by tools designed to uphold confidentiality and data security.
      </Paragraph>
     </Li>
     <Li>
      <Heading level={3}>Discovery and Clarity</Heading>
      <Paragraph>
       We’ll begin by getting to know each other, guided by the insights you
       share in the questionnaire. This focused discussion will uncover key
       themes, opportunities, and challenges in your leadership or
       organizational context. It’s also a chance for you to learn more about my
       approach, ask questions, and gain insight into how we might work together
       to address your goals.
      </Paragraph>
     </Li>
     <Li>
      <Heading level={3}>Next Steps and a Tailored Plan</Heading>
      <Paragraph>
       Together, we’ll identify actionable steps and potential pathways forward.
       If we agree there’s a mutual fit, I’ll outline a personalized plan to
       help you achieve your goals, whether that’s enhancing leadership
       effectiveness, aligning teams, or navigating organizational change.
      </Paragraph>
     </Li>
    </Ol>
   </Container>
  </Section>
 );
};
export default ConsultationPage;
