import Navbar from '@/components/common/Navbar';
import ContentTemplate from '@/styles/Templates/ContentTemplate';
import { trpc } from '@/utils/trpc';
import { NextPage } from 'next';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['products.get-all']);

  if (isLoading && !data) return <div>Loading...</div>;

  if (data) return <div>{data[0].name}</div>;

  return (
    <ContentTemplate>
      <Navbar />
    </ContentTemplate>
  );
};

export default Home;
