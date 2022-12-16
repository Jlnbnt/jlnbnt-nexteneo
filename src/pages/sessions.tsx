// @ts-nocheck
import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { Layout } from '../components/layout/Layout'
import { ApiSessions } from './api/sessions'
import useRemainingTime from '../hooks/useRemainingTime'

const SessionPage: NextPage = () => {
  const { data, error } = useSWR<ApiSessions>('/api/sessions')
  const remainingTime = useRemainingTime()

  return (
    <Layout>
      <Paper sx={{ mt: 3 }}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>EVSE</TableCell>
              <TableCell>Date de début</TableCell>
              <TableCell>Date de fin</TableCell>
              <TableCell>Durée</TableCell>
              <TableCell>Prix</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.sessions
                .sort((a, b) => new Date(b.dateEnd) - new Date(a.dateEnd))
                .map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>{session.id}</TableCell>
                    <TableCell>{session.evse}</TableCell>
                    <TableCell>
                      {session.dateStart
                        ? new Date(session.dateStart)
                            .toLocaleString()
                            .split(' ')
                            .join(', ')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {session.dateEnd
                        ? new Date(session.dateEnd)
                            .toLocaleString()
                            .split(' ')
                            .join(', ')
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {remainingTime(session.dateEnd, session.dateStart)}
                    </TableCell>
                    <TableCell>
                      {session.price.toFixed(2).replace('.', ',')} €
                    </TableCell>
                  </TableRow>
                ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3}>{error.message}</TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Layout>
  )
}

export default SessionPage
