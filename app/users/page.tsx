import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import UserList from '@/components/UserList';

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Header title="User Management" />
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <UserList />
        </div>
      </main>
    </div>
  );
}
