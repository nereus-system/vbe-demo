import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function EFHub() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        EF Hub
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Browse and manage emission factors from the hub.
      </Typography>
    </PageLayout>
  )
}

