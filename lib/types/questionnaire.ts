export interface Question {
 label: string; // ✅ Ensure 'label' is always included
 question: string;
 type:
  | "text"
  | "email"
  | "tel"
  | "password"
  | "textarea"
  | "radio"
  | "checkbox"
  | "number"
  | "date";
 placeholder?: string;
 helperText?: string;
 required?: boolean;
 validationError?: string;
 options?: string[]; // Only for multiple-choice or checkbox
}

export interface Step {
 title: string;
 description?: string;
 questions: Question[];
}

export interface Questionnaire {
 _id: string;
 title: string;
 description?: string;
 steps: Step[];
}

// ✅ Add Responses Interface
export interface Responses {
 [key: string]: string | string[]; // ✅ Single answer (string) or multiple (array of strings)
}
