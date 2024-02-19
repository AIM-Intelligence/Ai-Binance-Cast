import { FiAlertTriangle } from "react-icons/fi";

interface AlertErrorProps {
  message?: string;
}

export const AlertError = ({ message }: AlertErrorProps) => {
  if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <FiAlertTriangle className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
};
