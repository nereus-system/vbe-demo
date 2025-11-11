import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function FootprintEFMatching() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Footprint EF Matching
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Match emission factors to your footprint data.
      </Typography>
    </PageLayout>
  )
}

