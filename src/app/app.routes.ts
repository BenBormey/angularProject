import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Profile } from './pages/profile/profile';
import { ProductDetail } from './pages/product-detail/product-detail';

// Admin
import { Layout as AdminLayout } from './admin/layout/layout';
import { Dashboard } from './admin/dashboard/dashboard';
import { Products as AdminProducts } from './admin/products/products';
import { Orders } from './admin/orders/orders';
import { Users } from './admin/users/users';
import { Category } from './admin/category/category';
import { Branch } from './admin/branch/branch';
import {Variants} from './admin/variants/variants'
import { Tax } from './admin/tax/tax';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // User Layout
  {
    path: '',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'products', component: Products },
      { path: 'cart', component: Cart },
      { path: 'profile', component: Profile },
      { path: 'product-details/:id', component: ProductDetail }
    ]
  },

  // Admin Layout
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'products', component: AdminProducts },
      { path: 'orders', component: Orders },
      { path: 'users', component: Users },
      { path: 'categories', component: Category },
      { path: 'brands', component: Branch },
      { path: 'variants', component: Variants },
            { path: 'tax' , component : Tax},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
