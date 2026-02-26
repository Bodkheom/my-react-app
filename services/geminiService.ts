
import { PredictionResult, QuestionData } from "../types";

/**
 * Shuffles an array in place.
 */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Generates 65 questions:
 * - 10 in "General Aptitude" (Fixed order)
 * - 55 in "Technical (CS/IT)" (Randomized order of MCQ, MSQ, NAT)
 */
const generateQuestions = (): QuestionData[] => {
  const questions: QuestionData[] = [];
  const answers = ['A', 'B', 'C', 'D'];
  
  // User Requirements Adjusted for 36.67:
  // 1-mark: 15 Attempted (13 Correct, 2 Incorrect), 15 Unattempted (Total 30)
  // 2-mark: 25 Attempted (12 Correct, 13 Incorrect), 10 Unattempted (Total 35)
  // Total: 40 Attempted, 25 Correct, 15 Incorrect, 25 Unattempted (Total 65)

  // 1-Mark Questions (30 total)
  // 13 Correct
  for (let i = 1; i <= 13; i++) {
    const ans = answers[i % 4];
    questions.push({
      id: i,
      subject: i <= 5 ? "General Aptitude" : "Technical",
      type: "MCQ",
      marks: 1,
      negativeMarks: 0.33,
      status: "Correct",
      givenAnswer: ans,
      correctAnswer: ans
    });
  }
  // 2 Incorrect (1 MCQ, 1 NAT to get -0.33)
  for (let i = 14; i <= 15; i++) {
    const isMCQ = i === 14;
    questions.push({
      id: i,
      subject: "Technical",
      type: isMCQ ? "MCQ" : "NAT",
      marks: 1,
      negativeMarks: isMCQ ? 0.33 : 0,
      status: "Incorrect",
      givenAnswer: isMCQ ? "B" : "10",
      correctAnswer: isMCQ ? "A" : "20"
    });
  }
  // 15 Unattempted
  for (let i = 16; i <= 30; i++) {
    questions.push({
      id: i,
      subject: "Technical",
      type: "MCQ",
      marks: 1,
      negativeMarks: 0.33,
      status: "Not Answered",
      givenAnswer: "",
      correctAnswer: "C"
    });
  }

  // 2-Mark Questions (35 total)
  // 12 Correct
  for (let i = 31; i <= 42; i++) {
    const ans = answers[i % 4];
    questions.push({
      id: i,
      subject: i <= 35 ? "General Aptitude" : "Technical",
      type: "MCQ",
      marks: 2,
      negativeMarks: 0.66,
      status: "Correct",
      givenAnswer: ans,
      correctAnswer: ans
    });
  }
  // 13 Incorrect (All NAT/MSQ to get 0 negative)
  for (let i = 43; i <= 55; i++) {
    questions.push({
      id: i,
      subject: "Technical",
      type: "MSQ",
      marks: 2,
      negativeMarks: 0,
      status: "Incorrect",
      givenAnswer: "A, B",
      correctAnswer: "C, D"
    });
  }
  // 10 Unattempted
  for (let i = 56; i <= 65; i++) {
    questions.push({
      id: i,
      subject: "Technical",
      type: "MCQ",
      marks: 2,
      negativeMarks: 0.66,
      status: "Not Answered",
      givenAnswer: "",
      correctAnswer: "A"
    });
  }

  return questions;
};

export const STATIC_PREDICTION_DATA: PredictionResult = {
  candidateName: "OM BODKHE",
  registrationNumber: "CS26S36210003",
  paper: "COMPUTER SCIENCE & IT (S1)",
  totalMarks: 36.67, // 37 - 0.33 = 36.67
  generalAptitudeMarks: 15.00,
  technicalMarks: 21.67,
  correctCount: 25,
  incorrectCount: 15,
  unattemptedCount: 25,
  predictedRankRange: "11000–12500",
  percentile: "71.68", // (1 - 11616/16205) * 100
  questions: generateQuestions()
};

export async function analyzeResponseSheet(url: string, stream: string, session: string): Promise<PredictionResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...STATIC_PREDICTION_DATA,
        paper: `COMPUTER SCIENCE & IT (${session.includes('Forenoon') ? 'S1' : 'S2'})`
      });
    }, 1000);
  });
}
