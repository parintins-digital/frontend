import {debounce} from 'debounce'
import {ChangeEvent, InputHTMLAttributes, useState} from 'react'

interface Options<FilterProps> {
  onChange?: (filters: FilterProps) => void
}

export function useFilter<FilterProps>(options: Options<FilterProps> = {}) {
  const [filters, setFilters] = useState<any>({})

  const handleSetFilters = debounce(setFilters, 1000)

  function __onChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.currentTarget
    const newFilters = addFilter(name, value)
    options.onChange?.(newFilters)
  }

  function addFilter(name: string, value: string): FilterProps {
    const newFilters: any = filters
    newFilters[name] = value === '' ? undefined : value
    handleSetFilters({...newFilters})
    return newFilters
  }

  function getFilters(): FilterProps {
    return filters as FilterProps
  }

  function registerFilter(name: string): InputHTMLAttributes<HTMLInputElement> {
    return {
      name: name,
      onChange: __onChange,
    }
  }

  return {
    registerFilter,
    addFilter,
    getFilters,
  }
}
