interface WalletProps {
  balance: string | null;
  chainId: number | undefined;
  account: string | null | undefined;
}

export default function WalletDetails({
  balance,
  chainId,
  account,
}: WalletProps) {
  return (
    <div className="w-full p-4 text-center">
      <div className="my-2 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-gray-600 uppercase">
            Key
          </span>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-600 uppercase">
            Value
          </span>
        </div>
      </div>
      <WalletItem
        name="Account"
        value={`${account?.substr(0, 4)}...${account?.substr(-4, 4)}`}
      />
      <WalletItem name="Chain ID" value={chainId} />
      <WalletItem name="Balance" value={`Ξ ${balance}`} />
    </div>
  );
}

interface WalletItemProps {
  name: string;
  value: number | string | undefined;
}

function WalletItem({ name, value }: WalletItemProps) {
  return (
    <div className="py-3 my-2 flex items-center justify-between border-b border-gray-100">
      <div>
        <span>{name}</span>
      </div>
      <div>
        <span>{value}</span>
      </div>
    </div>
  );
}
