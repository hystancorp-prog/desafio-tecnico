function UserProfile({ user }) {
  const inicial = (user.name || user.login).charAt(0).toUpperCase()

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-5 mb-5">
      {user.avatar_url
        ? <img src={user.avatar_url} alt="avatar" className="w-16 h-16 rounded-full border border-slate-100" />
        : <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold">{inicial}</div>
      }
      <div className="flex-1">
        <h2 className="text-base font-semibold text-slate-900">{user.name || user.login}</h2>
        {user.bio && <p className="text-sm text-slate-500 mt-0.5">{user.bio}</p>}
        <div className="flex gap-4 mt-2">
          <span className="text-xs text-slate-400"><span className="font-semibold text-slate-700">{user.followers}</span> seguidores</span>
          <span className="text-xs text-slate-400"><span className="font-semibold text-slate-700">{user.following}</span> seguindo</span>
          {user.email && <span className="text-xs text-slate-400">{user.email}</span>}
        </div>
      </div>
    </div>
  )
}

export default UserProfile