import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  tenantId: number;
}

export interface Tenant {
  id: number;
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  description?: string;
}

interface AuthContextType {
  user: User | null;
  currentTenant: Tenant | null;
  tenants: Tenant[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, tenantSlug: string) => void;
  signup: (email: string, username: string, password: string, tenantName: string) => void;
  logout: () => void;
  switchTenant: (tenant: Tenant) => void;
  setUser: (user: User | null) => void;
  setTenants: (tenants: Tenant[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email: string, password: string, tenantSlug: string) => {
    setIsLoading(true);
    // TODO: Call API to authenticate
    // For now, mock data
    setTimeout(() => {
      const mockUser: User = {
        id: 1,
        email,
        username: email.split('@')[0],
        firstName: 'Test',
        lastName: 'User',
        tenantId: 1,
      };
      const mockTenant: Tenant = {
        id: 1,
        name: 'My Blog',
        slug: tenantSlug,
      };
      setUser(mockUser);
      setCurrentTenant(mockTenant);
      setTenants([mockTenant]);
      setIsLoading(false);
    }, 1000);
  };

  const signup = (email: string, username: string, password: string, tenantName: string) => {
    setIsLoading(true);
    // TODO: Call API to create account and tenant
    // For now, mock data
    setTimeout(() => {
      const mockUser: User = {
        id: 1,
        email,
        username,
        firstName: 'New',
        lastName: 'User',
        tenantId: 1,
      };
      const mockTenant: Tenant = {
        id: 1,
        name: tenantName,
        slug: tenantName.toLowerCase().replace(/\s+/g, '-'),
      };
      setUser(mockUser);
      setCurrentTenant(mockTenant);
      setTenants([mockTenant]);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    setCurrentTenant(null);
    setTenants([]);
  };

  const switchTenant = (tenant: Tenant) => {
    setCurrentTenant(tenant);
    if (user) {
      setUser({ ...user, tenantId: tenant.id });
    }
  };

  const value: AuthContextType = {
    user,
    currentTenant,
    tenants,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    switchTenant,
    setUser,
    setTenants,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
