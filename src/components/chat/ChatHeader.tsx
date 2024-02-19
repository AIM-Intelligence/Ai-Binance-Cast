const ChatHeader = () => {
  return (
    <div className='w-full flex gap-3 justify-start items-center text-zinc-800'>
      <div className='flex flex-col items-start text-sm'>
        <p className='text-lg'>AI 대변인</p>
        <div className='flex gap-1.5 items-center'>
          <span className='relative flex h-3 w-3'>
            <p className='animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75'></p>
            <p className='relative inline-flex rounded-full h-3 w-3 bg-rose-500'></p>
          </span>
          <p className='font-medium'>AIM Secrity Filter Activating</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
