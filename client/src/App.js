import React from 'react'
import Header from './components/Header/Header'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PageHome from './pages/PageHome'
import PageDetail from './pages/PageDetail'

import Auth from './components/Auth/Auth'

const App = () => {
    const user = localStorage.getItem('profile')
    return (
        <Router>
            <Header/>
            <Container maxWidth='xl'>
                <Routes>
                    <Route path='/' exact element={<Navigate to={'/posts'} replace/>}/>
                    <Route path='/posts' exact element={<PageHome/>} />
                    <Route path='/posts/search' exact element={<PageHome/>}/>
                    <Route path='/posts/post/:id' exact element={<PageDetail/>}/>
                    <Route path='/auth' exact element={(user ? <Navigate to='/' replace/> : <Auth/>)}/>
                </Routes>
            </Container>
        </Router>
    )
}

export default App