import Navbar from '@/components/common/Navbar';
import ContentTemplate from '@/styles/Templates/ContentTemplate';
import { trpc } from '@/utils/trpc';

const Home = () => {
  const { data, isLoading } = trpc.useQuery(['hello', { text: 'Peter!' }]);

  if (isLoading) return <div>Loading...</div>;
  if (data) return <div>{data.greeting}</div>;

  return (
    <ContentTemplate>
      <Navbar />
    </ContentTemplate>
  );
};

export default Home;
