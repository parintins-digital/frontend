import {useState} from 'react'

interface TabType {
  name: string
  onChange: () => void
}

export function useTap(initialTabs: Array<TabType>) {
  const [tabs, setTabs] = useState<Array<TabType>>(initialTabs)
  const [currentTab, setCurrentTab] = useState<TabType>()

  function getCurrentTab() {
    return currentTab
  }

  function registerTabs(newTabs: Array<TabType>) {
    setTabs(newTabs)
  }

  function changeTab(tabName: string) {
    const tab = tabs.find((tab) => tab.name === tabName)
    if (!tab) return
    setCurrentTab(tab)
    tab.onChange()
  }

  return {
    getCurrentTab,
    registerTabs,
    changeTab,
  }
}
