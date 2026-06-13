import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchBar from "./components/SearchBar"
import UserProfile from "./components/UserProfile"
import RepoList from "./components/RepoList"
import RepoDetail from "./components/RepoDetail"

function Home() {
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])
  const [ordem, setOrdem] = useState("stars_desc")
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const [ultimoUsername, setUltimoUsername] = useState(() => sessionStorage.getItem("username") || "")

  useEffect(() => {
    const username = sessionStorage.getItem("username")
    if (username) buscarUsuario(username)
  }, [])

  async function buscarUsuario(username) {
    if (!username.trim()) return
    setUltimoUsername(username)
    sessionStorage.setItem("username", username)
    setLoading(true)
    setErro("")
    setUser(null)
    setRepos([])

    try {
      const resUser = await fetch(`https://api.github.com/users/${username}`)
      if (!resUser.ok) throw new Error("Usuário não encontrado")
      const dataUser = await resUser.json()
      const resRepos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      const dataRepos = await resRepos.json()
      setUser(dataUser)
      setRepos(dataRepos)
    } catch (e) {
      setErro(e.message)
    } finally {
      setLoading(false)
    }
  }

  function ordenarRepos() {
    const sorted = [...repos]
    if (ordem === "stars_desc") sorted.sort((a, b) => b.stargazers_count - a.stargazers_count)
    if (ordem === "stars_asc") sorted.sort((a, b) => a.stargazers_count - b.stargazers_count)
    if (ordem === "name") sorted.sort((a, b) => a.name.localeCompare(b.name))
    if (ordem === "updated") sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    return sorted
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">GitHub Explorer</h1>
          <p className="text-sm text-slate-400 mt-1">Busque perfis e repositórios do GitHub</p>
        </div>
        <SearchBar onSearch={buscarUsuario} valorInicial={ultimoUsername} />
        {loading && <p className="text-center text-slate-400 text-sm">Carregando...</p>}
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 text-center mb-4">
            {erro}
          </div>
        )}
        {user && <UserProfile user={user} />}
        {repos.length > 0 && <RepoList repos={ordenarRepos()} ordem={ordem} setOrdem={setOrdem} />}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo" element={<RepoDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App