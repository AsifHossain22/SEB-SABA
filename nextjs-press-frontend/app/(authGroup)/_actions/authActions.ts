'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type TLoginState = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (
  prevState: TLoginState,
  formData: FormData,
) => {
  console.log(formData);
  console.log('Prev State: ', prevState);

  const email = formData.get('email');
  const password = formData.get('password');

  const payload = {
    email,
    password,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set('Access Token: ', result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 Day
      sameSite: 'lax',
    });

    cookieStore.set('Refresh Token: ', result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 Day
      sameSite: 'lax',
    });

    // redirect('/dashboard', 'replace'); // RemoveBrowsingHistory - So can't return back
    redirect('/dashboard'); // KeepBrowsingHistory - So can go back
  }

  return result;
};
