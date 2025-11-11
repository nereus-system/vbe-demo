import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function FinancialAnalysis() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Financial Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Analyze the financial impact of your reduction initiatives.
      </Typography>
    </PageLayout>
  )
}

