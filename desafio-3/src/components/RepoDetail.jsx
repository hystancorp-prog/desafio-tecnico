import { useLocation, useNavigate } from "react-router-dom"

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  "C++": "#f34b7d",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dockerfile: "#384d54",
}

function RepoDetail() {
  const { state: repo } = useLocation()
  const navigate = useNavigate()

  if (!repo) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <p className="text-slate-400 text-sm">Repositório não encontrado.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 transition mb-6"
        >
          ← Voltar
        </button>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h1 className="text-xl font-semibold text-slate-900">{repo.name}</h1>
          <p className="text-sm text-slate-500 mt-2">{repo.description || "Sem descrição"}</p>
          <div className="flex gap-5 mt-5 pt-5 border-t border-slate-100">
            <div className="text-center">
              <p className="text-lg font-semibold text-slate-800">{repo.stargazers_count.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-0.5">Stars</p>
            </div>
            {repo.language && (
              <div className="text-center">
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: LANG_COLORS[repo.language] || "#94a3b8" }} />
                  <p className="text-sm font-semibold text-slate-800">{repo.language}</p>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Linguagem</p>
              </div>
            )}
          </div>
          
           <a href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition"
          >
            Ver no GitHub →
          </a>
        </div>
      </div>
    </div>
  )
}

export default RepoDetail