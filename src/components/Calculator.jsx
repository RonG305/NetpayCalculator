import { Result } from "postcss"
import { useState } from "react"
import { Link } from "react-router-dom"
import Results from "./Results"
import { useNavigate } from "react-router-dom"
const Calculator = () => {
    const inputStyles = "border outline-none rounded-md px-2 py-2"

    const navigate = useNavigate()

    const [grossPay, setGrossPay] = useState(0)
    const [nonCashBenefits, setNonCashBenefits] = useState(0)
    const [pension, setPension] = useState(0)
    const [otherDeductions, setOtherDeductions] = useState(0);
  
    const [housingProvidedByEmployee, setHousingProvidedByEmployee] = useState(false);
    const [housingType, setHousingType] = useState("ordinary");
    const [housingValue, setHousingValue] = useState(0);
    const [rentToEmployee, setRentToEmployee] = useState(0);
    const [ignoreBenefits, setIgnoreBenefits] = useState(false);
    const [nssfRate, setNSSFrate] = useState("old"); 
    const [nssfTier, setNSSFtier] = useState("");
    const [nssfTier2, setNSSFtier2] = useState(0);
    
    const [nssFTier1and2, setnssFTier1and2] = useState(0)
    




    const calculatePAYE = (taxableIncome) => {
        const taxBands = [
          { upperLimit: 24000, rate: 0.1 },
          { upperLimit: 32333.33, rate: 0.25 },
          { upperLimit: Infinity, rate: 0.3 },
        ];
      
        let totalTax = 0;
      
        for (const band of taxBands) {
          if (taxableIncome > band.upperLimit) {
            totalTax += band.upperLimit * band.rate;
            taxableIncome -= band.upperLimit;
          } else {
            totalTax += taxableIncome * band.rate;
            break;
          }
        }
      
        const personalRelief = 2400;
      
        const netPAYE = totalTax - personalRelief;
      
        return netPAYE;
    };
    
  

    
  

    const handleSubmit = (e) => {
        e.preventDefault();
    
    };
    
    const handleChange = (event) => {
        setGrossPay(event.target.value)

    }

    const handleCashBenefits = (event) => {
        setNonCashBenefits(event.target.value)
    }

    const handlePension = (event) => {
        setPension(event.target.value)
    }

    const handleOtherDeductions = (event) => {
        setOtherDeductions(event.target.value)
    }

    const handleHousingValue = (event) => {
        setHousingValue(event.target.value)
    }

    const handleRentToEmployee = (event) => {
        setRentToEmployee(event.target.value)
    }

    const handleTotalNssf = (event) => {
        setnssFTier1and2(event.target.value)
    }

    const handleHouseProvidedEmployee = (event) => {
        setHousingProvidedByEmployee(event.target.value)
    }

   

    
    const handleClick = () => {

        let NSSF1 = 360
        let NSSF2 = 720
        let OLD_NSSF = 200
        
        let NHIF
       
        
        if (grossPay <= 5999) {
            NHIF = 150
        } else if (grossPay <= 7999) {
            NHIF = 300
        } else if (grossPay <= 11999) {
            NHIF = 500
        } else if (grossPay <= 19999) {
            NHIF = 600
        } else if (grossPay <= 24999) {
            NHIF = 750
        } else if (grossPay <= 29999) {
            NHIF = 850
        } else if (grossPay <= 34999) {
            NHIF = 900
        } else if (grossPay <= 39999) {
            NHIF = 950
        } else if (grossPay <= 44999) {
            NHIF = 1000
        } else if (grossPay <= 49999) {
            NHIF = 1100
        } else if (grossPay <= 59999) {
            NHIF = 1200
        } else if (grossPay <= 69999) {
            NHIF = 1300
        } else if (grossPay <= 79999) {
            NHIF = 1400
        } else if (grossPay <= 89999) {
            NHIF = 1500
        } else if (grossPay <= 99999) {
            NHIF = 1600
        } else {
            NHIF = 1700
        }

        console.log(`NHIF ${NHIF}`) 


        let intialDeductions

        if (nssfTier === 'NSSF1') {
            intialDeductions = NSSF1 + NHIF;
        } else if (nssfTier === 'NSSF2') {
            intialDeductions = NSSF1 + NSSF2 + NHIF;
        } else if (nssfTier === 'old') {
            intialDeductions = NHIF + OLD_NSSF;
        }
       
        const PAYE = calculatePAYE(grossPay);
        const totalDeductions = Number(intialDeductions) + Number(pension) + Number(rentToEmployee) + Number(PAYE)
        const netPay = grossPay - totalDeductions
        const houseBenefit = grossPay * 0.15
        const allowableDeductions = 1080
        const taxablePay = Number(grossPay) + Number(houseBenefit) - Number(allowableDeductions)

        let totalNonCashBenefits = nonCashBenefits;
        
        if (ignoreBenefits && nonCashBenefits < 3000) {
            totalNonCashBenefits = 0;
        }
        


        const calculatedData = {
            grossPay,
            totalNonCashBenefits,
            totalDeductions,
            rentToEmployee,
            pension,
            PAYE,
            NSSF1,
            NSSF2,
            NHIF,
            netPay,
            houseBenefit,
            allowableDeductions,
            taxablePay
        }
        
        return navigate('../results', {state:calculatedData,  replace:true}) 
    }

   

  return (
      <div>
         
          <div>
              <form action="" className="text-sm " onSubmit={handleSubmit}>
                
                  <div className="grid-cols-2 md:grid">
                  <div className="gap-3 my-5 md:flex">
                  <p>Gross pay</p>
                  <input
                      type="number"
                      className={inputStyles}
                      name= 'grossPay'
                      value={grossPay}
                      onChange={handleChange}
                  />
              </div>

              <div className="flex gap-3 my-5 ">
                  <p>Non-Cash Benefits</p>
                  <input
                      type="number"
                      className={inputStyles}
                      name="nonCashBenefits"
                      value={nonCashBenefits}
                      onChange={handleCashBenefits}
                  />
              </div>

              <div className="flex gap-3 my-5 ">
                  <p>Pension Contribution</p>
                  <input
                      type="number"
                      className={inputStyles}
                      name='pension'
                      value={pension}
                      onChange={handlePension} 
                            
                        
                  />
              </div>


              <div className="flex gap-3 my-5 ">
                  <p>Other Allowable Deductions</p>
                  <input
                      type="number"
                      className={inputStyles}
                      name='otherDeductions'
                      value={otherDeductions}
                      onChange={handleOtherDeductions}
                  />
                </div>
                      
                </div>

                  <hr />

               

                  {/* Housed by employer */}

                
                  
                  <div className="flex gap-3 my-5 ">
                  <p>Housed by employee</p>
                  <input
                      type="checkbox"
                      className={inputStyles}
                      name='housingProvidedByEmployee'
                      value={housingProvidedByEmployee}
                      onChange={handleHouseProvidedEmployee}
                  />
                  </div>

                  <div className="">
                  <p className="my-4 font-bold ">Type of Housing</p>
                  <select name="" id="">
                          <option value="ordinary">ordinary</option>
                          <option value="farm">Farm</option>
                  </select>
                  

                  <div className="flex gap-3 my-5 ">
                  <p>value of Housing</p>
                  <input
                      type="number"
                      className={inputStyles}
                      name='housingValue'
                      value={housingValue}
                      onChange={handleHousingValue}
                  />
              </div>
                   
                  
              <div className="gap-3 my-5 md:flex">
                  <p>Rent To Employee</p>
                  <input
                      type="number"
                      className={inputStyles}
                      name='rentToEmployee'
                      value={rentToEmployee}
                      onChange={handleRentToEmployee}
                  />
              </div>
                  
                      
                  </div>
                  

                  {/* NSSF AND NHIF  */}

                  <div className="gap-3 my-5 md:flex">
                  <p>Ignore non-cash benefits up to Ksh 3,000</p>
                  <input
                      type="checkbox"
                      className={inputStyles}
                      name='ignoreBenefits'
                      value={ignoreBenefits}
                      onChange={(event) => setIgnoreBenefits(event.target.checked)}
                  />
                  </div>
                  
                  <div className="gap-3 my-5 md:flex">
                    <p>Use new NSSF rates - Tier I only</p>
                    <input
                        type="radio"
                        className={inputStyles}
                        name='nssfTier'
                        value='NSSF1'
                        checked={nssfTier === 'NSSF1'}
                        onChange={() => setNSSFtier('NSSF1')}
                    />
                    </div>

                    <div className="gap-3 my-5 md:flex">
                    <p>Use new NSSF rates - Tier I & II</p>
                    <input
                        type="radio"
                        className={inputStyles}
                        name='nssfTier'
                        value='NSSF2'
                        checked={nssfTier === 'NSSF2'}
                        onChange={() => setNSSFtier('NSSF2')}
                    />
                    </div>

                    <div className="gap-3 my-5 md:flex">
                    <p>Use old NSSF rates</p>
                    <input
                        type="radio"
                        className={inputStyles}
                        name='nssfTier'
                        value='old'
                        checked={nssfTier === 'old'}
                        onChange={() => setNSSFtier('old')}
                    />
                    </div>

                  
                  
                  <button type="submit" onClick={handleClick} className="px-4 py-2 text-white bg-blue-700 rounded-md ">calculate</button>
                


              </form>
              
              <p className="my-5 text-sm ">This calculator works out an employee's net pay by subtractings <strong>PAYE, NSSF, NHIF</strong>  and <strong>pension fund </strong> contribution from the monthly gross pay. In order to work out taxable pay, the calculator requires non-cash benefits and any allowable deductions other than NSSF and pension fund contribution.</p>


            

              
          </div>
        
    </div>
  )
}

export default Calculator
