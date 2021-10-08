import React, { useRef } from 'react'
import { Panel, P, Em, CloseWrapper, BG } from './styles'
import { Close } from '../../styles'
import Book from '../Book'
import { useEffect } from 'react/cjs/react.development'

const DetailPanel = ({ book, closePanel, state }) => {
  const panelEl = useRef(null)
  const prevBook = useRef(null)

  useEffect(() => {
    if (prevBook.current !== book) {
      panelEl.current.scrollTop = 0
    }

    prevBook.current = book
  }, [book, prevBook])

  return (
    <>
      <BG $state={state} onClick={closePanel} />
      <Panel $state={state}>
        <CloseWrapper ref={panelEl} $state={state} onClick={closePanel}>
          <Close />
        </CloseWrapper>
        {book && (
          <>
            <Book book={book} isLarge={true} />
            <P>{book.description}</P>
            <P>
              <Em>Published in {book.published}</Em>
            </P>
          </>
        )}
      </Panel>
    </>
  )
}

export default DetailPanel
