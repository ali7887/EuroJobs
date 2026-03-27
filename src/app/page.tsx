import { MainLayout } from '@/components/layout';

export default function Home() {
  return (
    <MainLayout>
      <div style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1>Welcome to JobBoard</h1>
        <p>Find your next opportunity or hire top talent.</p>
      </div>
    </MainLayout>
  );
}
