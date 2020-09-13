import Link from 'next/link';

export const Header = () => {
  return (
    <div>
      <Link href="/">
        <a>mango bucket</a>
      </Link>
      <nav>
        <Link href="/login">
          <a>login</a>
        </Link>
      </nav>
    </div>
  );
};
