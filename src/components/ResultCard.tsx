import { ResultType } from "../App"

type PropsType = {
    result:() => ResultType|undefined
}


export default function ResultCard(props: PropsType) {
    const {result} = props

    return(
        <div class="mt-6 py-3 px-4 sm:py-4 sm:px-5 sm:text-lg md:text-xl bg-slate-200 rounded-lg">
            <h1 class="text-slate-500">Name: <span class="text-slate-800 font-semibold">{result()?.name}</span> </h1>
            <h1 class="text-slate-500">Symbol: <span class="text-slate-800 font-semibold">{result()?.symbol}</span> </h1>
            <h1 class="text-slate-500">Total supply: <span class="text-slate-800 font-semibold">{result()?.totalSupply}</span> </h1>
        </div>
    )
}