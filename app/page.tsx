import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="Dashboard" />
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
