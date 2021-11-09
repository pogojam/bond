import { CircularProgress } from "@material-ui/core";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@solana/wallet-adapter-react-ui/lib/Button";
import { useState } from "react";
import { Box } from "../../components/box/box";
import { DashButton } from "../../components/button/button";
import { TokenInput } from "../../components/input/input";
import { useStore } from "../../models/model";
import { TroveStyles } from "./trove.styles";

const DebtTracker = () => {
  const {
    TroveStore: { activeTrove },
  } = useStore();

  // const { connection } = useConnection();
  // const wallet = useWallet();
  // useEffect(() => {
  //   console.log(wallet);
  //   debugger;
  // }, [wallet.connected]);
  if (!activeTrove) return <p>No Active trove found.</p>;
  return (
    <Box className="circle-graph">
      <CircularProgress
        className="circle"
        variant="determinate"
        value={activeTrove.debt}
        size={100}
      />
      <span className="circle-value">{`${activeTrove.debt}%`}</span>
    </Box>
  );
};

export const TroveContainer = () => {
  const [token, setToken] = useState("SOL");
  const {
    TroveStore: { activeTrove, openTrove },
  } = useStore();
  const wallet = useWallet();
  return (
    <TroveStyles>
      {wallet.connected && activeTrove && (
        <Box>
          <DebtTracker />
          <Box className="trove-wrapper">
            <Box className="trove-controls-wrapper">
              <TokenInput label="Deposit" />
              <TokenInput label="Borrow" />
              <DashButton>Confirm</DashButton>
            </Box>
          </Box>
        </Box>
      )}
      {wallet.connected && !activeTrove && (
        <Button onClick={() => openTrove(token)}>Open Trove</Button>
      )}
      {!wallet.connected && <a>Please connect your wallet.</a>}
    </TroveStyles>
  );
};
