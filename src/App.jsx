import { RouterProvider } from 'react-router-dom'
import { router } from './router'

/**
 * 앱 진입점.
 * 라우터만 연결하고, 실제 화면 골격은 AppLayout이 담당한다.
 */
function App() {
  return <RouterProvider router={router} />
}

export default App
