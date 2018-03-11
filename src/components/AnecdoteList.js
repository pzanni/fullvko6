import React from 'react'
import anecdoteReducer from '../reducers/anecdoteReducer'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setFilter } from '../reducers/filterReducer'

class AnecdoteList extends React.Component {

  constructor() {
    super()
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleFilterChange(e) {
    this.context.store.dispatch(setFilter(e.target.value))
  }

  render() {
    const anecdotes = this.context.store.getState().anecdotes
    const anecdotesToShow = anecdotes.filter(a => a.content.includes(this.context.store.getState().filter))

    return (
      <div>
        <h2>Anecdotes</h2>
        <input
          type="text"
          value={this.context.store.getState().filter}
          onChange={this.handleFilterChange}
        />
        {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} context={this.context} />
        )}
      </div>
    )
  }
}

const Anecdote = ({ anecdote, context }) => {

  const handleVote = (e) => {
    context.store.dispatch(voteAnecdote(anecdote))
    context.store.dispatch(setNotification('you voted for ' + anecdote.content))
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>
          vote
        </button>
      </div>
    </div>
  )
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
