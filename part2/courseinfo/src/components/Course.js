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
    //const lista = course.parts.map(part => part.exercises)
    //const numbers = lista.reduce(Summa)
    //total of {numbers} exercises
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

  export default Course
