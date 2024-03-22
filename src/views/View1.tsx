import React, { useState } from 'react'
import logo from '../logo.svg'
import '@finos/fdc3'
import ExampleStack from './ExamplePopout'
export interface ExampleWindowType {
  content: string
  useFinWindow: boolean
}

function View1() {
  const [exampleWindows, setExampleWindows] = useState<ExampleWindowType[]>([])

  const launchExample = () => {
    // this is a simplified version. normally a button click would dispatch an action to get info from our backend
    // that gets added to redux state and accessed through useSelector in the ExampleStack component
    const newWindow = [
      {
        content: 'fin.window.create example',
        useFinWindow: true,
      },
      { content: 'window.open example', useFinWindow: false },
    ]
    setExampleWindows([...exampleWindows, ...newWindow])
  }

  return (
    <div className='col fill gap20'>
      <header className='row spread middle'>
        <div className='col'>
          <h1>OpenFin React View 1</h1>
          <h1 className='tag'>React app view in an OpenFin container</h1>
        </div>
        <div className='row middle gap10'>
          <img src={logo} alt='OpenFin' height='40px' />
        </div>
      </header>
      <main className='col gap10 left'>
        <button onClick={() => launchExample()}>Launch windows</button>
      </main>
      <ExampleStack exampleWindows={exampleWindows} />
    </div>
  )
}

export default View1
