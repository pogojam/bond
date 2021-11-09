import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { BarStyles } from "./bar.styles";

export const Bar = () => {
  return (
    <BarStyles>
      <WalletDisconnectButton />
      <WalletMultiButton />
    </BarStyles>
  );
};
