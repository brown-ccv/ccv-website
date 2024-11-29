export default function RadioButton() {
    return (
        <div>
            <div className="flex items-center">
                <input 
                    type="radio"
                    id="option1"
                    name="name1"
                    value="option1"
                >
                </input>
                <label htmlFor="option1">Option 1</label>
            </div>
            <div className="flex items-center">
                <input 
                    type="radio"
                    id="option2"
                    name="name2"
                    value="option2"
                >
                </input>
                <label htmlFor="option2">Option 2</label>
            </div>
        </div>
    )
}