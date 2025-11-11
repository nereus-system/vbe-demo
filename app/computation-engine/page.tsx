import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function ComputationEngine() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Computation Engine
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Configure and manage computation engines for footprint calculations.
      </Typography>
    </PageLayout>
  )
}

