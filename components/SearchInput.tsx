import Icon from "@/components/ui/RenderIcon"
import { Input } from "@/components/ui/Input"
import React, { useState } from "react"

interface SearchInputProps {
  placeholder?: string
  onSearchChange: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onSearchChange,
}) => {
  const [query, setQuery] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setQuery(newValue)
    onSearchChange(newValue)
  }

  return (
    <div className="relative w-full max-w-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon iconName="FaSearch" className="h-5 w-5" />
      </div>
      <Input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-sunglow-500 focus:ring-sunglow-500"
      />
    </div>
  )
}

export default SearchInput
