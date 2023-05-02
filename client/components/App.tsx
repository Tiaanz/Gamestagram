import Home from './Home'
import Nav from './Navbar/Nav'
import Events from './Events/Events'
import Notice from './subcomponents/Notice'
import Boardgames from './Games/Boardgames'
import Footer from './Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import EventDetail from './Events/EventDetail'
import MyEvents from './Users/MyEvents'
import PageTransition from './subcomponents/PageTransition'
import Register from './Users/Register'
import { Addevent } from './Events/AddEvent'
import EditEvent from './Events/EditEvent'
import UserDetails from './Users/UserDetails'

function App() {
  return (
    <>
      <div>
        <Nav />
        <Notice />
        <Routes>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/events/:id"
            element={
              <PageTransition>
                <EventDetail />
              </PageTransition>
            }
          />
          <Route
            path="/boardgames"
            element={
              <PageTransition>
                <Boardgames />
              </PageTransition>
            }
          />
          <Route
            path="/events"
            element={
              <PageTransition>
                <Events />
              </PageTransition>
            }
          />
          <Route path="/profile" element={<Register />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/events/add" element={<Addevent />} />
          <Route
            path="/events/:id/edit"
            element={
              <PageTransition>
                <EditEvent />
              </PageTransition>
            }
          />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
        <Footer />
      </div>
      <div className="py-10"></div>
    </>
  )
}

export default App
