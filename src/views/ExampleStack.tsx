import React, { FC } from 'react'
import ExamplePopout from './ExamplePopout'
import { ExampleWindowType } from './View1'

interface Props {
  exampleWindows: ExampleWindowType[]
}

const ExampleStack: FC<Props> = ({ exampleWindows }) => {
  return exampleWindows.length > 0 ? (
    <>
      {exampleWindows.map((windowInfo, i) => (
        <ExamplePopout
          key={i}
          title={`example/${i}`}
          useFinWindow={windowInfo.useFinWindow}
        >
          <div>
            {windowInfo.content} {i}
          </div>
        </ExamplePopout>
      ))}
    </>
  ) : null
}
export default ExampleStack
