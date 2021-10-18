import './App.css';
import { getPhantomWallet, getLedgerWallet, getBloctoWallet } from '@solana/wallet-adapter-wallets';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import Wallet from './components/Wallet'; 
import toast, { Toaster } from 'react-hot-toast';


const wallets = [
    /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
    getPhantomWallet(), 
    getLedgerWallet(),
    getBloctoWallet(),
];

/* wallet configuration as specified here: https://github.com/solana-labs/wallet-adapter#setup */
const AppWithProvider = () => {

    function onWalletError(error) {
        toast.error(error.message ? `${error.name}: ${error.message}` : error.name);
    }

    return (
            <ConnectionProvider endpoint="http://127.0.0.1:8899">
                <WalletProvider wallets={wallets} onError={onWalletError} autoConnect>
                    <WalletModalProvider>
                        <Wallet />
                    </WalletModalProvider>
            </WalletProvider>
            <Toaster position="bottom-left"></Toaster>
            </ConnectionProvider>
    )
}

export default AppWithProvider;