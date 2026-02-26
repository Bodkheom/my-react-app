
export type Stream = 'Civil Engineering' | 'Mechanical Engineering' | 'Electrical Engineering' | 'Electronics & Communication' | 'Computer Science & IT' | 'Instrumentation Engineering' | 'Chemical Engineering' | 'Production and Industrial';

export type Session = 'Session 1 (Forenoon)' | 'Session 2 (Afternoon)';

export interface QuestionData {
  id: number;
  subject: string;
  type: 'MCQ' | 'MSQ' | 'NAT';
  marks: number;
  negativeMarks: number;
  status: 'Correct' | 'Incorrect' | 'Not Answered';
  givenAnswer: string;
  correctAnswer: string;
}

export interface PredictionResult {
  candidateName: string;
  registrationNumber: string;
  paper: string;
  totalMarks: number;
  generalAptitudeMarks: number;
  technicalMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  predictedRankRange: string;
  percentile: string;
  questions: QuestionData[];
}
