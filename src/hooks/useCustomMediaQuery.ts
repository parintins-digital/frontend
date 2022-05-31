import {useMediaQuery, useTheme} from '@mui/material'

type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Breakpoint = {
  [key in BreakpointType]?: string
}

export function useCustomMediaQuery() {
  const theme = useTheme()

  function up(breakpoint: BreakpointType): boolean {
    const matches = useMediaQuery(theme.breakpoints.up(breakpoint))
    return matches
  }

  function down(breakpoint: BreakpointType) {
    const matches = useMediaQuery(theme.breakpoints.down(breakpoint))
    return matches
  }

  function only(breakpoint: BreakpointType) {
    const matches = useMediaQuery(theme.breakpoints.only(breakpoint))
    return matches
  }

  function between(
    startBreakpoint: BreakpointType,
    finalBreakpoint: BreakpointType
  ) {
    const matches = useMediaQuery(
      theme.breakpoints.between(startBreakpoint, finalBreakpoint)
    )
    return matches
  }

  function query(breakpoint: Breakpoint): string | undefined {
    for (const key in breakpoint) {
      if (only(key as BreakpointType)) {
        return breakpoint[key as BreakpointType]
      }
    }
  }

  return {
    up,
    down,
    between,
    query,
  }
}
