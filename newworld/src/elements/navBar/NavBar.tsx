import { useNavigate } from 'react-router-dom';
import type { AccountInfo } from "@azure/msal-browser";

export default function NavBar({ accounts, handleLogout, handleLogin }: { accounts: AccountInfo[], handleLogout: () => void, handleLogin: () => void }) {

    const navigate = useNavigate()


    return (
        <div className="flex flex-col">

            {accounts.length > 0 ? (
                <>
                    <span className="text-center text-black">{accounts[0].name}</span>
                    <button className="btn btn-primary m-1" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                    <button className="btn btn-primary m-1" onClick={handleLogin}>Login with Azure</button>
            )
            }

            <button className="btn btn-primary m-1" type="button" onClick={() => navigate('/home')}>Home</button>
            <button className="btn btn-primary m-1" type="button" onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button className="btn btn-primary m-1" type="button" onClick={() => navigate('/customer')}>Customer</button>
            <button className="btn btn-primary m-1" type="button" onClick={() => navigate('/plain')}>Blank</button>

        </div>
    )
}