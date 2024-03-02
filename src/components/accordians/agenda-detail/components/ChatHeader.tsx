'use client';


const ChatHeader = ({ comment }: any) => {
  

  return (
    <div className='w-full flex gap-3 justify-between items-center text-zinc-800'>
      <div className='flex flex-col items-start text-sm'>
        <p className='text-lg'>{comment}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
