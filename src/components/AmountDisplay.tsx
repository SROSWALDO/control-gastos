type AmountDisplayProps = {
    label?: string
    amount: number
}

export default function AmountDisplay({ label, amount } : AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
       
        {label && `${label}: ` }
        <span className="font-black text-black">${amount}.00</span>
    </p>
  )
}
