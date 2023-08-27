import { Link, useLocation } from "react-router-dom"

const Results = () => {

    const location = useLocation()
    const calculatedData = location.state

    const containerStyle = 'flex items-center justify-between my-3'
  return (
      <div className='px-6 text-sm  md:w-1/2'>
          <div className={containerStyle}>
              <h4>Gross Pay</h4>
              <p>{ calculatedData.grossPay}</p>
          </div>
          <p>Deductions:</p>

          <div className={containerStyle}>
              <p> PAYE</p>
              <p>{ calculatedData.PAYE}</p>
          </div>

          <div className={containerStyle}>
              <p> NSSF (Tier I)</p>
              <p>{ calculatedData.NSSF1}</p>
          </div>

          <div className={containerStyle}>
              <p> NSSF (Tier II)</p>
              <p>{ calculatedData.NSSF2}	</p>
          </div>

          <div className={containerStyle}>
              <p> NHIF</p>
              <p>{ calculatedData.NHIF}</p>
          </div>

          <div className={containerStyle}>
              <p> Pension</p>
              <p>{ calculatedData.pension}</p>
          </div>

          <div className={containerStyle}>
              <p>Rent</p>
              <p>{ calculatedData.rentToEmployee}</p>
          </div>

          <div className={containerStyle}>
              <strong>Total Deductions</strong>
              <strong>{ calculatedData.totalDeductions}</strong>
          </div>

          <div className={containerStyle}>
              <strong>NetPay</strong>
              <strong>{ calculatedData.netPay}</strong>
          </div>

          <hr />

          {/* Paye Information */}
          <h2>PAYE Information</h2>

          <div className={containerStyle}>
              <p>Gross Pay</p>
              <p>{calculatedData.grossPay}</p>
          </div>

          <div className={containerStyle}>
              <p>Non-Cash Benefits</p>
              <p>{calculatedData.totalNonCashBenefits}</p>
          </div>

          <div className={containerStyle}>
              <p>Housing benefits</p>
              <p>{calculatedData.houseBenefit}</p>
          </div>

          <div className={containerStyle}>
              <p>Allowable Deductions</p>
              <p>{ calculatedData.allowableDeductions}</p>
          </div>

          <div className={containerStyle}>
              <strong>Taxable pay</strong>
              <strong>{ calculatedData.taxablePay}</strong>
          </div>

          <div className='flex gap-4 '>
              <button className='px-3 py-1 text-white bg-blue-600 rounded-md ' >print</button>
              <Link to='/' className='px-3 py-1 text-white bg-blue-600 rounded-md '>New calculation</Link>
          </div>

    </div>
  )
}

export default Results
