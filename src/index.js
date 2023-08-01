import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AppContainer } from 'react-hot-loader'

import "./styles.css";


// const render = Component => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//     document.getElementById('app')
//   )
// }

// render(App)

// if (module.hot) {
//   // module.hot.accept();
//   console.log("module.hot.accept");
//   module.hot.accept('./App', () => { render(App) })
// } else {
//   console.log("no module.hot.accept");
// }

const renderHot = Component => {
  const container = document.getElementById("app");
  const root = createRoot(container)
  root.render(<AppContainer><Component /></AppContainer>);
}

const container = document.getElementById("app");
const root = createRoot(container)
root.render(<AppContainer><App /></AppContainer>);

// const renderHot = Component => {
//   const container = document.getElementById("app");
//   const root = createRoot(container)
//   root.render(<><Component /></>);
// }

// const container = document.getElementById("app");
// const root = createRoot(container)
// root.render(<><App /></>);


if (module.hot) {
  // module.hot.accept(); 
  console.log("module.hot.accept");
  module.hot.accept('./App', () => { renderHot(App) })
} else {
  console.log("no module.hot.accept");
}