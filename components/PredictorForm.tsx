
import React, { useState } from 'react';
import { Stream, Session } from '../types';

interface PredictorFormProps {
  onAnalyze: (stream: Stream, session: Session, url: string) => void;
  isLoading: boolean;
}

const PredictorForm: React.FC<PredictorFormProps> = ({ onAnalyze, isLoading }) => {
  const [stream, setStream] = useState<Stream>('Computer Science & IT');
  const [session, setSession] = useState<Session>('Session 1 (Forenoon)');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      alert("Please paste your response sheet URL");
      return;
    }
    onAnalyze(stream, session, url);
  };

  const streams: Stream[] = [
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Electronics & Communication',
    'Computer Science & IT',
    'Instrumentation Engineering',
    'Chemical Engineering'
  ];

  const sessions: Session[] = [
    'Session 1 (Forenoon)',
    'Session 2 (Afternoon)'
  ];

  return (
    <div className="bg-white rounded shadow-2xl overflow-hidden border border-gray-200 max-w-2xl mx-auto mt-8 animate-fadeIn">
      <div className="bg-gray-100 p-6 border-b border-gray-200 text-center">
        <h2 className="text-2xl font-black text-made-easy-blue">
            GATE 2026 RANK PREDICTOR
        </h2>
        <p className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-wider">Predict your score & rank instantly</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Select Stream</label>
              <select 
                value={stream}
                onChange={(e) => setStream(e.target.value as Stream)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-800 outline-none text-sm font-semibold text-gray-700 transition bg-white"
              >
                {streams.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Select Session</label>
              <select 
                value={session}
                onChange={(e) => setSession(e.target.value as Session)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-800 outline-none text-sm font-semibold text-gray-700 transition bg-white"
              >
                {sessions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
        </div>

        <div>
          <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Paste Response Sheet URL</label>
          <input 
            type="url"
            placeholder="Ex: http://gate.iitk.ac.in/response/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-1 focus:ring-blue-800 outline-none text-sm font-medium transition placeholder:text-gray-300"
          />
        </div>

        <div className="bg-yellow-50 p-4 rounded border border-yellow-200 mb-4">
            <p className="text-[11px] text-yellow-800 leading-relaxed font-semibold">
                <span className="font-black">NOTE:</span> Ensure the URL is copied from the official GATE 2026 candidate portal. This tool uses AI analysis to provide real-time rank predictions based on previous years' trends and paper difficulty.
            </p>
        </div>

        <button 
          disabled={isLoading}
          className={`w-full py-4 rounded font-black text-lg shadow transition active:scale-95 flex items-center justify-center uppercase tracking-widest ${
            isLoading ? 'bg-gray-400 cursor-not-allowed text-white' : 'made-easy-blue text-white hover:bg-blue-900'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Processing Data...
            </>
          ) : (
            'CHECK NOW'
          )}
        </button>
      </form>
    </div>
  );
};

export default PredictorForm;
