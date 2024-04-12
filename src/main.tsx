import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ParameterProvider } from './contexts/ParameterContext.tsx'
import { ImageProvider } from './contexts/ImageContext.tsx'
import { VideoProvider } from './contexts/VideoContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { FileProvider } from './contexts/FileContext.tsx'
import { AlertProvider } from './contexts/AlertContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <AuthProvider>
         <FileProvider>
            <ParameterProvider>
               <ImageProvider>
                  <VideoProvider>
                     <AlertProvider>
                        <App />
                     </AlertProvider>
                  </VideoProvider>
               </ImageProvider>
            </ParameterProvider>
         </FileProvider>
      </AuthProvider>
   </React.StrictMode>,
)