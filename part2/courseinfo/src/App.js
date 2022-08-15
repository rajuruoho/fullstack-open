const Part = ({ part }) => {
  return (
    <tr>
      <td>{part.name}</td>
      <td>{part.exercises}</td>
    </tr>
  )
}

const Summa = (first, second) => {
  return first+second
}

const Course = ({course}) => {
  const lista = course.parts.map(part => part.exercises)
  const numbers = lista.reduce(Summa)
  return (
    <div>
      <h1>{course.name}</h1>
      <table>
        <tbody>
          {course.parts.map(part => <Part key={part.id} part={part}/>)}
        </tbody>
      </table>
      <p><b>total of {course.parts.map(part => part.exercises).reduce(Summa)} exercises </b></p>
    </div>
  )
}

      //<p>total of {(course.map(getExercises([],course.parts).reduce(Summa)} exercises</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App

