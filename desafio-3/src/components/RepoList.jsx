import { useNavigate } from "react-router-dom"

// Mapeamento das cores por linguagem, seguindo o padrão visual do GitHub
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

function RepoList({ repos, ordem, setOrdem }) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-slate-800">
          Repositórios <span className="text-slate-400 font-normal">({repos.length})</span>
        </h3>
        <select
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
          className="text-xs text-slate-500 border border-slate-200 rounded-lg px-2 py-1.5 bg-white outline-none focus:border-blue-400 transition"
        >
          <option value="stars_desc">Stars (maior)</option>
          <option value="stars_asc">Stars (menor)</option>
          <option value="name">Nome</option>
          <option value="updated">Atualização</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        {repos.map(repo => (
          // Ao clicar, passa os dados do repo via state para evitar uma nova requisição na página de detalhes
          <div
            key={repo.id}
            onClick={() => navigate("/repo", { state: repo })}
            className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 cursor-pointer transition group"
          >
            <div className="flex items-start justify-between">
              <h4 className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">{repo.name}</h4>
              <span className="text-xs text-slate-400 ml-2 shrink-0">★ {repo.stargazers_count.toLocaleString()}</span>
            </div>
            {repo.description && (
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{repo.description}</p>
            )}
            {repo.language && (
              // Fallback para cinza caso a linguagem não esteja no mapeamento
              <div className="flex items-center gap-1.5 mt-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ background: LANG_COLORS[repo.language] || "#94a3b8" }}
                />
                <span className="text-xs text-slate-400">{repo.language}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RepoList