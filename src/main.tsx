import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ParameterProvider } from './contexts/ParameterContext.tsx'
import { ImageProvider } from './contexts/ImageContext.tsx'
import { VideoProvider } from './contexts/VideoContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <ParameterProvider>
         <ImageProvider>
            <VideoProvider>
               <App />
            </VideoProvider>
         </ImageProvider>
      </ParameterProvider>
   </React.StrictMode>,
)
