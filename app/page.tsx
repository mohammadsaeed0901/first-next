import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/authOptions';
import ProductCard from './components/ProductCard';


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <h1>Hello {session && <span>{session.user?.name}</span>}</h1>
      <ProductCard />
      <button onClick={async () => {
        const _ = (await import('lodash')).default;
        const users = [
          { name: 'c' },
          { name: 'b' },
          { name: 'a' },
        ];
        const sorted = _.orderBy(users, ['name']);
        console.log(sorted);
      }}>
        Show
      </button>
    </main>
  )
}
