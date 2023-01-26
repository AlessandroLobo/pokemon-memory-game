import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'




interface TCell {
  row: number
  column: number
}

function App() {
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    getPokemons()
  }, []);

  const getPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

  }


  const [grid, setGrid] = useState([
    [0, 1, 3, 3], //0
    [5, 2, 4, 2], //1
    [0, 5, 4, 1], //2
  ])

  const [isReveled, setIsReveled] = useState(
    new Array(grid.length).fill('').map(() =>
      new Array(grid[0].length).fill(false)
    )
  )

  const [firstItem, setFirstItem] = useState<TCell>()

  function handleSelectedCard(row: number, column: number) {
    if (isReveled[row][column]) return
    const clickedNumber = grid[row][column]
    const newIsReveled = [...isReveled]
    newIsReveled[row][column] = true
    setIsReveled(newIsReveled)


    if (firstItem) {
      const firstNumberChoosed = grid[firstItem.row][firstItem.column]
      if (firstNumberChoosed !== clickedNumber) {
        setTimeout(() => {
          newIsReveled[firstItem.row][firstItem.column] = false
          newIsReveled[row][column] = false
          setIsReveled([...newIsReveled])
        }, 500)
      } else {
        const youWon = isReveled.flat().every((state) => state)
        if (youWon) {
          setTimeout(() => {
            alert("Você ganhou parabéns")
          }, 1000)
        }
      }
      setFirstItem(undefined)
    } else {
      setFirstItem({
        row,
        column,
      })
    }

  }

  return (
    <div className="App">
      <div>
        <h1>Jogo da Memoria</h1>
        <h3>Clique para escolher um card</h3>
      </div>
      <div className='grid'>
        {grid.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((number, columnIndex) =>
              <div
                className={'card ' + (isReveled[rowIndex][columnIndex] ? 'clicked' : '')}
                key={columnIndex}
                onClick={() => handleSelectedCard(rowIndex, columnIndex)}>
                {isReveled[rowIndex][columnIndex] ? number : ''}
              </div>
            )}
          </div >
        ))}
      </div>
    </div>
  )
}

export default App
