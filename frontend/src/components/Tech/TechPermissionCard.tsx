import React from 'react';

export interface RolePermission {
  id: string;
  name: string;
  permissions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
}

interface Props {
  role: RolePermission;
  onToggle: (id: string, permKey: keyof RolePermission['permissions']) => void;
}

export const TechPermissionCard = ({ role, onToggle }: Props) => {
  const ToggleBtn = ({ label, permKey, isActive }: { label: string, permKey: keyof RolePermission['permissions'], isActive: boolean }) => (
    <button
      onClick={() => onToggle(role.id, permKey)}
      className={`px-4 py-1.5 text-sm font-bold rounded-full transition-all shadow-sm border ${
        isActive 
          ? 'bg-purple-700 text-white border-purple-700 hover:bg-purple-800' 
          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-5 bg-white rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-200 transition-all flex flex-col sm:flex-row justify-between items-center gap-4">
      <h3 className="text-xl font-bold text-gray-800 min-w-[160px]">
        {role.name}
      </h3>
      <div className="flex gap-2.5 bg-gray-50 p-1.5 rounded-full border border-gray-100">
        <ToggleBtn label="Tạo" permKey="create" isActive={role.permissions.create} />
        <ToggleBtn label="Xem" permKey="read" isActive={role.permissions.read} />
        <ToggleBtn label="Sửa" permKey="update" isActive={role.permissions.update} />
        <ToggleBtn label="Xóa" permKey="delete" isActive={role.permissions.delete} />
      </div>
    </div>
  );
};