import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
	BrowserRouter as Router,
	Routes, Route, Link,
	Navigate, useParams, useNavigate,
	useMatch
} from "react-router-dom"
import { Table, Form, FormGroup, FormLabel, Button, Alert, Navbar, Nav } from 'react-bootstrap'

const Home = () => (
	<div> 
		<h2>TKTL notes app</h2>
		<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
	</div>
)

/* Note component receives all of the notes as props notes,
and it can access the url parameter (the id of the note to be displayed) with the useParams hook function of the React Router. */
const Note = ({ note }) => {
	return (
		<div>
			<h2>{note.content}</h2>
			<div>{note.user}</div>
			<div><strong>{note.important ? 'important' : ''}</strong></div>
		</div>
	)
}

const Notes = ({ notes }) => (
	<div>
		<h2>Notes</h2>
{/* 		<ul>
			{notes.map(note =>
				<li key={note.id}>
					<Link to={`/notes/${note.id}`}>{note.content}</Link>
				</li>
			)}
		</ul> */}
		<Table striped>
			<tbody>
				{notes.map(note =>
					<tr key={note.id}>
						<td>
							<Link to={`/notes/${note.id}`}>{note.content}</Link>
						</td>
						<td>
							{note.user}
						</td>
					</tr>
				)}
			</tbody>
		</Table>
	</div>
)

const Users = () => (
	<div>
		<h2>TKTL notes app</h2>
		<ul>
			<li>Matti Luukkainen</li>
			<li>Juha Tauriainen</li>
			<li>Arto Hellas</li>
		</ul>
	</div>
)

const Login = (props) => {
	// useNavigate is a hook function, it allows browser's url to be changed programmatically
	const navigate = useNavigate()

	const onSubmit = (event) => {
		event.preventDefault()
		props.onLogin('mluukkai')
		/* calling navigate('/') causes the browser's url to change to / and the application renders the corresponding component Home */
		navigate('/')
	}

	return (
		<div>
			<h2>login</h2>
			<Form onSubmit={onSubmit}>
				<FormGroup>
{/* 				<div>
						username: <input />
					</div> */}
					<FormLabel>username:</FormLabel>
					<Form.Control type="text" name="username"/>
{/* 				<div>
						password: <input type='password' />
					</div> */}
					<FormLabel>password:</FormLabel>
					<Form.Control type="password"/>
					{/* <button type="submit">login</button> */}
					<Button type="submit" variant='primary'>login</Button>
				</FormGroup>
			</Form>
		</div>
	)
}

const App = () => {

	const [notes, setNotes] = useState([
		{
			id: 1,
			content: 'HTML is easy',
			important: true,
			user: 'Matti Luukkainen'
		},
		{
			id: 2,
			content: 'Browser can execute only JavaScript',
			important: false,
			user: 'Matti Luukkainen'
		},
		{
			id: 3,
			content: 'Most important methods of HTTP-protocol are GET and POST',
			important: true,
			user: 'Arto Hellas'
		}
	])
	
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)
	
	const login = (user) => {
		setUser(user)
		setMessage(`welcome ${user}`)
		setTimeout(() => {
			setMessage(null)
		}, 5000)
	}

	const padding = {
		padding: 5
	}

	//useMatch hook allows to figure out the id of the note to be displayed in the App component
	const match = useMatch('/notes/:id')
	const note = match ? notes.find(note => note.id === Number(match.params.id)) : null

	return (
		<div className="container">
			{(message && 
				<Alert variant="success">
					{message}
				</Alert>
			)}
			{/* Routing, or the conditional rendering of components based on the url in the browser, 
			is used by placing components as children of the Router component */}
			<div>
				<Navbar collapseOnSelect expand="lg" bg="dark" varian="dark">
					<Navbar.Toggle aria-controls='responsive-navbar-nav'/>
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="#" as="span">
								<Link style={padding} to="/">home</Link>
							</Nav.Link>
							<Nav.Link href="#" as="span">
								<Link style={padding} to="/notes">notes</Link>
							</Nav.Link>
							<Nav.Link href="#" as="span">
								<Link style={padding} to="/users">users</Link>
							</Nav.Link>
							<Nav.Link href="#" as="span">
								{user
									? <em style={padding}>{user} logged in</em>
									: <Link style={padding} to="/login">login</Link>
								}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				{/* links modify the address bar with the help of the Link component */}
{/* 			<Link style={padding} to="/">home</Link>
				<Link style={padding} to="/notes">notes</Link>
				<Link style={padding} to="/users">users</Link>
				{user
					? <em>{user} logged in</em>
					: <Link style={padding} to="/login">login</Link>
				} */}
			</div>

			<Routes>
				{/* Components rendered based on the URL of the browser are defined with the help of the component Route */}
				<Route path="/notes/:id" element={<Note note={note} />} />
				<Route path="/notes" element={<Notes notes={notes} />} />
				{/* component Navigate redirects user to login view if user is not logged in */}
				<Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
				<Route path="/login" element={<Login onLogin={login} />} />
				<Route path="/" element={<Home />} />
			</Routes>

			<footer>
				<br />
				<em>Note app, Kata S</em>
			</footer>
		</div>
	)

}

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<App />
	</Router>
)