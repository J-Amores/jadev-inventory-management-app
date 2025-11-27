'use client';

import React, { useState, useEffect } from 'react';
import { Search, Mail, Shield, MoreVertical } from 'lucide-react';

interface User {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Admin' | 'Staff' | 'Viewer';
  status: 'Active' | 'Inactive';
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/50">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10 text-xs uppercase text-slate-500 font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4 border-b border-slate-200">User</th>
              <th className="px-6 py-4 border-b border-slate-200">Email</th>
              <th className="px-6 py-4 border-b border-slate-200">Role</th>
              <th className="px-6 py-4 border-b border-slate-200">Status</th>
              <th className="px-6 py-4 border-b border-slate-200 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <tr key={user.userId} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {user.name.substring(0, 1)}
                      </div>
                    )}
                    <div>
                        <div className="font-medium text-slate-800">{user.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{user.userId.substring(0,8)}...</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {user.email}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : user.role === 'Staff' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'}`}>
                        {user.role === 'Admin' && <Shield className="w-3 h-3" />}
                        {user.role}
                    </span>
                </td>
                <td className="px-6 py-4">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-500'}`}>
                        {user.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
