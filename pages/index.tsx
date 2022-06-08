import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ContentTemplate from '@/styles/Templates/ContentTemplate';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <ContentTemplate>
      <div
        style={{
          backgroundColor: 'black',
          width: '100%',
          height: '200px',
        }}
      ></div>
      <h1>maliny.</h1>
      <Button label='LOGIN' />
      <Input type='password' label='Password' />
    </ContentTemplate>
  );
};

export default Home;
