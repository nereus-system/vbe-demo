import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function ProductsAnalysis() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Products Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Analyze carbon footprint data for your products.
      </Typography>
    </PageLayout>
  )
}

