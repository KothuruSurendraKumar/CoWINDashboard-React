// Write your code here
// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccineAgeDetails} = props
  return (
    <div className="vaccination-by-gender-container">
      <h1 className="vaccination-by-gender-heading">Vaccination by Age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={vaccineAgeDetails}
          startAngle={0}
          endAngle={360}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="19-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizantal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}
export default VaccinationByGender
