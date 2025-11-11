import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function DataIngestion() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Data Ingestion
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Import and manage your carbon footprint data.
      </Typography>
    </PageLayout>
  )
}

