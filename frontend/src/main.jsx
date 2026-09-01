import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthModalProvider } from './context/AuthModalContext.jsx'
import { BrowserRouter } from 'react-router-dom'


class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    this.setState({ info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '50px', backgroundColor: 'red', color: 'white', height: '100vh', fontSize: '24px', overflow: 'auto' }}>
          <h2>CRASH DETECTED</h2>
          <p>{this.state.error?.toString()}</p>
          <pre style={{ fontSize: '14px' }}>{this.state.info?.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalErrorBoundary>
      <GoogleOAuthProvider clientId="284926388402-7ogha07lo5gtvmdqsu9dj1csgo2pi4kp.apps.googleusercontent.com">
        <AuthModalProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </AuthModalProvider>
      </GoogleOAuthProvider>

    </GlobalErrorBoundary>
  </StrictMode>,
)
