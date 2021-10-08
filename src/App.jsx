import { GlobalStyle } from './styles'
import React, { useState, useEffect } from 'react'
import BooksContainer from './components/BooksContainer'
import Header from './components/Header'
import Search from './components/Search'
import DetailPanel from './components/DetailPanel'
import { Transition } from 'react-transition-group'
import { filter } from 'lodash'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showPanel, setShowPanel] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState(books)

  console.log('This message will run every time the component renders')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://book-club-json.herokuapp.com/books`)

        const books = await response.json()
        setBooks(books)
        setFilteredBooks(books)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const pickBook = (book) => {
    setSelectedBook(book)
    setShowPanel(true)
  }

  const closePanel = () => {
    setSelectedBook(null)
    setShowPanel(false)
  }

  const filterBooks = (searchTerm) => {
    const stringSearch = (bookAttribute, text) => {
      return bookAttribute.toLowerCase().includes(text.toLowerCase())
    }

    if (!searchTerm) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(
        books.filter((book) => {
          const term = searchTerm.toLowerCase()
          return stringSearch(book.title, term) || stringSearch(book.author, term)
        })
      )
    }
  }

  const hasFiltered = filteredBooks.length !== books.length

  // console.log(selectedBook)

  return (
    <>
      <GlobalStyle />
      <Header>
        <Search filterBooks={filterBooks}></Search>
      </Header>
      <div>
        <BooksContainer
          books={filteredBooks}
          pickBook={pickBook}
          isPanelOpen={showPanel}
          title={hasFiltered ? 'Search Results' : 'All Books'}
        />
      </div>
      <Transition in={showPanel} timeout={300}>
        {(state) => <DetailPanel book={selectedBook} closePanel={closePanel} state={state} />}
      </Transition>
    </>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//          Op
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App
