import type { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = () => {
  return (
    <ContentLoader
      speed={2}
      width='100%'
      height='90vh'
      viewBox='0 0 100% 100%'
      backgroundColor='#e8e8e8'
      foregroundColor='#ecebeb'
    >
      <rect x='0' y='80' rx='10' ry='10' width='100%' height='100' />
      <rect x='0' y='200' rx='10' ry='10' width='100%' height='100' />
      <rect x='0' y='320' rx='10' ry='10' width='100%' height='100' />
      <rect x='0' y='20' rx='5' ry='5' width='400' height='40' />
      <rect x='450' y='20' rx='5' ry='5' width='100' height='40' />
      <rect x='87%' y='20' rx='5' ry='5' width='150' height='40' />
    </ContentLoader>
  );
};

export default Skeleton;
