import {useEffect, useState} from 'react'
import {Visit as VisitEntity} from '../../entities/Visit'
import {useLoading} from '../../hooks/useLoading'
import {VisitService} from '../../services/VisitService'
import TabArea from '../TabArea'
import Visit from '../Visit'

const visitService = new VisitService()

const VisitList: React.FC = () => {
  const [visits, setVisits] = useState<Array<VisitEntity>>([])
  const handleFetch = useLoading(fetch, 'Carregando histórico de visitas...')

  useEffect(() => {
    handleFetch()
  }, [])

  async function fetch() {
    const newVisits = await visitService.fetch()
    setVisits(newVisits)
  }

  function renderVisit(visit: VisitEntity) {
    return <Visit visit={visit} />
  }

  return <TabArea>{visits.map(renderVisit)}</TabArea>
}

export default VisitList
