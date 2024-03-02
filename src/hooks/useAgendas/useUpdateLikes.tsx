import { useMutation } from '@tanstack/react-query';
import { updateAgendaLikesServer } from '../../../server/actions/agenda-actions/update/like-agenda';
import { likePayload } from '@/validation/agenda';

// ! 하나의 변수로 상태를 관리하는 zustand가 아닌 다중 상태를 각각 처리할 때는 이렇게 하는게 깔끔함

const useUpdateLikesServer = (
  likes: string[],
  agendaId: string,
  setLikes: any,
  setNumLikes: any
): { mutate: any; isPending: any } => {
  return useMutation({
    mutationFn: async (newLikePayLoad: likePayload) => {
      try {
        const result = await updateAgendaLikesServer(newLikePayLoad);
        return result;
      } catch (error) {
        throw error;
      }
    },
    onMutate(likePayload) {
      let likesArray = [...likes];
      let plusCheck = true;

      if (likesArray.includes(agendaId)) {
        likesArray = likesArray.filter((Id) => Id !== agendaId);

        setLikes(likesArray);
        setNumLikes((prev: number) => prev - 1);
        plusCheck = false;
      } else {
        likesArray.push(agendaId);

        setLikes(likesArray);
        setNumLikes((prev: number) => prev + 1);
      }
      likePayload.new_likes_list = likesArray;
      likePayload.plus_check = plusCheck;
    },
    onError: () => {
      let likesArray = [...likes];

      if (likesArray.includes(agendaId)) {
        likesArray.push(agendaId);

        setLikes(likesArray);
        setNumLikes((prev: number) => prev + 1);
      } else {
        likesArray.push(agendaId);
        likesArray = likesArray.filter((Id) => Id !== agendaId);

        setLikes(likesArray);
        setNumLikes((prev: number) => prev - 1);
      }
    },
  });
};

export default useUpdateLikesServer;
