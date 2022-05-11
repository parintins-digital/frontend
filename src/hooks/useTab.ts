import {useState} from 'react'

export function useTab(initialTab: number) {
  const [currentTab, setCurrentTab] = useState<number>(initialTab)

  function getCurrentTab() {
    return currentTab
  }

  function changeTab(tabID: number) {
    setCurrentTab(tabID)
  }

  return {
    getCurrentTab,
    changeTab,
  }
}
