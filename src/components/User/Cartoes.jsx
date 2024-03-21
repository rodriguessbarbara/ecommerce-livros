function Cartoes() {
  return (
    <div>
      <div className="flex flex-col gap-2 border-b border-gray-200 py-4">
        <h3 className="text-2xl font-medium tracking-tight text-gray-800">Formas de Pagamento</h3>
        <h4 className="text-lg font-medium text-gray-600">Cartões</h4>
      </div>

      <div className="flex flex-col bg-gray-100 rounded-md px-10">
        <div className="border-b-2 border-b-gray-400 py-8 pb-6 cursor-pointer">
          <h4 className="font-semibold text-lg">Visa</h4>
          <p>Cartão com final 3210</p>
        </div>

        <div className="border-b-2 border-b-gray-400 pt-8 pb-6 cursor-pointer">
          <h4 className="font-semibold text-lg">Mastercard</h4>
          <p>Cartão com final 0902</p>
        </div>

        <button className="pt-8 pb-6 text-blue-800">
          Adicione um método de pagamento
        </button>
      </div>
    </div>
  )
}

export default Cartoes