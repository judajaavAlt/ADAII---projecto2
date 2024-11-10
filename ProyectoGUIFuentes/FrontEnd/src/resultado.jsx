import './App.css'
import { PieChart } from '@mui/x-charts';

function App() {
  const x = [[0,0,2], [2,0,0], [0,0,0]]

  return (
    <>
      <div className='graficos'>
        <h1>Distribucion de las opiniones</h1>
        <div>
          <div className='grafico'>
            <h2>Inicial</h2>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className='grafico'>
            <h2>Polarización reducida</h2>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'series A' },
                    { id: 1, value: 15, label: 'series B' },
                    { id: 2, value: 20, label: 'series C' },
                  ],
                },
              ]}
              width={400}
              height={200}
              
            />
          </div>
        </div>
      </div>
      <div className='movimientos'>
        <h2>Movimientos</h2>
      <ol>
      {
        x.map((row, indexy) => 
        {
          return row.map((item, indexx) => 
          {
            if(item > 0)
            {
              return <li key={toString(indexx) + toString(indexy)}>Se cambio la opinion de {item} personas de la opinion {indexy} a la opinion {indexx}</li>
            }
          })
        })
      }
      </ol>
      </div>
    </>
  )
}

export default App
