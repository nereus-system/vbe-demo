import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function FootprintAnalysis() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Footprint Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Analyze your corporate carbon footprint in detail.
      </Typography>
    </PageLayout>
  )
}

