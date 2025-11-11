import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function ReductionTracking() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Reduction Tracking
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Track your carbon reduction progress over time.
      </Typography>
    </PageLayout>
  )
}

