import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function TeamsDashboard() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Teams Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Monitor team performance and reduction goals.
      </Typography>
    </PageLayout>
  )
}

