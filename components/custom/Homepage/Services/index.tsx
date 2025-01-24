import Button from "@/components/html/Button";
import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Image from "next/image";
import Paragraph from "@/components/html/Paragraph";
import Row from "@/components/layout/Row";
import Section from "@/components/layout/Section";

const services = [
 {
  id: 1,
  title: "Executive Coaching",
  icon: "compass",
  description:
   "Empower your leadership potential with one-on-one coaching designed to help you overcome challenges and achieve your goals.",
 },
 {
  id: 2,
  title: "Organizational Development",
  icon: "flow-chart",
  description:
   "Foster collaboration and alignment within your teams to create a culture of high performance and resilience.",
 },
 {
  id: 3,
  title: "Go-to-Market Strategy",
  icon: "checklist",
  description:
   "Develop clear, actionable strategies to launch or scale your product and connect with your ideal market.",
 },
];

const HomepageServices = () => {
 return (
  <Section>
   <Container type="content">
    <Heading level={2} textAlign="center" marginTop={4} marginBottom={2}>
     Our Services
    </Heading>
    <Paragraph textAlign="center" marginBottom={4}>
     Transform with Irini offers tailored solutions for executives and
     organizations, helping you navigate change, strengthen leadership, and
     drive growth.
    </Paragraph>
   </Container>
   <Container>
    <Row flexDirection="row">
     {services.map((service) => (
      <Col sm={4} textAlign="center" key={service.id}>
       <Image
        src={`/icons/${service.icon}.svg`}
        alt={service.title}
        width={48}
        height={48}
       />
       <Heading level={3} marginBottom={1} marginTop={1}>
        {service.title}
       </Heading>
       <Paragraph>{service.description}</Paragraph>
      </Col>
     ))}
    </Row>
   </Container>
   <Container type="content">
    <Button.Group justifyContent="center">
     <Button href="/services" type="accent" label="View all services" />
    </Button.Group>
   </Container>
  </Section>
 );
};
export default HomepageServices;
