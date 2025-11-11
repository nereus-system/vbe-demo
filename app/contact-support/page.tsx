import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function ContactSupport() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Support
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Get help and contact our support team.
      </Typography>
    </PageLayout>
  )
}

