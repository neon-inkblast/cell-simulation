import styled from "styled-components";
import CellGrid from "./CellGrid";

const AppHeader = styled.h1`
  text-align: center;
`;
const AppSubHeader = styled.h2`
  text-align: center;
`;

const App: React.FC = () => {
  return (
    <div>
      <AppHeader>Cell Simulation</AppHeader>
      <AppSubHeader>Belong Tech Test</AppSubHeader>
      <CellGrid></CellGrid>
    </div>
  );
};

export default App;
