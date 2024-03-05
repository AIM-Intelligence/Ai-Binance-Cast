'use client';
import { cn } from '@/utils';
import { useMediaQuery } from '@/hooks/custom/use-media-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModal } from '@/hooks/stores/use-modal-store';
import React from 'react';

export function AgendaDetailContentModal() {
  const { isOpen, onClose, type, data } = useModal();
  const { detailContent } = data;
  const isModalOpen = isOpen && type === 'showAgendaDetailContent';
  const [open, setOpen] = React.useState(isModalOpen);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className='sm:max-w-[425px] bg-white dark:bg-black'>
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
            <DialogDescription>{detailContent}</DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }
  // TODO : Drawer이 작동하지 않는다. 닫히는 게 되지 않는다.  문제 해결 필요
  return (
    <Drawer open={isModalOpen}>
      <DrawerContent className='bg-white dark:bg-black'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Details</DrawerTitle>
          <DrawerDescription>{detailContent}</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className='px-4' />
        <DrawerFooter className='pt-2'>
          {/* <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<'form'>) {
  return <div className={cn('grid items-start gap-4', className)}></div>;
}
