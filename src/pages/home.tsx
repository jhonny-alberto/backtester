import { useState, useCallback, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import testData from '../shared/data'

const Home = () => {
  const [inputs, setInputs] = useState([''])
  const [curSelIndex, setCurSelIndex] = useState(-1)

  const addInput = useCallback(() => {
    let tmp = [...inputs]
    tmp.push("")
    setInputs(tmp)
  }, [setInputs, inputs])

  const onChange = useCallback((e) => {
    const id = parseInt(e.target.id)
    //save the selected input value
    if(id < inputs.length) {
      let tmp = [...inputs]
      tmp[id] = e.target.value
      setInputs(tmp)
    }
    setCurSelIndex(id)
  }, [setCurSelIndex, inputs])

  useEffect(() => {
    if(curSelIndex === inputs.length - 1)
      addInput()
  }, [curSelIndex, inputs, addInput])

  return (
    <div className="home">
      {inputs.map((value, index) => (
        <Autocomplete
          id={index.toString()}
          key={index}
          defaultValue={null}
          options={testData[index % 3]}
          getOptionLabel={(option) => option.title}
          style={{ width: 300, margin: 10 }}
          onChange={onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Input ${(index % 3) + 1}`}
              variant="outlined"
              style={{ padding: 0 }}
            />
          )}
        />
      ))}
    </div>
  )
}

export default Home;