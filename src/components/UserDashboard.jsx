import { auth } from '../firebase'

export default function UserDashboard() {
  const user = auth.currentUser

  const myBids = [
    { title: '2024 CAN-AM MAVERICK X3', amount: 45000, status: 'Winning', endDate: 'Apr 23' },
    { title: '1986 HONDA ATC 250ES', amount: 1200, status: 'Outbid', endDate: 'Apr 25' },
  ]

  const watchlist = [
    { title: '2023 MASSIMO T-BOSS 1100D', currentBid: 1000, endDate: 'Apr 27' },
    { title: '2023 CAN-AM MAVERICK X3 MAX', currentBid: null, endDate: 'Coming Apr 25' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="border-b border-gray-200 pb-6 mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Account</p>
        <h1 className="mt-2 text-4xl font-black uppercase">My Dashboard</h1>
        <p className="mt-2 text-gray-500">{user?.email}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* My Bids */}
        <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold uppercase mb-6">My Bids</h2>
          {myBids.length === 0 ? (
            <p className="text-sm text-slate-500">You haven't placed any bids yet.</p>
          ) : (
            <div className="space-y-4">
              {myBids.map((b, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                  <div>
                    <p className="text-sm font-bold">{b.title}</p>
                    <p className="text-xs text-slate-500 mt-1">Ends {b.endDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black">${b.amount.toLocaleString()}</p>
                    <span className={`text-xs font-bold uppercase ${b.status === 'Winning' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Watchlist */}
        <div className="rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold uppercase mb-6">Watchlist</h2>
          {watchlist.length === 0 ? (
            <p className="text-sm text-slate-500">No saved auctions yet.</p>
          ) : (
            <div className="space-y-4">
              {watchlist.map((w, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                  <div>
                    <p className="text-sm font-bold">{w.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{w.endDate}</p>
                  </div>
                  <div className="text-right">
                    {w.currentBid ? (
                      <p className="text-sm font-black">${w.currentBid.toLocaleString()}</p>
                    ) : (
                      <span className="text-xs font-bold uppercase text-slate-400">Upcoming</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div className="mt-8 rounded-[32px] border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold uppercase mb-4">Account Settings</h2>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex justify-between py-3 border-b border-slate-100">
            <span className="font-semibold">Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-slate-100">
            <span className="font-semibold">Member Since</span>
            <span>{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : '—'}</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="font-semibold">Account Status</span>
            <span className="text-emerald-600 font-bold">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
