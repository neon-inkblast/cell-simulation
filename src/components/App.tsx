import styled from "styled-components";
import { CellGridProvider } from "../context/CellGridContext";
import CellGrid from "./CellGrid";
import Controls from "./Controls";

const AppWrapper = styled.div`
  background: #333;
  color: white;
  min-height: 100vh;
`;
const AppHeader = styled.h1`
  text-align: center;
`;

const App: React.FC = () => {
  return (
    <AppWrapper>
      <AppHeader>Cell Simulation - Belong Tech Test</AppHeader>
      <CellGridProvider>
        <Controls />
        <CellGrid />
      </CellGridProvider>
    </AppWrapper>
  );
};

export default App;
