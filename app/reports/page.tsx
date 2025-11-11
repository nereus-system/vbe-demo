import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function Reports() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Generate and view carbon footprint reports.
      </Typography>
    </PageLayout>
  )
}

