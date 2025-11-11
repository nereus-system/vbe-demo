import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function MatchingRules() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Matching Rules
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Configure rules for matching emission factors.
      </Typography>
    </PageLayout>
  )
}

