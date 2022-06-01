import {Grid, Typography} from '@mui/material'
import React from 'react'
import {colors} from '../../colors'

const Footer: React.FC = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      mt="auto"
      sx={{
        display: {
          xl: 'initial',
          lg: 'initial',
          md: 'none',
          sm: 'none',
          xs: 'none',
        },
      }}
    >
      <Typography component="label" variant="body2" color={colors.default}>
        Parintins Digital | {new Date().getFullYear()}
      </Typography>
    </Grid>
  )
}

export default Footer
