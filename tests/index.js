//const { response } = require('express')
const express = require('express') //import express library. it is like import http from 'http' in React, but Node doesn't support this module definition
const app = express() //function that creates the express app stored in app variable
const cors = require('cors')

app.use(express.json()) // easily access the data that needs to be sent in the body of the request (POST request) in JSON format
// Without the json-parser, the body property would be undefined. 
// The json-parser takes the JSON data of a request, transforms it into a JavaScript object 
// and then attaches it to the body property of the request object before the route handler is called.
app.use(cors())


let notes = [
	{
		id: 1,
		content: "HTML is easy",
		date: "2022-05-30T17:30:31.098Z",
		important: true
	},
	{
		id: 2,
		content: "Browser can execute only Javascript",
		date: "2022-05-30T18:39:34.091Z",
		important: false
	},
	{
		id: 3,
		content: "GET and POST are the most important methods of HTTP protocol",
		date: "2022-05-30T19:20:14.298Z",
		important: true
	}
]

// two routes to the app defined below

// first route defines an event handler (which accepts two parameters) that is used to handle HTTP GET requests made to the application's / root
// request parameter contains all the info o fthe http request
// response parameter defines how the request should be responded to
// request is answered by using send method of the response object
// server responds by sending Hello world string ppassed to the send method
// no need to specifiy content-type, because it is a string, express automatically sets its value to text/html
app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

// second route defines an event handler that handles HTTP GET requests made to the notes path of the application
// no need to specifiy content-type, because it is an array passed to json method as a JSON-formatted string, express automatically sets its value to application/json
app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/notes/:id', (request, response) => { // colon specifiies something that is an arbitrary string
	const id = Number(request.params.id) // parameter id can be accessed via request object
	const note = notes.find(note => note.id === id)

	if (note){
		response.json(note)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter(note => note.id !== id)

	response.status(204).end()
})

generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0
	return maxId
}

app.post('/api/notes', (request, response) => {
	const body = request.body

	if(!body.content){
		return response.status(400).json({
			error: 'content missing'
		})
	}

	const note = {
		content: body.content,
		important: body.important || false,
		date: new Date(),
		id: generateId()
	}

	notes = notes.concat(note)

	console.log(note)
	response.json(note)
})

/* const app = http.createServer((request, response) => { // createServer is http's module; make a request to the server's address localhost:3001
	response.writeHead(200, { 'Content-Type': 'application/json' }) // respond with 200 status code and content-type header
	response.end(JSON.stringify(notes)) // content of the site to be returned
}) */

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { // http server that was assigned to variable app will listen to HTTP requests sent to port 3001
	console.log(`Server running on port ${PORT}`)
})