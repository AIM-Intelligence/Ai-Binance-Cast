'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui';

const GradiButton = ({ content }: any) => {
  return (
    <Button className='relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md'>
      <span className='w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute'></span>
      <span className='relative w-full py-3 text-center transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400'>
        <span className='relative text-white'>{content}</span>
      </span>
    </Button>
  );
};

export default GradiButton;
