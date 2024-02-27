import useTotalAgendasServer from '@/hooks/useAgendas/useTotalAgenda';
import { Loader } from '../shared';
import AgendaCard from '../cards/agenda-card';

const AgendaCardList = () => {
  const {
    isFetching,
    data: agendas,
    error: agendaError,
  } = useTotalAgendasServer();

  if (isFetching) {
    return (
      <div className='isfetching-flex'>
        <Loader />
      </div>
    );
  }

  if (agendas.error === 1) {
    return <div>안건을 불러올 수 없습니다.</div>;
  } else if (agendas.error === 2 || agendaError) {
    return <div>안건을 불러오는 데 문제가 발생했습니다.</div>;
  }
  if (agendas.length < 1) {
    return <div>안건이 없습니다.</div>;
  }

  return (
    <ul className='flex flex-col flex-1 gap-9 w-full '>
      {agendas.map((agenda: any) => (
        <AgendaCard agenda={agenda} key={agenda.id} />
      ))}
    </ul>
  );
};

export default AgendaCardList;
