import { useState } from "react";
import { PieChart } from '@mui/x-charts';

function App() 
{
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