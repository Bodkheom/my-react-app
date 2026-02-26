
import React, { useState } from 'react';
import { PredictionResult, QuestionData } from '../types';

interface ResultsDashboardProps {
  result: PredictionResult;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onReset }) => {
  const [showRankCard, setShowRankCard] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Constants updated per user request
  const TEST_DATE = "08/02/2026";
  const TEST_CENTER = "CENTER-IND-6210";
  const TEST_TIME = "9:30 AM - 12:30 PM";
  const QUALIFYING_MARKS = 29.5;
  const EXPECTED_SCORE = 460;
  const OVERALL_RANK_NUM = 11616;
  const TOTAL_PARTICIPANTS = 16205;

  // Manual summary breakdown values (simulating the requested dist)
  const oneMarkAttempted = 15;
  const twoMarkAttempted = 25;
  const totalAttempted = 40;
  
  const oneMarkCorrect = 13;
  const twoMarkCorrect = 12;
  const totalCorrect = 25;

  const positiveMarks = 37;
  const negativeMarks = -0.33;
  const finalTotalMarks = 36.67;

  const handleShowRank = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShowRankCard(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  };

  const aptitudeQuestions = result.questions.filter(q => q.subject.toLowerCase().includes('aptitude'));
  const technicalQuestions = result.questions.filter(q => q.subject.includes('Technical'));

  const isForenoon = result.paper.includes('S1');

  return (
    <div className="w-full bg-[#E6F3F5] min-h-screen animate-fadeIn pb-20 font-sans">
      {/* Top Blue Bar - Strictly 'Gate (CS Forenoon)' as requested */}
      <div className="w-full bg-[#4D84F5] text-white py-4 px-6 text-center text-xl font-normal shadow-sm">
        Gate (CS Forenoon)
      </div>

      <div className="mt-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3D5A5A] uppercase tracking-tight">
            GATE 2026 {TEST_DATE} {isForenoon ? 'S1' : 'S2'}
          </h2>
          <div className="h-[1px] w-48 bg-gray-400 mx-auto mt-4"></div>
        </div>

        {showRankCard ? (
          <div className="animate-fadeIn pb-20">
            <h1 className="text-3xl md:text-4xl font-medium text-gray-800 text-center mb-16 tracking-tight">
              Your Estimated GATE 2026 Performance
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PerformanceCard color="bg-[#4D84F5]" title="Forenoon" subtitle="My Set" />
              <PerformanceCard color="bg-[#F5A623]" title={finalTotalMarks.toFixed(2)} subtitle="My Marks" />
              <PerformanceCard color="bg-[#D0021B]" title={QUALIFYING_MARKS.toFixed(2)} subtitle="Approximate Qualifying Marks" titleColor="text-[#D0021B]" />
              <PerformanceCard color="bg-[#50E3C2]" title={EXPECTED_SCORE.toString()} subtitle="Expected Score" />
              <PerformanceCard color="bg-[#F5A623]" title={result.predictedRankRange} subtitle="Expected All India Rank" />
              <PerformanceCard color="bg-[#D0021B]" title={<span className="flex items-baseline gap-2">{OVERALL_RANK_NUM} <span className="text-sm font-normal text-gray-400 lowercase">out of</span> {TOTAL_PARTICIPANTS}</span>} subtitle="Current Estimated Overall Rank" />
            </div>

            <div className="mt-20 flex flex-col items-center space-y-4">
              <button onClick={() => setShowRankCard(false)} className="text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-600 transition">Back to Detailed View</button>
              <button onClick={onReset} className="bg-[#4D84F5] text-white px-12 py-4 rounded-md font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-blue-600 transition">Check Another Result</button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20 px-4 md:px-10">
              <div className="lg:col-span-7 bg-white rounded-sm overflow-hidden border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-100">
                    <InfoRow label="Participant ID" value={result.registrationNumber} />
                    <InfoRow label="Participant Name" value={result.candidateName} />
                    <InfoRow label="Test Center Name" value={TEST_CENTER} />
                    <InfoRow label="Test Date" value={TEST_DATE} />
                    <InfoRow label="Test Time" value={TEST_TIME} />
                    <InfoRow label="Subject" value={`COMPUTER SCIENCE & IT (${isForenoon ? 'S1' : 'S2'})`} />
                  </tbody>
                </table>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="overflow-hidden border border-[#508D83] rounded-sm shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#83A6A0] text-white font-bold">
                      <tr>
                        <th className="px-4 py-3 border-r border-white/10">Set</th>
                        <th className="px-4 py-3 border-r border-white/10 text-center">1 Mark</th>
                        <th className="px-4 py-3 border-r border-white/10 text-center">2 Mark</th>
                        <th className="px-4 py-3 text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50 text-gray-800 font-medium">
                      <tr>
                        <td className="px-4 py-3 border-r border-gray-50 font-bold text-[#458B43]">Attempted</td>
                        <td className="px-4 py-3 border-r border-gray-50 text-center">{oneMarkAttempted}</td>
                        <td className="px-4 py-3 border-r border-gray-50 text-center">{twoMarkAttempted}</td>
                        <td className="px-4 py-3 text-center font-black">{totalAttempted}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 border-r border-gray-50 font-bold text-[#BD0000]">Correct</td>
                        <td className="px-4 py-3 border-r border-gray-50 text-center">{oneMarkCorrect}</td>
                        <td className="px-4 py-3 border-r border-gray-50 text-center">{twoMarkCorrect}</td>
                        <td className="px-4 py-3 text-center font-black">{totalCorrect}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-hidden border border-[#508D83] rounded-sm shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#83A6A0] text-white font-bold">
                      <tr>
                        <th className="px-4 py-3 border-r border-white/10">Set</th>
                        <th className="px-4 py-3 border-r border-white/10 text-center">+ve</th>
                        <th className="px-4 py-3 border-r border-white/10 text-center">-ve</th>
                        <th className="px-4 py-3 text-center">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800 font-medium">
                      <tr>
                        <td className="px-4 py-3 border-r border-gray-50 font-bold">Marks</td>
                        <td className="px-4 py-3 border-r border-gray-50 text-center text-[#458B43] font-bold">{positiveMarks}</td>
                        <td className="px-4 py-3 border-r border-gray-50 text-center text-[#BD0000] font-bold">{negativeMarks}</td>
                        <td className="px-4 py-3 text-center font-black bg-gray-50/30">{finalTotalMarks.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button 
                  className={`w-full bg-[#1B5E20] text-white py-4 rounded-sm font-bold text-xl shadow-lg hover:bg-[#164D1A] transition-all transform active:scale-[0.98] uppercase flex items-center justify-center ${isCalculating ? 'opacity-90 cursor-wait' : ''}`}
                  onClick={handleShowRank}
                  disabled={isCalculating}
                >
                  {isCalculating ? 'Processing...' : 'CLICK HERE FOR ESTIMATED RANK'}
                </button>
                
                <button 
                  onClick={onReset}
                  className="w-full py-2 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
                >
                  BACK TO HOME
                </button>
              </div>
            </div>

            {/* General Aptitude Section */}
            <div className="w-full bg-[#B0C4C7] py-6 px-12 border-t border-b border-gray-300 shadow-sm mt-12">
              <div className="max-w-7xl mx-auto flex justify-end">
                <span className="text-3xl text-[#1a1a1a] font-normal tracking-tight">Section : General Aptitude</span>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 px-4">
                <QuestionTable questions={aptitudeQuestions} />
            </div>

            {/* Technical (CS/IT) Section */}
            <div className="w-full bg-[#B0C4C7] py-6 px-12 border-t border-b border-gray-300 shadow-sm mt-20">
              <div className="max-w-7xl mx-auto flex justify-end">
                <span className="text-3xl text-[#1a1a1a] font-normal tracking-tight">Section : Technical (CS/IT)</span>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 px-4">
                <QuestionTable questions={technicalQuestions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const PerformanceCard: React.FC<{ color: string; title: string | React.ReactNode; subtitle: string; titleColor?: string }> = ({ color, title, subtitle, titleColor = "text-gray-800" }) => (
  <div className="bg-white rounded-md shadow-lg overflow-hidden flex flex-col h-56 transition hover:shadow-xl border border-gray-100">
    <div className={`h-2 w-full ${color}`}></div>
    <div className="p-8 flex-grow flex flex-col justify-center">
      <h3 className={`text-4xl md:text-5xl font-bold mb-4 ${titleColor} tracking-tighter`}>{title}</h3>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{subtitle}</p>
    </div>
  </div>
);

const QuestionTable: React.FC<{ questions: QuestionData[] }> = ({ questions }) => {
  if (questions.length === 0) return null;
  return (
    <div className="overflow-x-auto bg-white rounded shadow-sm border border-gray-200">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead className="bg-[#f2f2f2]">
          <tr>
            <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-500 tracking-widest w-24">Q.No</th>
            <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-500 tracking-widest">Type</th>
            <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-500 tracking-widest text-center w-32">Marks</th>
            <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-500 tracking-widest text-center">Status</th>
            <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-500 tracking-widest text-center">Your Ans</th>
            <th className="px-6 py-4 text-[11px] font-black uppercase text-gray-500 tracking-widest text-center">Key Ans</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {questions.map((q) => (
            <tr key={q.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-5 text-sm font-bold text-gray-800">{q.id}</td>
              <td className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">{q.type}</td>
              <td className="px-6 py-5 text-sm font-bold text-gray-800 text-center">{q.marks}</td>
              <td className="px-6 py-5 text-center">
                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  q.status === 'Correct' ? 'bg-[#D1F2EB] text-[#1ABC9C]' :
                  q.status === 'Incorrect' ? 'bg-[#FADBD8] text-[#E74C3C]' :
                  'bg-transparent text-gray-500'
                }`}>
                  {q.status}
                </span>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-gray-600 text-center">{q.givenAnswer || '--'}</td>
              <td className="px-6 py-5 text-sm font-bold text-[#2E86C1] text-center">{q.correctAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <tr className="text-gray-700 bg-[#f9f9f9]">
    <td className="px-6 py-4 font-normal text-sm w-[250px]">{label}</td>
    <td className="px-1 py-4 text-center w-8 text-gray-400">:</td>
    <td className="px-6 py-4 font-black uppercase tracking-tight text-gray-800">{value}</td>
  </tr>
);

export default ResultsDashboard;
