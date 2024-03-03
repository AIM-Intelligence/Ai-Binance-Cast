'use client'
import { useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { NavBar } from './NavBar';
import { DCELLAR_URL } from '@/env';
import CollectionList from './CollectionList';
import PurchaseList from './PurchaseList';
import OtherListedList from './OtherListedList';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui';

enum Type {
  Collections = 'collections',
  Purchase = 'purchase',
}
const _navItems = [
  {
    name: 'My Data Collections',
    key: Type.Collections,
  },
  {
    name: 'My Purchases',
    key: Type.Purchase,
  },
];

interface IProfileList {
  realAddress: string | undefined;
  self: boolean;
}



const ProfileList = (props: IProfileList) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const router = useRouter();
  const { realAddress, self } = props;

  const [navItems, setNavItems] = useState(_navItems);

  useEffect(() => {
    if (!self) {
      const cp = JSON.parse(JSON.stringify(_navItems));
      cp.splice(1, 1);
      cp[0].name = 'Data List';
      setNavItems(cp);
    } else {
      setNavItems(_navItems);
    }
  }, [realAddress]);

  const currentTab = tab ? tab : Type.Collections;
  const handleTabChange = useCallback((tab: any) => {
    router.push(`/profile?tab=${tab}`);
  }, []);

  const [showButton, setShowButton] = useState(false);

  return (
    <Container>
      <div className='flex justify-center items-center'>
        <NavBar
          active={currentTab}
          onChange={handleTabChange}
          items={navItems}
        />
        {self && showButton && (
          <Button
            onClick={() => {
              window.open(`${DCELLAR_URL}`);
            }}
            className='ml-[6px] w-[200px] h-[40px] rounded-md'
            size={'sm'}
            
          >
            Upload Data in DCellar
          </Button>
        )}
      </div>

      <Card className='h-20' />
      {self ? (
        currentTab === Type.Collections ? (
          <CollectionList setShowButton={setShowButton}></CollectionList>
        ) : (
          <PurchaseList></PurchaseList>
        )
      ) : (
        <div></div>
      )}
      <OtherListedList
          realAddress={realAddress!}
          self={self}
        ></OtherListedList>
    </Container>
  );
};

export default ProfileList;


const Container = styled.div`
  margin-top: 30px;
  width: 1123px;
`;



