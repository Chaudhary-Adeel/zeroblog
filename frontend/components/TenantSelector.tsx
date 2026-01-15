import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const TenantSelector: React.FC = () => {
  const { tenants, currentTenant, switchTenant } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!tenants.length) return null;

  return (
    <div className="tenant-selector">
      <button
        className="tenant-selector__button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentTenant?.name || 'Select Blog'}
        <span className="tenant-selector__icon">▼</span>
      </button>

      {isOpen && (
        <div className="tenant-selector__dropdown">
          {tenants.map((tenant) => (
            <button
              key={tenant.id}
              className={`tenant-selector__item ${
                currentTenant?.id === tenant.id ? 'tenant-selector__item--active' : ''
              }`}
              onClick={() => {
                switchTenant(tenant);
                setIsOpen(false);
              }}
            >
              {tenant.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
