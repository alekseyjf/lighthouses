import { makeAutoObservable } from 'mobx';
import api from '../shared/api/axios';

class AuthStore {
  accessToken: string | null = localStorage.getItem('accessToken');
  refreshToken: string | null = localStorage.getItem('refreshToken');
  loading = false;


  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }

  async login(username: string, password: string) {
    try {
      this.loading = true;
  
      const res = await api.post('/auth/login', {
        username,
        password,
      });
  
      this.accessToken = res.data.accessToken;
      this.refreshToken = res.data.refreshToken;
  
      localStorage.setItem('accessToken', this.accessToken!);
      localStorage.setItem('refreshToken', this.refreshToken!);
    } finally {
      this.loading = false;
    }
  }

  async refresh() {
    const res = await api.post('/auth/refresh', {
      refreshToken: this.refreshToken,
    });

    this.accessToken = res.data.accessToken;
    localStorage.setItem('accessToken', this.accessToken!);
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.clear();
  }
}

export const authStore = new AuthStore();
