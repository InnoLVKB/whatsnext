import React, { createContext, useState, useContext } from 'react'

interface ContextProps {
  dragStatus: boolean
  setDragStatus: (status: boolean) => void
}

export const DragContext = createContext<ContextProps>({
  dragStatus: false,
  setDragStatus: () => {}
})

const DragContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dragStatus, setDragStatus] = useState(false)

  return (
    <DragContext.Provider
      value={{
        dragStatus,
        setDragStatus
      }}
    >
      {children}
    </DragContext.Provider>
  )
}

export const useDragContext = () => useContext(DragContext)

export default DragContextProvider
