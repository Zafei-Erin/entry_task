import { ResultType } from "../App"

type PropsType = {
    rawResult: ResultType
}


export default function ResultCard(props: PropsType) {
    console.log(props.rawResult);
    const result = {
        name: props.rawResult.name,
        symbol: props.rawResult.symbol,
        totalSupply: (Number(props.rawResult.total_supply)/(Math.pow(10, props.rawResult.decimals))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    

    return(
        <div class="w-full mt-6 py-3 px-4 sm:py-4 sm:px-5 bg-gray-800 rounded-lg">
            <span class="text-gray-50 font-bold text-xl sm:text-2xl md:text-3xl">{result.name}</span>
            <div class="mt-4 sm:text-lg md:text-xl">
                <h1 class="text-slate-400 my-1">Symbol: 
                    <span class="ml-1 text-gray-50 font-semibold">{result.symbol}</span> 
                </h1>
                <h1 class="text-slate-400 my-1">Total supply: 
                    <span class="ml-1 text-gray-50 font-semibold">{result.totalSupply}</span> 
                </h1>
            </div>
        </div>
    )
}