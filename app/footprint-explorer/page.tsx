import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function FootprintExplorer() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Footprint Explorer
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Explore and analyze your corporate carbon footprint data.
      </Typography>
    </PageLayout>
  )
}

