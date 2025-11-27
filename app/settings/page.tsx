import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Settings" />
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4">Application Settings</h2>
              <p className="text-slate-500 text-sm mb-6">Configure your inventory preferences and AI settings.</p>
              <div className="p-4 bg-indigo-50 text-indigo-900 rounded-lg text-sm border border-indigo-100">
                API Key is managed via environment variables for security.
                <br/>
                Current Model: <span className="font-mono font-semibold">gemini-2.5-flash (mocked)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
