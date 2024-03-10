"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Loader from "@/components/shared/Loader";

import useUserClient from "@/hooks/useUser/useUserServer";
import { BarNav } from "./_components/bar-nav";
import { useAccount, useBalance } from "wagmi";
import { useEffect, useState } from "react";

const barNavItems = [
  {
    title: "My Data Collections",
    href: "/profile",
  },
  {
    title: "My Purchases",
    href: "/profile/purchases",
  },
  {
    title: "Profit",
    href: "/profile/profit",
  },
  {
    title: "My Agenda",
    href: "/profile/my-agenda",
  },
  {
    title: "Liked",
    href: "/profile/liked",
  },
];

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-black dark:text-light-2">
      {label}
    </p>
  </div>
);

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isFetching, data: user, error } = useUserClient();

  const { address } = useAccount();

  const { data, isError, isLoading } = useBalance({
    address: address,
    token: "0x3e38a6aC5F4990B76440Ec54189628ae123EEb7d",
    // onError(error) {
    //   console.log('Error', error);
    // },
  });

  if (isFetching) {
    return (
      <div className="isfetching-flex">
        <Loader />
      </div>
    );
  }

  if (!isMounted) {
    return (
      <div className="isfetching-flex">
        <Loader />
      </div>
    );
  }
  return (
    <main className="profile-container">
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <Image
            src={
              (user && user[0]?.image_url) || "/icons/profile-placeholder.svg"
            }
            alt="profile"
            width={50}
            height={50}
            className="w-[80px] h-[80px] object-cover rounded-full"
          />
          <div className="flex flex-col flex-1 justify-between md:mt-2">
            <div className="flex flex-col w-full gap-2">
              <p className="small-regular md:text-2xl text-center xl:text-left">
                {address}
              </p>
              <span
                suppressHydrationWarning
                className="flex gap-2 items-center"
              >
                <Image
                  src="/abcLogo.png"
                  width={40}
                  height={40}
                  alt="abc token"
                />
                <p className="small-regular md:body-medium text-center xl:text-left text-primary-500">
                  {data?.symbol} Token : {data?.formatted.slice(0, 5)}
                </p>
              </span>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock
                value={user && user[0].age ? user.age : "-"}
                label="age"
              />
              <StatBlock
                value={user && user[0].gender ? user.gender : "-"}
                label="gender"
              />
              <StatBlock
                value={user && user[0].point ? user.point : "-"}
                label="point"
              />
              <StatBlock
                value={user && user[0].coupon ? user.coupon : "-"}
                label="coupon"
              />
            </div>

            <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
              user bio....
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href={`#`}
              className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}
            >
              <Image
                src={"/icons/edit.svg"}
                alt="edit"
                width={20}
                height={20}
              />
              <p className="flex whitespace-nowrap small-medium">
                Edit Profile
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-5xl w-full">
        <BarNav items={barNavItems} />
        {/* <Link
          href={`/profile/`}
          className={`profile-tab rounded-l-lg ${
            search === `#` && '!bg-dark-3'
          }`}
        >
          <Image src={'/icons/posts.svg'} alt='posts' width={20} height={20} />
          My Data Collections
        </Link>
        <Link
          href={`#`}
          className={`profile-tab rounded-r-lg ${
            search === `#` && '!bg-dark-3'
          }`}
        >
          <Image src={'/icons/like.svg'} alt='like' width={20} height={20} />
          My Purchases
        </Link> */}

        <div className="flex-1 lg:max-w-4xl mt-4">{children}</div>
      </div>
    </main>
  );
}
