import React, { useState } from 'react';
import { User, Edit, Trash2, Plus, Shield, Mail, Phone } from 'lucide-react';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'agent';
  status: 'active' | 'inactive';
  lastLogin?: string;
  permissions: string[];
}

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: 1,
      name: "Admin User",
      email: "admin@congresstrade.com",
      phone: "+49 123 4567890",
      role: "admin",
      status: "active",
      lastLogin: "2024-03-18T10:30:00",
      permissions: ["all"]
    },
    {
      id: 2,
      name: "Sales Manager",
      email: "manager@congresstrade.com",
      phone: "+49 123 4567891",
      role: "manager",
      status: "active",
      lastLogin: "2024-03-18T09:15:00",
      permissions: ["leads.view", "leads.edit", "reports.view"]
    }
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState<Partial<AdminUser>>({
    role: 'agent',
    status: 'active',
    permissions: []
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone || '',
        role: newUser.role as 'admin' | 'manager' | 'agent',
        status: newUser.status as 'active' | 'inactive',
        permissions: newUser.permissions || []
      }]);
      setShowAddUser(false);
      setNewUser({
        role: 'agent',
        status: 'active',
        permissions: []
      });
    }
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      admin: 'bg-purple-100 text-purple-800',
      manager: 'bg-blue-100 text-blue-800',
      agent: 'bg-green-100 text-green-800'
    };
    return `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[role as keyof typeof badges]}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-900">Benutzerverwaltung</h1>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center bg-navy-900 text-white px-4 py-2 rounded-lg hover:bg-navy-800 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Benutzer hinzufügen
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Benutzer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rolle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Letzter Login
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-navy-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-navy-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={getRoleBadge(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleString('de-DE') : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-gray-400 hover:text-navy-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Neuen Benutzer hinzufügen</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={newUser.name || ''}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={newUser.email || ''}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={newUser.phone || ''}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rolle
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminUser['role'] })}
                >
                  <option value="agent">Agent</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-navy-900 text-white rounded-lg hover:bg-navy-800 transition-colors"
                >
                  Benutzer hinzufügen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}