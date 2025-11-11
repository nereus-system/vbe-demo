import { PageLayout } from '@/components/PageLayout'
import { Typography } from '@mui/material'

export default function RoadmapOverview() {
  return (
    <PageLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Roadmap Overview
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View your reduction roadmap and milestones.
      </Typography>
    </PageLayout>
  )
}

