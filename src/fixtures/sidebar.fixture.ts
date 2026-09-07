import type { MenuSection, SidebarSection } from '@/types/sidebar';
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  Percent,
  FileText,
  Settings,
} from 'lucide-react';

export const ADMIN_MENU: SidebarSection[] = [
  {
    label: 'Dashboard',
    items: [
      { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { title: 'Products', path: '/admin/products', icon: Package },
      { title: 'Categories', path: '/admin/categories', icon: Tag },
      { title: 'Orders', path: '/admin/orders', icon: ShoppingBag },
      { title: 'Discounts', path: '/admin/discounts', icon: Percent },
      { title: 'Reports', path: '/admin/reports', icon: FileText },
    ],
  },
];

export const USER_MENU: MenuSection = [
  { icon: ShoppingBag, label: 'My Orders', path: '/orders' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];
