import React from "react";
import { Routes, Route } from "react-router-dom";

// Importaciones correctas:
import Desktop1 from "./pages/views/desktop1";
import Desktop2 from "./pages/views/desktop2";
import Desktop3 from "./pages/views/desktop3";
import Desktop4 from "./pages/views/desktop4";
import Desktop5 from "./pages/views/desktop5";
import Desktop6 from "./pages/views/desktop6";
import Desktop7 from "./pages/views/desktop7";
import Desktop8 from "./pages/views/desktop8";
import Desktop9 from "./pages/views/desktop9";
import Desktop10 from "./pages/views/desktop10";
import Desktop11 from "./pages/views/desktop11";
import Desktop12 from "./pages/views/desktop12";
import Desktop13 from "./pages/views/desktop13";
import Desktop14 from "./pages/views/desktop14";
import Desktop15 from "./pages/views/desktop15";
import Desktop16 from "./pages/views/desktop16";
import Desktop17 from "./pages/views/desktop17";
import Desktop18 from "./pages/views/desktop18";
import Desktop19 from "./pages/views/desktop19";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Desktop1 />} />  {/* ✅ Ahora inicia en Desktop1 */}
      <Route path="/desktop2" element={<Desktop2 />} />
      <Route path="/desktop3" element={<Desktop3 />} />
      <Route path="/desktop4" element={<Desktop4 />} />
      <Route path="/desktop5" element={<Desktop5 />} />
      <Route path="/desktop6" element={<Desktop6 />} />
      <Route path="/desktop7" element={<Desktop7 />} />
      <Route path="/desktop8" element={<Desktop8 />} />
      <Route path="/desktop9" element={<Desktop9 />} />
      <Route path="/desktop10" element={<Desktop10 />} />
      <Route path="/desktop11" element={<Desktop11 />} />
      <Route path="/desktop12" element={<Desktop12 />} />
      <Route path="/desktop13" element={<Desktop13 />} />
      <Route path="/desktop14" element={<Desktop14 />} />
      <Route path="/desktop15" element={<Desktop15 />} />
      <Route path="/desktop16" element={<Desktop16 />} />
      <Route path="/desktop17" element={<Desktop17 />} />
      <Route path="/desktop18" element={<Desktop18 />} />
      <Route path="/desktop19" element={<Desktop19 />} />
    </Routes>
  );
}

export default App;
