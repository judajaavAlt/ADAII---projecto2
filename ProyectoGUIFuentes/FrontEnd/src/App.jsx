import { useState } from "react";
import { PieChart } from '@mui/x-charts';
import * as MiniZinc from 'minizinc';

function App() 
{
    MiniZinc.init({
        // If omitted, searches for minizinc-worker.js next to the minizinc library script
        workerURL: 'http://localhost:3000/node_modules/minizinc/dist/minizinc-worker.js',
        // If these are omitted, searches next to the worker script
        wasmURL: 'http://localhost:3000/node_modules/minizinc/dist/minizinc.wasm',
        dataURL: 'http://localhost:3000/node_modules/minizinc/dist/minizinc.data'
      }).then(() => {
        console.log('Ready');
      });

    const [value, setValue] = useState("")
    fetch('../src/test.mzn')
        .then(r => r.text())
        .then(text => {
        setValue(text);
    });
    const model = new MiniZinc.Model();
    model.addFile('test.mzn', value);
    model.addDznString('n = 4;');
    const solve = model.solve({
        options: {
          solver: 'gecode',
          'time-limit': 10000,
          statistics: true
        }
      });
    solve.then(result => {
        console.log(result.solution.output.json);
        console.log(result.statistics);
    });

    const [fileContent, setFileContent] = useState(""); // Store file content if needed
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Get the selected file
        if (selectedFile) {
            const reader = new FileReader(); // Create a new FileReader instance
            reader.onload = (event) => {
                // This will be called once the file is read
                setFileContent(event.target.result)// Update the file content state
            };
            reader.readAsText(selectedFile); // Start reading the file as text
        }
    };

    const Preview = () =>
    {
        var data = fileContent
        data = data.split("\n")
        const personas = data[0]
        const maxEsf = data[data.length - 3]
        const maxMov = data[data.length - 2]
        data = data[2]
        data = data.replace("\r", "");
        data = data.split(",")
        data = data.map((v, index) => {return {id: index, value:v, label: "opinion " + (index + 1)}})

        return(
            <div className="preview">
                <h1>Datos del documento</h1>
                <h2>Distribucion por opinion</h2>
                <div style={{width: "100%",
                             aspectRatio:"1/1"}}>
                    <PieChart
                        slotProps={{legend:{hidden:true}}}
                        series={[
                            {data: data,},
                        ]}
                    />
                </div>
                <h2>Datos importantes</h2>
                <p>numero de personas: {personas}</p>
                <p>maximo esfuerzo: {maxEsf}</p>
                <p>Maximos movimientos: {maxMov}</p>
            </div>
        )
    }

    var Result = ""
    if (fileContent != "")
        {
            Result = (<Preview/>)
        }

    return(
        <>
            <form>
                <input 
                    type="file"
                    onChange={handleFileChange}
                />
            </form>
            {Result}
        </>
    )
}

export default App