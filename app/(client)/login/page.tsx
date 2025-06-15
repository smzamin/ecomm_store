'use client';

import { useUser } from '@/(client)/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './login.module.css';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string[]>([]);
  const { setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        const userData = { ...data.profile, role: data.user.role };
        delete userData.id;
        setUser(userData);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', data.token);
        if (data.user.role?.toLowerCase() === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        setError(data.errors || [data.message]);
      }
    } catch (error) {
      setError(['An error occurred during login.', (error as Error).message]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username or Email
            </label>
            <input
              type="text"
              id="username"
              className={styles.input}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Enter username or email"
              autoComplete="username"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
          {error.length > 0 && (
            <ul className={styles.error}>
              {error.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
          <p className={styles.linkText}>
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
