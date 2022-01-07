import { formatEther } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export default function useBalance() {
  const { account, library } = useWeb3React();
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (account) {
      library.getBalance(account).then((val: number) => setBalance(val));
    }
  });

  return balance ? formatEther(balance) : null;
}
