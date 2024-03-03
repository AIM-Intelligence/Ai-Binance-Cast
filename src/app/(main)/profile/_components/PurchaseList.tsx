'use client';
import styled from '@emotion/styled';

import { usePagination } from '@/hooks/custom/usePagination';
import { useAccount } from 'wagmi';
import {
  defaultImg,
  divide10Exp,
  formatDateUTC,
  trimLongStr,
} from '@/utils/web3';
import { useUserPurchased } from '@/hooks/custom/useUserPurchased';
import BN from 'bn.js';
import { useSalesVolume } from '@/hooks/custom/useSalesVolume';
import { OwnActionCom } from './OwnActionCom';
import { useSearchParams, useRouter } from 'next/navigation';
import { CollectionLogo } from '@/components/svgIcon/CollectionLogo';
import { useGlobal } from '@/hooks/custom/useGlobal';
import Link from 'next/link';

const TotalVol = (props: any) => {
  const { groupId } = props;
  const { salesVolume } = useSalesVolume(groupId);
  return <div>{Number(salesVolume) || '-'}</div>;
};

const PurchaseList = () => {
  const { handlePageChange, page } = usePagination();

  const pageSize = 10;
  const { list, loading, total } = useUserPurchased(page, pageSize);
  const { address } = useAccount();
  const router = useRouter();
  const state = useGlobal();
  const searchParams = useSearchParams();

  const breadInfo = {
    name: 'My Purchase',
    path: '/profile',
  };
  const columns = [
    {
      header: 'Data',
      width: 200,
      cell: (data: any) => {
        const { id, groupName, ownerAddress, url, type, oid, name } = data;
        return (
          <div
            className='flex items-center justify-center gap-6'
            onClick={() => {
              let from = '';
              if (breadInfo) {
                const list = state.globalState.breadList;
                const item = {
                  path: (breadInfo as any).path,
                  name: (breadInfo as any).name,
                  query: searchParams.toString(),
                };
                state.globalDispatch({
                  type: 'ADD_BREAD',
                  item,
                });

                from = encodeURIComponent(JSON.stringify(list.concat([item])));
              }
              const _from = from ? `&from=${from}` : '';
              if (groupName) {
                router.push(
                  `/resource?gid=${id}&gn=${groupName}&address=${ownerAddress}&type=collection&tab=dataList${_from}`
                );
              } else {
                router.push(
                  `/resource?oid=${oid}&address=${ownerAddress}&type=collection&tab=dataList${_from}`
                );
              }
            }}
          >
            <ImgCon src={url || defaultImg(name, 40)}></ImgCon>
            {trimLongStr(data.name)}
            {type === 'Collection' && (
              <CollectionLogo
                style={{ width: '10px', height: '10px' }}
              ></CollectionLogo>
            )}
          </div>
        );
      },
    },
    {
      header: 'Type',
      cell: (data: any) => {
        const { type } = data;
        return <div>{type}</div>;
      },
    },
    {
      header: 'Current List Price',
      width: 160,
      cell: (data: any) => {
        const { price } = data;
        const balance = divide10Exp(new BN(price, 10), 18);
        return <div>{balance} BNB</div>;
      },
    },
    {
      header: 'Data Listed',
      width: 160,
      cell: (data: any) => {
        const { listTime } = data;
        return <div>{formatDateUTC(listTime * 1000)}</div>;
      },
    },
    {
      header: 'Total Vol',
      width: 120,
      cell: (data: any) => {
        const { id } = data;
        return <TotalVol groupId={id}></TotalVol>;
      },
    },
    {
      header: 'Creator',
      width: 120,
      cell: (data: any) => {
        const { ownerAddress } = data;
        return (
          <MyLink href={`/profile?address=${ownerAddress}`}>
            {trimLongStr(ownerAddress)}
          </MyLink>
        );
      },
    },
    {
      header: 'Action',
      cell: (data: any) => {
        return (
          <OwnActionCom
            data={data}
            address={address as string}
            breadInfo={breadInfo}
          ></OwnActionCom>
        );
      },
    },
  ];
  return (
    <Container>
      {/* <Table
        headerContent={`Latest ${Math.min(
          pageSize,
          list.length,
        )}  Collections (Total of ${list.length})`}
        containerStyle={{ padding: '4px 20px' }}
        pagination={{
          current: page,
          pageSize: pageSize,
          total,
          onChange: handlePageChange,
        }}
        columns={columns}
        data={list}
        loading={loading}
        hoverBg={'#14151A'}
      /> */}
    </Container>
  );
};

export default PurchaseList;

const Container = styled.div`
  width: 1123px;
`;

const ImgCon = styled.img`
  width: 40px;
  height: 40px;

  background: #d9d9d9;
  border-radius: 8px;
`;

const MyLink = styled(Link)`
  color: ${(props: any) => props.theme.colors.scene.primary.normal};
`;
