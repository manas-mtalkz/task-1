
import './App.css';
import { useEffect, useState } from 'react';
import ToggleSwitch from './components/ToggleSwitch';

function App() {
  const [data, SetData] = useState([]);
  const [stdper, SetStdPer] = useState([]);

  useEffect(() => {
    const f = async () => {
      let x = await fetch('https://app.mtalkz.cloud/perms.php?id=5');
      let y = await x.json();
      // console.log(x);
      // console.log(y);
      SetData([...y]);
      console.log(y.filter(e => e.split(".")[0] === "organizations").filter(e => e.split(".")[1] === "destroy").length)
      const fields = y.map(e => {
        return e.split(".")[0];
      })
      // console.log(fields);
      const set = new Set(fields);
      SetStdPer([...set]);
      // console.log(stdper);
    }
    f();
  }, []);

   

  return (
    <div className='py-5 px-4'>
      <h3>Standard Permissions</h3>
      <table className="table">
        <thead>
          <tr className='text-center'>
            <th scope="col"></th>
            <th scope="col">LIST</th>
            <th scope="col">SHOW</th>
            <th scope="col">CREATE</th>
            <th scope="col">UPDATE</th>
            <th scope="col">DELETE</th>
          </tr>
        </thead>
        <tbody>
          {stdper.map((x, index) => (
            <tr key={index} className="align-items-center">
              <th scope="">{ x }</th>
              <td>
                {(data.filter(e => e.split(".")[0] === x).filter(e => e.split(".")[1] === "index").length !== 0) && 
        <ToggleSwitch /> }
              </td>
              <td>
                {(data.filter(e => e.split(".")[0] === x).filter(e => e.split(".")[1] === "show").length !== 0) && 
        <ToggleSwitch />}
              </td>
              <td>
                {(data.filter(e => e.split(".")[0] === x).filter(e => e.split(".")[1] === "store").length !== 0) && 
        <ToggleSwitch />}
              </td>
              <td>
                {(data.filter(e => e.split(".")[0] === x).filter(e => e.split(".")[1] === "update").length !== 0) && 
        <ToggleSwitch />}
              </td>
              <td>
                {(data.filter(e => e.split(".")[0] === x).filter(e => e.split(".")[1] === "destroy").length !== 0) && 
        <ToggleSwitch />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <h3>Standard Permissions</h3>
      <table className="table">
        <tbody>
          {data.filter(e=>e.split('.')[1]!=='index' && e.split('.')[1]!=='show' && e.split('.')[1]!=='store' && e.split('.')[1]!=='update' && e.split('.')[1]!=='delete').map((x, index) => (
            <tr key={index}>
              <th scope="">{ x }</th>
              <td>
                
        <ToggleSwitch />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
