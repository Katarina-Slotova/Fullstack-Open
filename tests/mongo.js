const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2] // access the password from command line param

const url = `mongodb+srv://kata-notes:${password}@cluster0.v2gxje9.mongodb.net/notesApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({ //schema tells Mongoose how the note objects are to be stored in the database
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema) //the first "Note" parameter is the singular name of the model
// name of the collection will be the lowercased plural notes, 
// because the Mongoose convention is to automatically name collections as the plural (e.g. notes) 
// when the schema refers to them in the singular (e.g. Note)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

	// create a new note object with the help of Note model (model is a constructor function, i.e. a function that creates a JS object)
/*     const note = new Note({
      content: 'HTML is Easy',
      date: new Date(),
      important: true,
    })

	const nextNote = new Note({
		content: "second note here",
		date: new Date(),
		important: false
	})

	const lastNote = new Note({
		content: "this is a very important note",
		date: new Date(),
		important: true
	}) */

	return Note.insertMany([
		{content: 'HTML is Easy', date: new Date(), important: true},
		{content: "second note here", date: new Date(), important: false},
		{content: "this is a very important note", date: new Date(), important: true}
	])

	// save the object to the db
    //return note.save()
/* 		Note.find({}).then(result => {
		result.forEach(note => {
			console.log(note)
		})
		mongoose.connection.close()
		}) */
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close() // close db connection in order to finish program's execution
  })
  .catch((err) => console.log(err))