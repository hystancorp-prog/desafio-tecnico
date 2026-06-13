function SearchBar({ onSearch, valorInicial }) {
  function handleClick(e) {
    const input = e.target.closest('div').querySelector('input')
    onSearch(input.value)
  }

  return (
    <div className="flex gap-2 mb-8">
      <input
        type="text"
        defaultValue={valorInicial}
        placeholder="Digite um usuário do GitHub..."
        className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white text-slate-800 outline-none focus:border-blue-400 transition"
        onKeyDown={(e) => e.key === 'Enter' && onSearch(e.target.value)}
      />
      <button
        onClick={handleClick}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition"
      >
        Buscar
      </button>
    </div>
  )
}

export default SearchBar