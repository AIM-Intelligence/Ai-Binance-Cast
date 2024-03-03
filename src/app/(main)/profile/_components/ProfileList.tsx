'use client'
import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex } from '@totejs/uikit';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import { NavBar } from './NavBar';
import { DCELLAR_URL } from '@/env';
import CollectionList from './CollectionList';
import PurchaseList from './PurchaseList';
import OtherListedList from './OtherListedList';

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
      <NavCon alignItems={'center'}>
        <NavBar
          active={currentTab}
          onChange={handleTabChange}
          items={navItems}
        />
        {self && showButton && (
          <MyButton
            onClick={() => {
              window.open(`${DCELLAR_URL}`);
            }}
            size={'sm'}
            style={{ marginLeft: '6px' }}
          >
            Upload Data in DCellar
          </MyButton>
        )}
      </NavCon>

      <Box h={20} />
      {self ? (
        currentTab === Type.Collections ? (
          <CollectionList setShowButton={setShowButton}></CollectionList>
        ) : (
          <PurchaseList></PurchaseList>
        )
      ) : (
        <OtherListedList
          realAddress={realAddress!}
          self={self}
        ></OtherListedList>
      )}
    </Container>
  );
};

export default ProfileList;


const Container = styled.div`
  margin-top: 30px;
  width: 1123px;
`;

const NavCon = styled(Flex)``;
const MyButton = styled(Button)`
  width: 200px;
  height: 40px;
  border-radius: 8px;
`;

