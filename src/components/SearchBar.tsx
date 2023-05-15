import { createSignal } from "solid-js";
import { ResultType } from "../App";

type PropsType = {
    getAddressData: (value: string) => void
}

let val: HTMLInputElement

export default function SearchBar(props: PropsType) {
    const {getAddressData} = props
  
    return (
      <div class="w-full flex items-center justify-center text-sm sm:text-lg md:text-xl text-white">
        <input 
          ref={val}
          class='w-1/2 grow bg-transparent py-3 px-4 outline-none mr-3 sm:py-4 sm:px-5 focus:placeholder-white border-b-2 border-transparent focus:border-white'
          type="text" 
          placeholder='Input a token address'
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getAddressData(e.currentTarget.value.trim());
              val.value=""
            }
          }}
        />

        <button 
          class="grow-0 px-2 my-2 border-2 border-slate-200 rounded-lg"
          onClick={() => {
              getAddressData(val.value.trim())
              val.value=""
            }}
          >
            Search
          </button>
     </div>
    )
}