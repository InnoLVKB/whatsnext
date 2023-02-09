import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'

function Test () {
  const [draggableHandler, setDraggableHandler] = useState(false)

  const handleDrag = (e) => {
    setDraggableHandler(!draggableHandler)
  }

  const buttonStyle =
    'rounded-full h-auto w-1/5 focus:animate-bounce focus:border-red-900 border-solid border-opacity-70 border-2 drop-shadow-sm'
  const imageStyle = 'rounded-full'

  return (
    <>
      <button onClick={handleDrag} className="bg-slate-200 border-2">
        {draggableHandler ? 'Turn off drag' : 'Turn on drag'}
      </button>
      <Draggable disabled={!draggableHandler}>
        <Resizable
          defaultSize={{
            width: 320,
            height: 200
          }}
          minWidth={380}
          minHeight={380}
          // maxWidth={380}
          // maxHeight={380}
          className="border-2 border-black"
        >
          RESIZE me PLease
        </Resizable>
      </Draggable>
    </>
  )
}

export default Test
