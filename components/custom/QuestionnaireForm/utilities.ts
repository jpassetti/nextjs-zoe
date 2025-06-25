export function trackFormStep(step: number, questionnaireTitle: string) {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      "event",
      "form_step",
      {
        step,
        questionnaire_title: questionnaireTitle,
      }
    );
  }
}
export function trackFormCompletion(questionnaireTitle: string) {
  if (
    typeof window !== "undefined" &&
    (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  ) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
      "event",
      "form_complete",
      {
        questionnaire_title: questionnaireTitle,
      }
    );
  }
}
