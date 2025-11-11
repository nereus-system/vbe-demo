import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function DataSet() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Data Set
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage your product carbon footprint datasets.
      </Typography>
    </PageLayout>
  )
}

