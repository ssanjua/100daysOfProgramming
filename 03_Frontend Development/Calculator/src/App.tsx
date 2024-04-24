import './App.css'

function App() {

  const buttonPress = (symbol: string) => {
    console.log(symbol)
  }

  return (
    <>
      <div className="container">
        <h1>calc</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">93284</div>
            <div id="expression"></div>
          </div>
          <button 
            onClick={() => buttonPress("clear")}
            className="btn-master" 
            id="clear">C
          </button>
          <button 
            onClick={() => buttonPress("negative")}
            className="btn-operator" 
            id="negative">+/-
          </button>
          <button 
            onClick={() => buttonPress("percentage")}
            className="btn-operator" 
            id="percentage">%
          </button>
          <button 
            onClick={() => buttonPress("/")}
            className="btn-operator" 
            id="divide">/
          </button>
          <button 
            onClick={() => buttonPress("7")}
            className="btn-number" 
            id="seven">7
          </button>
          <button 
            onClick={() => buttonPress("8")}
            className="btn-number" 
            id="eight">8
          </button>
          <button 
            onClick={() => buttonPress("9")}
            className="btn-number" 
            id="nine">9
          </button>
          <button 
            onClick={() => buttonPress("multiply")}
            className="btn-operator" 
            id="multiply">*
          </button>
          <button 
            onClick={() => buttonPress("4")}
            className="btn-number" 
            id="four">4
          </button>
          <button 
            onClick={() => buttonPress("5")}
            className="btn-number" 
            id="five">5
          </button>
          <button 
            onClick={() => buttonPress("6")}
            className="btn-number" 
            id="six">6
          </button>
          <button 
            onClick={() => buttonPress("substract")}
            className="btn-operator" 
            id="substract">-
          </button>
          <button 
            onClick={() => buttonPress("1")}
            className="btn-number" 
            id="one">1
          </button>
          <button 
            onClick={() => buttonPress("2")}
            className="btn-number" 
            id="two">2
          </button>
          <button 
            onClick={() => buttonPress("3")}
            className="btn-number" 
            id="three">3
          </button>
          <button 
            onClick={() => buttonPress("add")}
            className="btn-operator" 
            id="add">+
          </button>
          <button 
            onClick={() => buttonPress("0")}
            className="btn-number" 
            id="zero">0
          </button>
          <button 
            onClick={() => buttonPress(".")}
            className="btn-number" 
            id="decimal">.
          </button>
          <button 
            onClick={() => buttonPress("=")}
            className="btn-equals" 
            id="equals">=
          </button>
        </div>
      </div>
    </>
  )
}

export default App
