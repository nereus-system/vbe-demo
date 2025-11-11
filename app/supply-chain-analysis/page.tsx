import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function SupplyChainAnalysis() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Supply Chain Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Analyze your supply chain carbon footprint data.
      </Typography>
    </PageLayout>
  )
}

