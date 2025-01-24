import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

const HomepageAbout = () => {
 return (
  <Section backgroundColor="white">
   <Container type="content">
    <Heading
     level={2}
     color="primary"
     marginTop={4}
     marginBottom={2}
     textAlign="center"
    >
     About Me
    </Heading>
    <Paragraph marginBottom={2} textAlign="center">
     Zoe is a leadership consultant and coach, focused on helping executives and
     organizations thrive through change. With years of experience, she guides
     leaders to align strategy, build strong teams, and drive lasting results.
    </Paragraph>

    <Paragraph marginBottom={2} textAlign="center">
     Her approach blends practical insights with a commitment to integrity and
     sustainable success. Whether you’re an individual leader or part of a team,
     Zoe provides the tools and support needed to navigate challenges and grow.
    </Paragraph>
    <Button.Group justifyContent="center">
     <Button href="/about" type="accent" label="Learn More" />
    </Button.Group>
   </Container>
  </Section>
 );
};
export default HomepageAbout;
