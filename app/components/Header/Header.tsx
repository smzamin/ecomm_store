'use client';

import { useUser } from '@/(client)/context/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CartIcon from '../CartIcon';
import styles from './header.module.css';

export function Header() {
  const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <h1>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/shop" className={styles.navLink}>
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navLink}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
          <li>
            <CartIcon />
          </li>
          <li className={styles.userMenu}>
            {user ? (
              <div
                className={styles.userIcon}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {isDropdownOpen && (
                  <ul className={styles.dropdown}>
                    <li>
                      <Link href="/profile" className={styles.dropdownLink}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className={styles.dropdownButton}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link href="/login" className={styles.navLink}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
