import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function ProductsCatalog() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Products Catalog
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Browse and manage your product catalog with carbon footprint data.
      </Typography>
    </PageLayout>
  )
}

