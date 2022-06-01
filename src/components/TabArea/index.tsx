import {Box, Typography} from '@mui/material'

interface Props {
  children: any
}

const TabArea: React.FC<Props> = ({children}: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      marginTop={2}
      gap={8}
    >
      {children.length !== 0 ? (
        children
      ) : (
        <Typography variant="body2" component="div" color="lightgray">
          Não há itens a serem listados.
        </Typography>
      )}
    </Box>
  )
}

export default TabArea
