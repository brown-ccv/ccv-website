'use client'

import { useState } from 'react'

function RadioButton() {

    const [selectedOption, setSelectedOption] = useState("option1")  

    function onValueChange(event: any){
        setSelectedOption(event.target.value)
    }

    return (
        <div>
            <div className="flex items-center">
                <input 
                    type="radio"
                    id="option1"
                    name="group"
                    value="option1"
                    className="flex items-center form-radio text-primary-500 hover:ring hover:ring-primary-500 focus:border-gray-100 focus:bg-primary-500 focus:outline-primary-500 focus:ring focus:ring-primary-500 checked:border-gray-100 checked:bg-primary-500 disabled:border-gray-100 disabled:outline-gray-100"
                    checked={selectedOption === "option1"}
                    onChange={onValueChange}
                >
                </input>
                <label htmlFor="option1" className="ml-3 text-md/6 text-neutral-900">Option 1</label>
            </div>
            <div className="flex items-center">
                <input 
                    type="radio"
                    id="option2"
                    name="group"
                    value="option2"
                    className="flex items-center form-radio text-primary-500 hover:ring hover:ring-primary-500 focus:border-gray-100 focus:bg-primary-500 focus:outline-primary-500 focus:ring focus:ring-primary-500 checked:border-gray-100 checked:bg-primary-500 disabled:border-gray-100 disabled:outline-gray-100"
                    checked={selectedOption === "option2"}
                    onChange={onValueChange}                
                >
                </input>
                <label htmlFor="option2" className="ml-3 text-md/6 text-neutral-900">Option 2</label>
            </div>
        </div>
    )
}

export default RadioButton