'use client'
import styled from '@emotion/styled';
import NoDataLogo from '../../images/no_data_logo.png';

import { DCELLAR_URL } from '@/env'; 
import { Button } from '@/components/ui';
const CollNoData = () => {
  return (
    <div className='flex items-center justify-center w-[1100px] h-[596px] px-[4px] py-[20px]' >
      <div className='flex flex-col items-center justify-center gap-20'>
        {/* <img src={NoDataLogo} alt="" /> */}
        <Title>
          You don’t have any data on Greenfield Testnet. Upload your data on
          DCellar first.👏
        </Title>
        <Button
          onClick={() => {
            window.open(`${DCELLAR_URL}`);
          }}
          size={'sm'}
          style={{ marginLeft: '6px' }}
        >
          Upload Data in DCellar
        </Button>
      </div>
    </div>
  );
};

export default CollNoData;





const Title = styled.div`
  width: 320px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;


