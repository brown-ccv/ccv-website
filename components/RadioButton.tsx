'use client'

// https://tailwindui.com/components/application-ui/forms/radio-groups

import { useState } from 'react'

export default function RadioButtonGroup({ options }: { options: {id: string}[] }) {

    const [selectedOption, setSelectedOption] = useState(options[0].id)  

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
                        className="flex items-center relative size-4 appearance-none rounded-full form-radio text-primary-500 border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-primary-500 checked:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 focus-visible:ring focus:ring-primary-500 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
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

// export default RadioButtonGroup