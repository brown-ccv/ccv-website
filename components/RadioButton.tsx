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
                    className="mt-6 flex items-center space-x-3"
                    checked={selectedOption === "option1"}
                    onChange={onValueChange}
                >
                </input>
                <label htmlFor="option1">Option 1</label>
            </div>
            <div className="flex items-center">
                <input 
                    type="radio"
                    id="option2"
                    name="group"
                    value="option2"
                    checked={selectedOption === "option2"}
                    onChange={onValueChange}                >
                </input>
                <label htmlFor="option2">Option 2</label>
            </div>
        </div>
    )
}

export default RadioButton