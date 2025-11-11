import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function LeversLibrary() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Levers Library
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Browse and manage reduction levers for your strategy.
      </Typography>
    </PageLayout>
  )
}

