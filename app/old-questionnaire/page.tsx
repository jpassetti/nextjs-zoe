"use client";

import { useState } from "react";

import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Section from "@/components/layout/Section";
import Form from "@/components/html/Form";
import Button from "@/components/html/Button";

const QuestionnaireLandingPage = () => {
 const [step, setStep] = useState<number>(1);
 return (
  <Section backgroundColor="primary-dark">
   <Container type="content">
    <Heading level={1} color="white" marginBottom={2}>
     Consultation Questionnaire
    </Heading>
    <Paragraph color="white" marginBottom={6}>
     Your responses will help us make the most of our time together.
    </Paragraph>
    <Form>
     {step === 1 && (
      <Form.Slide>
       <Heading level={2} marginBottom={1} marginTop={3} color="accent">
        Step 1: Contact Information
       </Heading>
       <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Input placeholder="First Name" type="text" />
       </Form.Group>
       <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Input placeholder="Email" type="email" />
       </Form.Group>
       <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Input placeholder="Phone" type="tel" />
       </Form.Group>
      </Form.Slide>
     )}
     {step === 2 && (
      <Form.Slide>
       <Heading level={2} marginBottom={1} marginTop={3} color="accent">
        Step 2: Company Information
       </Heading>
       <Form.Group>
        <Form.Label>Size (e.g., number of employees)</Form.Label>
        <Form.Input placeholder="Size" type="number" />
       </Form.Group>
       <Form.Group>
        <Form.Label>Industry</Form.Label>
        <Form.Input placeholder="Industry" type="text" />
       </Form.Group>
       <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Input placeholder="Role" type="text" />
       </Form.Group>
       <Form.Group>
        <Paragraph marginBottom={1} color="white">
         <strong>Inquiring for self or to sponsor someone?</strong>
        </Paragraph>

        <Form.Input type="radio" name="self" />
        <Form.Label htmlFor="self">Self</Form.Label>

        <Form.Input type="radio" name="someone-else" />
        <Form.Label htmlFor="someone-else">Someone else</Form.Label>
       </Form.Group>
      </Form.Slide>
     )}
     {step === 3 && (
      <Form.Slide>
       <Heading level={2} marginBottom={1} marginTop={3} color="accent">
        Step 3: Current Challenges
       </Heading>
       <Form.Group>
        <Paragraph marginBottom={1} color="white">
         <strong>What is the primary challenge you&apos;re facing?</strong>
        </Paragraph>
        <Form.CheckboxGroup>
         <Form.Input type="checkbox" name="driving-innovation" />
         <Form.Label htmlFor="driving-innovation">
          Driving innovation (e.g., product-market fit, branding, new
          initiatives)
         </Form.Label>
        </Form.CheckboxGroup>
        <Form.CheckboxGroup>
         <Form.Input type="checkbox" name="exploring-growth-opportunities" />
         <Form.Label htmlFor="exploring-growth-opportunities">
          Exploring growth opportunities (e.g., funding, hiring, expanding to
          new markets)
         </Form.Label>
        </Form.CheckboxGroup>
        <Form.CheckboxGroup>
         <Form.Input type="checkbox" name="scaling-organization" />
         <Form.Label htmlFor="scaling-organization">
          Scaling the organization (e.g., improving operations through systems
          and structure)
         </Form.Label>
        </Form.CheckboxGroup>
        <Form.CheckboxGroup>
         <Form.Input type="checkbox" name="navigating-transition" />
         <Form.Label htmlFor="navigating-transition">
          Navigating a transition (e.g., succession planning, new role, M&A,
          restructuring)
         </Form.Label>
        </Form.CheckboxGroup>
        <Form.CheckboxGroup>
         <Form.Input type="checkbox" name="aligning-team" />
         <Form.Label htmlFor="navigating-transition">
          Aligning teams or departments to a common vision
         </Form.Label>
        </Form.CheckboxGroup>
        <Form.CheckboxGroup>
         <Form.Input type="checkbox" name="other" />
         <Form.Label htmlFor="other">Other</Form.Label>
        </Form.CheckboxGroup>
       </Form.Group>
      </Form.Slide>
     )}
     {step === 4 && (
      <Form.Slide>
       <Heading level={2} marginBottom={1} marginTop={3} color="accent">
        Step 4: Your Goals
       </Heading>
       <Paragraph marginBottom={1} marginTop={2} color="white">
        <strong>What is your primary goal?</strong>
       </Paragraph>
       <Form.CheckboxGroup>
        <Form.Input type="checkbox" name="develop-my-personal-leadership" />
        <Form.Label htmlFor="develop-my-personal-leadership">
         Develop my personal leadership
        </Form.Label>
       </Form.CheckboxGroup>
       <Form.CheckboxGroup>
        <Form.Input
         type="checkbox"
         name="increase-team-alignment-and-collaboration"
        />
        <Form.Label htmlFor="increase-team-alignment-and-collaboration">
         Increase team alignment and collaboration
        </Form.Label>
       </Form.CheckboxGroup>
       <Form.CheckboxGroup>
        <Form.Input
         type="checkbox"
         name="improve-organizational-change-management"
        />
        <Form.Label htmlFor="improve-organizational-change-management">
         Improve organizational change management
        </Form.Label>
       </Form.CheckboxGroup>
       <Form.CheckboxGroup>
        <Form.Input
         type="checkbox"
         name="strengthen-decision-making-or-strategic-planning"
        />
        <Form.Label htmlFor="strengthen-decision-making-or-strategic-planning">
         Strengthen decision-making or strategic planning
        </Form.Label>
       </Form.CheckboxGroup>
       <Form.CheckboxGroup>
        <Form.Input
         type="checkbox"
         name="manage-stress-and-achieve-better-work-life-balance"
        />
        <Form.Label htmlFor="manage-stress-and-achieve-better-work-life-balance">
         Manage stress and achieve better work-life balance
        </Form.Label>
       </Form.CheckboxGroup>
       <Form.CheckboxGroup>
        <Form.Input type="checkbox" name="other" />
        <Form.Label htmlFor="other">Other</Form.Label>
       </Form.CheckboxGroup>
       <Form.Group>
        <Form.Label htmlFor="ideal-outcome">
         {" "}
         What is your ideal outcome for the consultation?
        </Form.Label>

        <Form.Textarea name="ideal-outcome" />
       </Form.Group>
      </Form.Slide>
     )}
     {step === 5 && (
      <Form.Slide>
       <Heading level={2} marginBottom={1} marginTop={3} color="accent">
        Step 5: Consultation Preferences
       </Heading>
       <Form.Group>
        <Paragraph marginTop={2} marginBottom={1} color="white">
         Do you prefer in-person or remote consultations?
        </Paragraph>
        <Form.Input type="radio" name="in-person" />
        <Form.Label htmlFor="in-person">In-person</Form.Label>
        <Form.Input type="radio" name="remote" />
        <Form.Label htmlFor="remote">Remote</Form.Label>
       </Form.Group>
       <Form.Group>
        <Form.Label htmlFor="preferred-date-and-time">
         What is your preferred date and time?
        </Form.Label>
        <Form.Input placeholder="Date and Time" type="datetime-local" />
       </Form.Group>
      </Form.Slide>
     )}
     <Button.Group>
      {step > 1 && (
       <Button.Step
        label="Previous"
        // type="inverted-white"
        clickHandler={(e) => {
         e.preventDefault();
         setStep(step - 1);
        }}
       />
      )}
      {step < 5 && (
       <Button.Step
        label="Next"
        // type="accent"
        clickHandler={(e) => {
         e.preventDefault();
         setStep(step + 1);
        }}
       />
      )}
      {step === 5 && <Button label="Submit" type="accent" />}
     </Button.Group>
    </Form>
   </Container>
  </Section>
 );
};
export default QuestionnaireLandingPage;
