import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function FootprintBuilder() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Footprint Builder
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Build and configure your carbon footprint calculations.
      </Typography>
    </PageLayout>
  )
}

