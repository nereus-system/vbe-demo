import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function SupplyChainExplorer() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Supply Chain Explorer
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Explore your supply chain carbon footprint.
      </Typography>
    </PageLayout>
  )
}

