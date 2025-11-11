import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function Documentation() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Documentation
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Access documentation and guides for the platform.
      </Typography>
    </PageLayout>
  )
}

