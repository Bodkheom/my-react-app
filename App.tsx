
import React, { useState } from 'react';
import Header from './components/Header';
import ResultsDashboard from './components/ResultsDashboard';
import { Stream, Session, PredictionResult } from './types';
import { analyzeResponseSheet } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'form' | 'results'>('home');
  const [formStep, setFormStep] = useState<'stream' | 'session' | 'url'>('stream');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Form State
  const [selectedStream, setSelectedStream] = useState<Stream | null>(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [responseUrl, setResponseUrl] = useState('');

  // Constants
  const EXAM_YEAR = "2026";

  const handleStart = () => {
    setView('form');
    setFormStep('stream');
    window.scrollTo(0, 0);
  };

  const handleStreamNext = () => {
    if (!selectedStream) {
      alert("Please select your stream first.");
      return;
    }
    setFormStep('session');
  };

  const handleSessionNext = () => {
    if (!selectedSession) {
      alert("Please select the session first.");
      return;
    }
    setFormStep('url');
  };

  const handlePredict = async () => {
    if (!responseUrl) {
      alert("Please paste your response sheet URL.");
      return;
    }
    setIsLoading(true);
    try {
      // Add 8 second delay as requested
      await new Promise(resolve => setTimeout(resolve, 8000));
      const data = await analyzeResponseSheet(responseUrl, selectedStream!, selectedSession!);
      setResult(data);
      setView('results');
      window.scrollTo(0, 0);
    } catch (error) {
      alert("Analysis failed. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedStream(null);
    setSelectedSession(null);
    setResponseUrl('');
    setView('home');
    window.scrollTo(0, 0);
  };

  const streams: { label: string; value: Stream }[] = [
    { label: 'CE', value: 'Civil Engineering' },
    { label: 'ME', value: 'Mechanical Engineering' },
    { label: 'EE', value: 'Electrical Engineering' },
    { label: 'EC', value: 'Electronics & Communication' },
    { label: 'CS/IT', value: 'Computer Science & IT' },
    { label: 'IN', value: 'Instrumentation Engineering' },
    { label: 'PI', value: 'Production and Industrial' },
    { label: 'CH', value: 'Chemical Engineering' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-100 font-sans">
      <Header />
      
      <main className="flex-grow relative overflow-hidden">
        {view === 'home' && (
          <div className="animate-fadeIn relative">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[10%] -left-[15%] w-[40%] h-[80%] bg-blue-50 rounded-[100%] opacity-40"></div>
                <div className="absolute top-[5%] -right-[15%] w-[40%] h-[80%] bg-blue-50 rounded-[100%] opacity-40"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 flex flex-col items-center">
                {/* BRANDING BLOCK - HIGH FIDELITY AS PER IMAGE */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="bg-[#E31E24] w-28 h-28 flex items-center justify-center rounded-xl mb-6 shadow-2xl">
                       <span className="text-white text-7xl font-black italic tracking-tighter">ME</span>
                    </div>
                    <h2 className="text-7xl font-black text-[#E31E24] tracking-tighter mb-1 uppercase">MADE EASY</h2>
                    <p className="text-xl font-bold text-gray-800 tracking-tight">Leading Institute for ESE, GATE & PSUs</p>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-[#E31E24] inline-block relative">
                        GATE Rank Predictor {EXAM_YEAR}
                        <div className="h-[2px] w-1/2 bg-green-700 mx-auto mt-2"></div>
                    </h1>
                </div>

                <div className="text-center mb-8">
                    <p className="text-lg font-bold text-gray-800 italic">
                        <span className="text-[#E31E24] text-2xl font-serif">"</span> Estimate your result before the actual result <span className="text-[#E31E24] text-2xl font-serif">"</span>
                    </p>
                </div>

                <div className="text-center space-y-6 text-[14px] text-gray-700 leading-relaxed max-w-4xl px-4">
                    <p>
                        To enrich your experience of post-GATE-{EXAM_YEAR} analysis, MADE EASY has developed the GATE Rank Predictor {EXAM_YEAR} for branches such as <b>Civil, Mechanical, Electrical, Electronics, Production and Industrial, Instrumentation, Computer Science and Chemical Engineering.</b>
                    </p>
                    <p>
                        The MADE EASY GATE Rank Predictor is an online tool designed to mathematically calculate a candidate's GATE Score and Normalised Score while predicting their All India Rank (AIR).
                    </p>
                </div>

                <div className="mt-14 mb-24">
                    <button 
                        onClick={handleStart}
                        className="bg-[#4D84F5] text-white px-24 py-6 rounded-md font-bold text-2xl shadow-xl hover:bg-blue-600 transition-all uppercase tracking-wide transform hover:scale-105"
                    >
                        CHECK NOW
                    </button>
                </div>

                <Highlights />
                <HowItWorks />
            </div>
          </div>
        )}

        {view === 'form' && (
          <div className="animate-fadeIn min-h-[70vh] flex flex-col items-center justify-center bg-[#E6F3F5] px-4 py-10">
             <div className="flex flex-col items-center mb-8">
                <div className="bg-[#E31E24] p-1.5 rounded mb-2">
                    <span className="text-white text-2xl font-black italic tracking-tighter">ME</span>
                </div>
                <h3 className="text-2xl font-black text-[#E31E24] tracking-tighter uppercase">MADE EASY</h3>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-wider text-center">Leading Institute for ESE, GATE & PSUs</p>
            </div>

            <div className="text-center mb-6">
                <h1 className="text-4xl font-semibold text-[#3D5A5A] inline-block relative">
                    GATE Rank Predictor {EXAM_YEAR}
                    <div className="h-[2px] w-1/2 bg-[#3D5A5A] mx-auto mt-2"></div>
                </h1>
            </div>

            {formStep === 'stream' && (
              <div className="w-full flex flex-col items-center">
                <p className="text-sm text-gray-600 mb-8 font-medium text-center">
                  Note: <span className="text-[#BD0000]">Check your result on Rank Predictor to know your current Rank and Score.</span>
                </p>
                <h2 className="text-2xl font-normal text-[#3D5A5A] mb-8 uppercase tracking-widest">SELECT YOUR STREAM</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-12">
                  {streams.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setSelectedStream(s.value)}
                      className={`py-6 px-4 border rounded text-lg font-medium transition-all ${
                        selectedStream === s.value 
                        ? 'border-[#2D4545] bg-[#2D4545] text-white' 
                        : 'border-gray-200 bg-white text-gray-500 hover:border-[#2D4545]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={handleStreamNext}
                  className="bg-[#2D4545] text-white px-24 py-4 rounded font-bold text-xl uppercase tracking-widest hover:bg-[#1D2E2E] transition shadow-md"
                >
                  Next
                </button>
              </div>
            )}

            {formStep === 'session' && (
              <div className="w-full flex flex-col items-center space-y-8 max-w-2xl">
                <h2 className="text-3xl font-normal text-[#3D5A5A] uppercase tracking-wide text-center">SELECT YOUR EXAM SESSION</h2>
                <div className="w-full flex flex-col items-center space-y-6">
                   <div className="w-full flex flex-col items-center space-y-4 max-w-md">
                      <button
                        onClick={() => setSelectedSession('Session 1 (Forenoon)')}
                        className={`w-full py-4 rounded font-medium text-xl transition-all shadow-md ${
                          selectedSession === 'Session 1 (Forenoon)' 
                          ? 'bg-[#1a702a] text-white ring-2 ring-green-300' 
                          : 'bg-[#248232] text-white hover:bg-[#1a702a]'
                        }`}
                      >
                        Forenoon
                      </button>

                      <button
                        onClick={() => setSelectedSession('Session 2 (Afternoon)')}
                        className={`w-full py-4 rounded font-medium text-xl transition-all shadow-md ${
                          selectedSession === 'Session 2 (Afternoon)' 
                          ? 'bg-[#1a702a] text-white ring-2 ring-green-300' 
                          : 'bg-[#248232] text-white hover:bg-[#1a702a]'
                        }`}
                      >
                        Afternoon
                      </button>
                   </div>
                    
                    <button 
                      onClick={handleSessionNext}
                      className="w-full max-w-md bg-[#1E2D2F] text-white py-5 rounded font-bold text-3xl uppercase tracking-wide hover:bg-[#111C1C] transition shadow-xl mt-4"
                    >
                      Next
                    </button>

                    <button 
                      onClick={() => setFormStep('stream')}
                      className="text-[#607D8B] text-xl font-medium hover:underline transition"
                    >
                      Back
                    </button>
                </div>
              </div>
            )}

            {formStep === 'url' && (
              <div className="w-full flex flex-col items-center max-w-4xl">
                <h2 className="text-3xl font-normal text-[#3D5A5A] mb-3 uppercase tracking-widest text-center">PASTE YOUR RESPONSE SHEET URL</h2>
                <p className="text-lg text-gray-500 mb-10 text-center font-medium">By pasting the URL, I agree to use my GATE exam data for statistical purpose</p>
                
                <div className="w-full mb-12">
                    <input 
                      type="url"
                      placeholder="Paste your response sheet URL..."
                      value={responseUrl}
                      onChange={(e) => setResponseUrl(e.target.value)}
                      className="w-full p-5 border border-gray-400 rounded-md text-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#508D83] placeholder:text-gray-400"
                    />
                </div>
                
                <div className="flex flex-col items-center space-y-6 w-full">
                  <button 
                    onClick={handlePredict}
                    disabled={isLoading}
                    className="bg-[#508D83] text-white px-28 py-5 rounded-md font-bold text-3xl uppercase tracking-widest hover:bg-[#3D6E66] transition shadow-xl disabled:bg-gray-400"
                  >
                    {isLoading ? 'ANALYZING...' : 'Submit'}
                  </button>

                  <button 
                      onClick={() => setFormStep('session')}
                      className="text-[#607D8B] text-xl font-medium hover:underline transition"
                    >
                      Back
                  </button>
                </div>
              </div>
            )}

            <div className="mt-24 w-full">
                <Highlights />
                <HowItWorks />
            </div>
          </div>
        )}

        {view === 'results' && result && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
            <ResultsDashboard result={result} onReset={handleReset} />
          </div>
        )}
      </main>

      <footer className="made-easy-blue text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-[10px] text-blue-400 font-bold uppercase tracking-widest">
          <p>© 2024-{EXAM_YEAR} MADE EASY Group. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const Highlights: React.FC = () => (
    <div className="w-full mt-10 mb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#E31E24] border-b-2 border-[#E31E24] inline-block pb-1 mb-10 uppercase">HIGHLIGHTS</h2>
            <div className="bg-[#e1f5fe] rounded-sm py-12 px-8 md:px-24">
                <ul className="text-left space-y-4 text-sm md:text-base font-bold text-gray-800 list-disc ml-4 md:ml-10">
                    <li>Dynamic real time assessment of All India Rank.</li>
                    <li>User friendly interface.</li>
                    <li>Session wise and overall analysis.</li>
                    <li>Marks and Rank normalization.</li>
                </ul>
            </div>
        </div>
    </div>
);

const HowItWorks: React.FC = () => (
    <div className="w-full py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-[#E31E24] border-b-2 border-[#E31E24] inline-block pb-1 mb-20 uppercase">HOW IT WORKS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                <Step 
                    num="1" 
                    color="bg-[#4D84F5]" 
                    title="Step 1" 
                    desc="Select Your Stream" 
                    icon={
                        <div className="relative">
                           <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                           <div className="absolute -bottom-1 -right-2 bg-white rounded-full p-1 shadow-md">
                               <svg className="w-4 h-4 text-[#4D84F5]" fill="currentColor" viewBox="0 0 24 24"><path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93M4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4m7-13.93C7.05 1.56 4 4.92 4 9h7V1.07Z"></path></svg>
                           </div>
                        </div>
                    }
                />
                <Step 
                    num="2" 
                    color="bg-[#BD0000]" 
                    title="Step 2" 
                    desc="Select the session you appeared for" 
                    icon={
                        <div className="text-white text-[10px] font-bold text-left space-y-1">
                            <div className="flex items-center space-x-1">
                                <div className="w-3 h-3 border border-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white"></div></div>
                                <span>Forenoon</span>
                            </div>
                            <div className="flex items-center space-x-1 opacity-70">
                                <div className="w-3 h-3 border border-white"></div>
                                <span>Afternoon</span>
                            </div>
                        </div>
                    }
                />
                <Step 
                    num="3" 
                    color="bg-[#F9A825]" 
                    title="Step 3" 
                    desc="Paste the Responses in the Box" 
                    icon={
                        <div className="bg-white p-1 rounded-sm shadow-sm">
                           <div className="bg-[#F9A825] w-12 h-8 rounded-t-sm flex items-center justify-center overflow-hidden">
                               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"></circle><path strokeWidth="1" d="M2 12h20M12 2a15.3 15.3 0 010 20 15.3 15.3 0 010-20"></path></svg>
                           </div>
                        </div>
                    }
                />
            </div>
        </div>
    </div>
);

const Step: React.FC<{ num: string; color: string; title: string; desc: string; icon: React.ReactNode }> = ({ num, color, title, desc, icon }) => (
    <div className="flex flex-col items-center group">
        <div className={`w-28 h-28 ${color} rounded-full flex items-center justify-center mb-8 shadow-2xl transform transition group-hover:scale-105 border-4 border-white/20`}>
            {icon}
        </div>
        <p className="text-[13px] font-bold text-gray-800 mb-6">{title}</p>
        <p className="text-[12px] font-medium text-gray-600 px-6 leading-tight max-w-[200px] text-center">{desc}</p>
    </div>
);

export default App;
