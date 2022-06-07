import {Skeleton, Timeline, TimelineContent, TimelineSeparator} from '@mui/lab'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import {Fade} from '@mui/material'
import {useEffect, useState} from 'react'
import {Visit as VisitEntity} from '../../entities/Visit'
import {useLoading} from '../../hooks/useLoading'
import {Filter, VisitService} from '../../services/VisitService'
import TabArea from '../TabArea'
import Visit from '../Visit'

const visitService = new VisitService()

interface Props {
  filter?: Filter
}

const VisitList: React.FC<Props> = ({filter = {}}: Props) => {
  const [visits, setVisits] = useState<Array<VisitEntity>>()
  const handleFetch = useLoading(fetch, 'Carregando histórico de visitas...')

  useEffect(() => {
    handleFetch()
  }, [])

  async function fetch() {
    const newVisits = await visitService.fetch(filter)
    setVisits(newVisits)
  }

  function renderVisit(visit: VisitEntity, index: number) {
    return (
      <Fade in timeout={index * 500} key={visit.pictureId + index}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot
              variant="outlined"
              color={index % 2 === 0 ? 'primary' : 'secondary'}
            />
            <TimelineConnector />
          </TimelineSeparator>
          <Visit visit={visit} />
        </TimelineItem>
      </Fade>
    )
  }

  if (visits === undefined) {
    return (
      <TabArea>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color={'primary'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Skeleton variant="rectangular" height={100} />
              <Skeleton variant="text" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color={'secondary'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Skeleton variant="rectangular" height={100} />
              <Skeleton variant="text" />
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color={'primary'} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Skeleton variant="rectangular" height={100} />
              <Skeleton variant="text" />
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </TabArea>
    )
  }

  return (
    <TabArea>
      <Timeline position="alternate">{visits.map(renderVisit)}</Timeline>
    </TabArea>
  )
}

export default VisitList
