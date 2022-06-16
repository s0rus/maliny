import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Navbar from '@/components/common/Navbar';
import ContentTemplate from '@/styles/Templates/ContentTemplate';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <ContentTemplate>
      <Navbar />
    </ContentTemplate>
  );
};

export default Home;
