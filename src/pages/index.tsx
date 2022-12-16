import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material'
import { Cancel, OfflineBolt, Circle } from '@mui/icons-material'
import type { NextPage } from 'next'
import useSWR from 'swr'
import { Layout } from '../components/layout/Layout'
import { ApiStations } from './api/stations'
import { colors } from '../styles/theme'

const StationsPage: NextPage = () => {
  const { data, error } = useSWR<ApiStations>('/api/stations')

  return (
    <Layout>
      <Paper sx={{ mt: 3 }}>
        <Table aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>Nom de code</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Date de dernière charge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.stations.map((station) => (
                <TableRow key={station.codeName}>
                  <TableCell>{station.codeName}</TableCell>
                  <TableCell>
                    {station.status === 'Disponible' ? (
                      <Chip
                        icon={<Circle style={{ color: colors.success }} />}
                        label={station.status}
                      />
                    ) : station.status === 'En charge' ? (
                      <Chip
                        icon={<OfflineBolt style={{ color: colors.primary }} />}
                        label={station.status}
                      />
                    ) : (
                      <Chip
                        icon={<Cancel style={{ color: colors.error }} />}
                        label={station.status}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {station.lastSession
                      ? new Date(station.lastSession)
                          .toLocaleString()
                          .split(' ')
                          .join(', ')
                      : 'N/A'}
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

export default StationsPage
