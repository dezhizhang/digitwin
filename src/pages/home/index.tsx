import AreaStackGradient from '@/components/AreaStackGradient';
import React from 'react';
import styles from './index.less';

const legendData = ['政企通', '政展通', '来电'];
const xAxisData = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];


const Home: React.FC = () => {
  return (
    <div className={styles.container}>
       <AreaStackGradient
          style={{}}
          dataSource={{
            legendData,
            xAxisData,
          }}
          className={styles.bottom}
          title={'近30天事件趋势图'}
        />
    </div>
  );
};

export default Home;
