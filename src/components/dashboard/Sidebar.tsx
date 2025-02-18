import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  FileText, 
  Settings,
  LogOut,
  DollarSign,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const signOut = useAuthStore((state) => state.signOut);
  const hasPermission = useAuthStore((state) => state.hasPermission);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      onClose();
    }
  }, [location.pathname, onClose]);

  const getNavigation = () => {
    const baseNavigation = [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, minRole: 'user' },
      { name: 'Inventory', href: '/dashboard/inventory', icon: Package, minRole: 'staff' },
      { name: 'Sales', href: '/dashboard/sales', icon: DollarSign, minRole: 'staff' },
    ];

    const managerNavigation = [
      { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart, minRole: 'manager' },
      { name: 'Reports', href: '/dashboard/reports', icon: FileText, minRole: 'manager' },
    ];

    const adminNavigation = [
      { name: 'Settings', href: '/dashboard/settings', icon: Settings, minRole: 'admin' },
    ];

    return [
      ...baseNavigation,
      ...(hasPermission('manager') ? managerNavigation : []),
      ...(hasPermission('admin') ? adminNavigation : []),
    ];
  };

  const navigation = getNavigation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <span className="text-xl font-bold text-gray-900">Menu</span>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-4 py-2 text-sm font-medium
                  ${isActive(item.href)
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}