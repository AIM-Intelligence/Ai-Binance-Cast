"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  SignInWithMetamaskButton,
  useClerk,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

import { sidebarLinks } from "@/constants/bar";

import { ModeToggle } from "./components/theme-toggle";
import { Loader } from "../shared";
//import { ConnectButton } from '@/lib/thirdweb/thirdweb';

import shortenAddress from "@/utils/shortenAddress";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { BSC_CHAIN_ID } from "@/config/env";

const LeftSidebar = () => {
  const { isLoaded, userId } = useAuth();
  const { signOut } = useClerk();
  const { chain } = useAccount();

  const { isSignedIn, user } = useUser();
  const { address } = useAccount();
  const { connectors, connect } = useConnect();

  const { disconnect } = useDisconnect();
  const connector = connectors[0];
  const pathname = usePathname();
  const router = useRouter();

  const {
    data: token,
    isError: tokenError,
    isLoading,
  } = useBalance({
    address: address,
    token: "0x3e38a6aC5F4990B76440Ec54189628ae123EEb7d",
    // onError(error) {
    //   console.log('Error', error);
    // },
  });

  const { data: coin, isError: coinError } = useBalance({
    address: address,
    // onError(error) {
    //   console.log('Error', error);
    // },
  });

  //console.log(isError);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex gap-3 items-center justify-center">
          <Image
            src="/abcLogo.png"
            alt="logo"
            width={120}
            height={100}
            className="text-black hidden dark:flex"
          />
          <Image
            src="/abcLogo.png"
            alt="logo"
            width={120}
            height={100}
            className="text-black dark:hidden"
          />
        </Link>

        {!isLoaded ? (
          <div>
            <Loader />
          </div>
        ) : isSignedIn ? (
          <SignedIn>
            <Button
              onClick={() => router.push("/profile")}
              className="flex items-center justify-start gap-2 "
            >
              <Image
                src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yY2FLRVFyd2puOUs2ZXV1aEd1YVBhUnFQWjIiLCJyaWQiOiJ1c2VyXzJjYVNIakVtUXdINlJ1bzlJQkxJYnM3RzA3TSJ9"
                width={48}
                height={48}
                alt="profile image"
                className="rounded-full"
              />
              <span className="">
                <p className="text-lg">
                  {shortenAddress(user?.primaryWeb3Wallet!.web3Wallet)}
                </p>

                {chain && chain.id !== BSC_CHAIN_ID ? (
                  <p className="small-regular text-primary-400">
                    GF {coin?.symbol} :{" "}
                    {coinError ? "error" : coin?.formatted.slice(0, 5)}
                  </p>
                ) : (
                  <p className="small-regular text-primary-500">
                    {token?.symbol} Token :{" "}
                    {tokenError ? "error" : token?.formatted.slice(0, 5)}
                  </p>
                )}
              </span>
            </Button>
          </SignedIn>
        ) : (
          <SignedOut>
            <SignInWithMetamaskButton>
              <button
                className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
                onClick={() => connect({ connector })}
              >
                <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
                <span className="relative w-full py-3 text-center transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
                  <span className="relative text-white">
                    Sign with metamask
                  </span>
                </span>
              </button>
            </SignInWithMetamaskButton>
          </SignedOut>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: any) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <Link
                  href={link.route}
                  target={link.label === "Chat Market" ? "_blank" : "_self"}
                  className={`flex gap-4 items-center p-4 hover:text-white ${
                    isActive && "text-white"
                  }`}
                >
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                    width={30}
                    height={30}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-between gap-4">
        {userId && (
          <Button
            variant="ghost"
            className="shad-button_ghost hover:opacity-70"
            onClick={() => {
              disconnect();
              signOut(() => router.push("/"));
            }}
          >
            <Image
              src="/icons/sign-out-alt.svg"
              alt="logout"
              width={30}
              height={30}
            />
            <p className="small-medium lg:base-medium">Logout</p>
          </Button>
        )}

        <ModeToggle />
      </div>
    </nav>
  );
};

export default LeftSidebar;
