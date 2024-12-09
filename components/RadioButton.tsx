'use client'

import { useState } from 'react'

const options = [
    { id: 'option 1' },
    { id: 'option 2' }
]

function RadioButton() {

    const [selectedOption, setSelectedOption] = useState("option 1")  

    function onValueChange(event: any){
        setSelectedOption(event.target.value)
    }

    return (
        <div>
            {options.map((option) => (
                <div key={option.id} className="flex items-center">
                    <input 
                        type="radio"
                        id={option.id}
                        name="group"
                        value={option.id}
                        className="flex items-center form-radio text-primary-500 hover:ring hover:ring-primary-500 focus:border-gray-100 focus:bg-primary-500 focus:outline-primary-500 focus:ring focus:ring-primary-500 checked:border-gray-100 checked:bg-primary-500 disabled:border-gray-100 disabled:outline-gray-100"
                        checked={selectedOption === option.id}
                        onChange={onValueChange}
                    >
                    </input>
                    <label htmlFor={option.id} className="ml-3 text-md/6 text-neutral-900">{option.id[0].toUpperCase() + option.id.slice(1)}</label>
                </div>
            ))}
        </div>
    )
}

export default RadioButton