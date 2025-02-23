import axios from 'axios';

import { client } from './common';
import { API_URL } from '@/constants';

import type { SignUpState, SignInState } from '@/types';

export async function login(data: SignInState) {
  return await axios.post(`${API_URL}/user/signin`, data);
}

export async function oauth_google_redirect(register: boolean = true) {
  return await axios.get(
    `${API_URL}/user/oauth-${register ? 'register' : 'login'}`
  );
}

export async function oauth_google_callback(searchParams: string) {
  return await axios.get(`${API_URL}/user/oauth-success${searchParams}`);
}

export async function logout() {
  return await client.get(`user/logout`);
}

export async function register(data: SignUpState) {
  return await axios.post(`${API_URL}/user/signup`, data);
}

export async function me() {
  return await client.get(`user/auth`);
}
