import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function StrategySettings() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Strategy Settings
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Configure your reduction strategy settings.
      </Typography>
    </PageLayout>
  )
}

