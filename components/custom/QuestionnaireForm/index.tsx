import Form from "@/components/html/Form";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";

// 🛠 Define TypeScript interfaces for clarity
interface Question {
 label: string;
 question: string;
 type:
  | "text"
  | "email"
  | "tel"
  | "password"
  | "number"
  | "date"
  | "textarea"
  | "radio"
  | "checkbox";
 placeholder?: string;
 helperText?: string;
 required?: boolean;
 options?: string[];
}

interface Step {
 title: string;
 description?: string;
 questions: Question[];
}

interface Questionnaire {
 title: string;
 description?: string;
 steps: Step[];
}

interface QuestionnaireFormProps {
 step: number;
 setStep: (step: number) => void;
 responses: Record<string, string | string[]>; // Supports multiple answers for checkboxes
 handleInputChange: (
  question: string,
  value: string | string[],
  type?: string
 ) => void;
 questionnaire: Questionnaire;
 isStepValid: boolean;
 handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function QuestionnaireForm({
 step,
 setStep,
 responses,
 handleInputChange,
 questionnaire,
 isStepValid,
 handleSubmit,
}: QuestionnaireFormProps) {
 return (
  <Form onSubmit={handleSubmit}>
   {/* Step Title */}
   <Heading level={2} marginBottom={1} marginTop={3} color="black">
    {questionnaire.steps[step]?.title || "Untitled Step"}
   </Heading>
   {questionnaire.steps[step]?.description && (
    <Paragraph color="black" marginBottom={3}>
     {questionnaire.steps[step].description}
    </Paragraph>
   )}

   {/* Render Questions */}
   {questionnaire.steps[step]?.questions?.map((q, index) => (
    <Form.Group key={`step-${step}-question-${index}`}>
     <Heading level={3} marginBottom={1} color="black">
      {q.label} {q.required && <span style={{ color: "red" }}>*</span>}
     </Heading>
     {q.helperText && <Paragraph color="gray">{q.helperText}</Paragraph>}

     {/* Text Inputs */}
     {["text", "email", "tel", "password", "number", "date"].includes(
      q.type
     ) && (
      <Form.Input
       type={q.type}
       placeholder={q.placeholder || ""}
       value={responses[q.question] || ""}
       required={q.required}
       onChange={(e) => handleInputChange(q.question, e.target.value)}
      />
     )}

     {/* Textarea */}
     {q.type === "textarea" && (
      <Form.Textarea
       placeholder={q.placeholder || ""}
       value={
        Array.isArray(responses[q.question])
         ? (responses[q.question] as string[]).join(", ") // Ensure it's an array before using join
         : (responses[q.question] as string) || ""
       } // Ensure it's a string
       onChange={(e) => handleInputChange(q.question, e.target.value)}
      />
     )}

     {/* Radio Buttons */}
     {q.type === "radio" &&
      Array.isArray(q.options) &&
      q.options.map((option, i) => (
       <Form.Label key={`radio-${step}-${q.question}-${i}`}>
        <Form.Input
         type="radio"
         name={`radio-${step}-${q.question}`}
         value={option}
         checked={responses[q.question] === option}
         onChange={(e) => handleInputChange(q.question, e.target.value)}
        />
        {option}
       </Form.Label>
      ))}

     {/* Checkbox */}
     {q.type === "checkbox" &&
      Array.isArray(q.options) &&
      q.options.map((option, i) => (
       <Form.CheckboxGroup key={`checkbox-${step}-${q.question}-${i}`}>
        <Form.Label>
         <Form.Input
          type="checkbox"
          name={`checkbox-${step}-${q.question}`}
          value={option}
          checked={(responses[q.question] as string[])?.includes(option)}
          onChange={() => handleInputChange(q.question, option, "checkbox")}
         />
         {option}
        </Form.Label>
       </Form.CheckboxGroup>
      ))}
    </Form.Group>
   ))}

   {/* Navigation Buttons */}
   <Button.Group justifyContent="space-between" borderTop={1}>
    {step > 0 && (
     <Button.Step
      label="Previous"
      buttonType="button"
      clickHandler={() => setStep(step - 1)}
     />
    )}
    {step < questionnaire.steps.length - 1 && (
     <Button.Step
      label="Next"
      buttonType="button"
      disabled={!isStepValid}
      clickHandler={() => setStep(step + 1)}
     />
    )}
    {step === questionnaire.steps.length - 1 && (
     <Button label="Submit" buttonType="submit" />
    )}
   </Button.Group>
  </Form>
 );
}
