// lib/validationPatterns.ts
export const validationPatterns: Record<
 string,
 { pattern: string; maxLength?: number }
> = {
 email: {
  pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
 },
 tel: {
  pattern: "^[0-9]{10,15}$", // Supports 10-15 digit phone numbers
  maxLength: 15,
 },
 password: {
  pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", // 8+ chars, 1 letter, 1 number
 },
 number: {
  pattern: "^[0-9]+$", // Only digits
 },
 date: {
  pattern: "^\\d{4}-\\d{2}-\\d{2}$", // YYYY-MM-DD format
 },
 text: {
  pattern: ".*", // Any text allowed
 },
};
