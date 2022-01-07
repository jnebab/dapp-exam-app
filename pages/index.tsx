import type { NextPage } from "next";
import { SwitchHorizontalIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import useBalance from "../hooks/useBalance";
import WalletDetails from "../components/WalletDetails";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { InjectedConnector } from "@web3-react/injected-connector";
import Button from "../components/Button";

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 2000;
  return library;
}

const App: NextPage = () => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Home />
  </Web3ReactProvider>
);

const Home: NextPage = () => {
  const [nepBalance, setNEPBalance] = useState<string>("");
  const [busdBalance, setBUSDBalance] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [walletSignature, setWalletSignature] = useState<string>();
  const {
    active,
    activate,
    chainId,
    library,
    account,
    deactivate,
  }: Web3ReactContextInterface = useWeb3React<Web3Provider>();
  const balance: string | null = useBalance();

  function handleNEPInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const nepValue: number = Number(e.target.value);
    const busdValue: number = nepValue * 3;

    setNEPBalance(nepValue.toString());
    setBUSDBalance(busdValue.toFixed(2));
  }

  function handleBUSDInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const busdValue: number = Number(e.target.value);
    const nepValue: number = busdValue / 3;

    setNEPBalance(nepValue.toFixed(2));
    setBUSDBalance(busdValue.toString());
  }

  function handleModal() {
    setIsOpen((old) => !old);
  }

  async function handleConnectToMetamask() {
    await activate(new InjectedConnector({}));
  }

  async function handleDisconnectFromMetamask() {
    deactivate();
    setWalletSignature("");
    handleModal();
  }

  useEffect(() => {
    async function signIn() {
      if (active && library) {
        const message = `Logging in at ${new Date().toISOString()}`;

        const signature = await library
          .getSigner(account)
          .signMessage(message)
          .catch((err: any) => console.error(err));
        setWalletSignature(signature);
      }
    }
    signIn();
  }, [active, library]);

  return (
    <div className="flex flex-col min-h-screen min-w-screen">
      <h1 className="mb-12 w-full">Neptune Mutual</h1>

      <div className="w-[480px] min-w-sm mx-auto p-8 shadow-sm rounded-md border-neutral-200 border">
        <h2 className="mb-4">Crypto Converter</h2>

        <form className="w-full mb-4">
          <div className="flex flex-col text-left">
            <label>NEP</label>
            <input
              type="text"
              value={nepBalance}
              onChange={handleNEPInputChange}
              placeholder="0.00"
              className="border border-neutral-200 rounded-md"
            />
          </div>
          <div className="w-full flex justify-center text-neutral-400 my-6">
            <SwitchHorizontalIcon className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-left">
            <label>BUSD</label>
            <input
              type="text"
              value={busdBalance}
              onChange={handleBUSDInputChange}
              placeholder="0.00"
              className="border border-neutral-200 rounded-md"
            />
          </div>
        </form>
        <div>
          <Button
            label="Check Wallet Details"
            classNames="text-blue-500 text-sm"
            type="link"
            onClick={handleModal}
          />
        </div>
      </div>

      {/* Wallet Details Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Wallet Details
                </Dialog.Title>
                <div className="my-4">
                  {active && walletSignature ? (
                    <WalletDetails
                      balance={balance}
                      chainId={chainId}
                      account={account}
                    />
                  ) : (
                    <p className="text-lg text-red-400 my-8">
                      Wallet not connected. Please click 'Connect' button below.
                    </p>
                  )}
                </div>

                <div className="mt-4">
                  {active && walletSignature ? (
                    <Button
                      label="Disconnect"
                      onClick={handleDisconnectFromMetamask}
                      type="error"
                    />
                  ) : (
                    <div className="flex space-between">
                      <Button
                        label="Connect"
                        onClick={handleConnectToMetamask}
                        type="primary"
                        classNames="mr-2"
                      />
                      <Button
                        label="Connect"
                        onClick={handleDisconnectFromMetamask}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default App;
