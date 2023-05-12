import { Component, createSignal,Show } from 'solid-js';
import SearchBar from './components/SearchBar';
import ResultCard from './components/ResultCard';

export type ResultType = {
  token: string,
  name: string,
  symbol: string,
  totalSupply: string 
}

const App: Component = () => {
  const [result, setResult] = createSignal<string|ResultType>()

  function getAddressData (address: string): void {
    if (address=="") {
      setResult("empty")
      return
    }

    if (address=="1") {
      setResult("error")
      return
    }

    const result = {
        token: address,
        name: "t1",
        symbol: "t1",
        totalSupply: "100" 
    }    
    setResult(result)
  }
  
  return (
    <div class='h-screen bg-gray-800 flex flex-col items-center justify-center'>
      <div class='sm:w-8/12 md:w-3/5 lg:w-1/3'>
        <SearchBar getAddressData={getAddressData}/>
        <Show when={result() === 'empty'}>
          <div class="mt-6 py-3 px-4 sm:py-4 sm:px-5 sm:text-lg md:text-xl bg-slate-200 text-slate-800 rounded-lg">
              <h1>please enter a token addr</h1>
          </div>
        </Show>
        <Show when={result() === 'error'}>
          <div class="mt-6 py-3 px-4 sm:py-4 sm:px-5 sm:text-lg md:text-xl bg-slate-200 text-slate-800 rounded-lg">
              <h1>No data return, please check your token addr</h1>
          </div>
        </Show>
        <Show when={typeof result() != 'string'}>
          <ResultCard result={result as ()=> ResultType}/>
        </Show>
      </div>
    </div>
  );
};

export default App;
