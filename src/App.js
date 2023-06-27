import skaBand from "./band-json/ska-band.json";
import kpopBand from "./band-json/kpop-band.json";
import punkBand from "./band-json/punk-band.json";
import { Container } from '@chakra-ui/react'

import BandForm from "./BandForm";

function App() {
  const bands = [skaBand, kpopBand, punkBand];
  return (
    <Container>
      <div className="App">
        <BandForm band={bands[0]} />
      </div>
    </Container>
  );
}

export default App;
